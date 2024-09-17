'use server'
import { db } from '@/drizzle/index'
import { languageEnum, resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import generateResumePdf from '@/lib/draw-resume/generate-resume-pdf'
import { extractTextFromPdf } from '@/lib/extract-text-from-pdf'
import { generateResumeObject } from '@/lib/generate-resume-object'
import { redirect } from 'next/navigation'
import z from 'zod'

export type FormValues = {
    file: File
    language: string
}

export default async function createDocument(
    formData: FormData
): Promise<string | undefined> {
    const resumeId = crypto.randomUUID()
    try {
        const file = formData.get('file')
        if (!(file instanceof File)) return 'Invalid file'
        if (file.type !== 'application/pdf') return 'File must be a pdf'
        if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB'

        const languageValidation = z
            .enum(languageEnum.enumValues)
            .optional()
            .safeParse(formData.get('language') || undefined)

        if (languageValidation.error) {
            return 'Language not supported'
        }
        const language = languageValidation.data
        const fileArrayBuffer = await file.arrayBuffer()
        const fileBuffer = Buffer.from(fileArrayBuffer)
        const text = await extractTextFromPdf(fileBuffer)
        const pdfObject = await generateResumeObject(text, language)
        const pdfBuffer = await generateResumePdf(pdfObject, 'metro')
        const key = crypto.randomUUID()

        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
        })

        const session = await auth()
        await db.insert(resumes).values({
            id: resumeId,
            key,
            layout: 'metro',
            resumeJson: JSON.stringify(pdfObject),
            fileSize: pdfBuffer.byteLength,
            name:
                file.name.replace('.pdf', '') + '-' + (language || '') + '.pdf',
            userId: session?.user.id,
            language,
            expiresAt: session?.user.id
                ? undefined
                : new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }

    redirect('/resumes/' + resumeId)
}
