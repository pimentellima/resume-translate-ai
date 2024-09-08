'use server'
import { languages } from '@/constants'
import { db } from '@/drizzle/index'
import { translations } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import { drawResumeDefault } from '@/lib/draw-resume-default'
import { generateTranslatedResumeObject } from '@/lib/generate-translated-resume-object'
import { redirect } from 'next/navigation'
import z from 'zod'

export type FormValues = {
    file: File
    language: string
}

export default async function translateDocument(formData: FormData) {
    const translationId = crypto.randomUUID()
    try {
        const session = await auth()
        if (!session) return 'Unauthenticated'
        const file = formData.get('file')
        if (!(file instanceof File)) return 'Invalid file'
        if (file.type !== 'application/pdf') return 'File must be a pdf'
        if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB'

        const languageValidation = z
            .enum(languages, { required_error: 'Language is required' })
            .safeParse(formData.get('language'))

        if (languageValidation.error) {
            return 'Language not supported'
        }
        const language = languageValidation.data
        const pdfObject = await generateTranslatedResumeObject(file, language)
        const pdfBuffer = await drawResumeDefault(pdfObject)
        const key = crypto.randomUUID()

        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
        })

        await db.insert(translations).values({
            id: translationId,
            key,
            fileSize: pdfBuffer.byteLength,
            name: file.name.replace('.pdf', '') + '-' + language + '.pdf',
            userId: session.user.id,
            language,
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
    redirect('/translations/' + translationId)
}
