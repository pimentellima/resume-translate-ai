'use server'
import { db } from '@/drizzle/index'
import { languageEnum, resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import generateResume from '@/lib/draw-resume/generate-resume'
import { extractTextFromPdf } from '@/lib/extract-text-from-pdf'
import { generateTranslatedResumeObject } from '@/lib/generate-translated-resume-object'
import { redirect } from 'next/navigation'
import z from 'zod'

export type FormValues = {
    file: File
    language: string
}

export default async function translateDocument(formData: FormData) {
    const resumeId = crypto.randomUUID()
    try {
        const session = await auth()
        if (!session) return 'Unauthenticated'
        const file = formData.get('file')
        if (!(file instanceof File)) return 'Invalid file'
        if (file.type !== 'application/pdf') return 'File must be a pdf'
        if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB'

        const languageValidation = z
            .enum(languageEnum.enumValues, {
                required_error: 'Language is required',
            })
            .safeParse(formData.get('language'))

        if (languageValidation.error) {
            return 'Language not supported'
        }
        const language = languageValidation.data
        const fileArrayBuffer = await file.arrayBuffer()
        const fileBuffer = Buffer.from(fileArrayBuffer)
        const text = await extractTextFromPdf(fileBuffer)
        const pdfObject = await generateTranslatedResumeObject(text, language)
        const pdfBuffer = await generateResume(pdfObject, 'simple')
        const key = crypto.randomUUID()

        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
        })

        await db.insert(resumes).values({
            id: resumeId,
            key,
            resumeJson: JSON.stringify(pdfObject),
            fileSize: pdfBuffer.byteLength,
            name: file.name.replace('.pdf', '') + '-' + language + '.pdf',
            userId: session.user.id,
            language,
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
    redirect('/resumes/' + resumeId)
}
