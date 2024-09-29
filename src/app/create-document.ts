'use server'
import { db } from '@/drizzle/index'
import { generations, languageEnum, resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import generateResumePdf from '@/lib/utils/draw-resume/generate-resume-pdf'
import { extractTextFromPdf } from '@/lib/utils/extract-text-from-pdf'
import { generateResumeObject } from '@/lib/utils/generate-resume-object'
import { getGenerationsByUserInMonth } from '@/services/generations'
import { getUserSubscription } from '@/services/stripe'
import { getUserById } from '@/services/user'
import { redirect } from 'next/navigation'
import z from 'zod'

export type FormValues = {
    file: File
    language: string
}

export default async function createDocument(
    error: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    const resumeId = crypto.randomUUID()
    const session = await auth()

    const file = formData.get('file')
    if (!(file instanceof File)) return 'Invalid file'
    if (file.type !== 'application/pdf') return 'File must be a pdf'
    if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB'

    const languageValidation = z
        .enum(languageEnum.enumValues)
        .optional()
        .safeParse(formData.get('language') || undefined)

    if (languageValidation.error) return 'Language not supported'

    if (!session?.user) {
        try {
            const key = crypto.randomUUID()
            const pdfBuffer = Buffer.from(await file.arrayBuffer())
            await s3.putObject({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: pdfBuffer,
                ContentType: 'application/pdf',
            })
            await db.insert(resumes).values({
                id: resumeId,
                key,
                layout: 'metro',
                fileSize: pdfBuffer.byteLength,
                name: file.name,
                userId: session?.user.id,
                expiresAt: session?.user.id
                    ? undefined
                    : new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
        } catch (e) {
            console.log(e)
            return 'An error occurred'
        }
        return redirect('/sign-in?redirect=resumes&resumeId=' + resumeId)
    }
    try {
        const user = await getUserById(session.user.id)
        const userGenerations = await getGenerationsByUserInMonth(user.id)
        if (userGenerations.length >= 1) {
            const subscription = await getUserSubscription(user.id)
            if (
                !user?.stripeCustomerId ||
                !subscription ||
                subscription.status !== 'active'
            )
                return 'You have reached the limit of 1 resume per month'
        }

        const language = languageValidation.data
        const text = await extractTextFromPdf(
            Buffer.from(await file.arrayBuffer())
        )
        const pdfObject = await generateResumeObject(text, language)
        const pdfBuffer = await generateResumePdf(pdfObject, 'metro')
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
            layout: 'metro',
            resumeJson: JSON.stringify(pdfObject),
            fileSize: pdfBuffer.byteLength,
            name:
                file.name.replace('.pdf', '') + '-' + (language || '') + '.pdf',
            userId: session?.user.id,
            language,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })

        await db.insert(generations).values({
            userId: user.id,
            resumeId,
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
    redirect('/resumes/' + resumeId)
}
