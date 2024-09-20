'use server'
import { db } from '@/drizzle/index'
import {
    generations,
    languageEnum,
    resumes,
    users
} from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import generateResumePdf from '@/lib/utils/draw-resume/generate-resume-pdf'
import { extractTextFromPdf } from '@/lib/utils/extract-text-from-pdf'
import { generateResumeObject } from '@/lib/utils/generate-resume-object'
import { getUserSubscription } from '@/services/stripe'
import { endOfMonth, startOfMonth } from 'date-fns'
import { eq } from 'drizzle-orm'
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
    try {
        const session = await auth()
        if (session?.user.id) {
            console.log(session.user.id)
            const existingResumes = await db.query.generations.findMany({
                where: (generations, { lt, gte, and, eq }) =>
                    and(
                        eq(generations.userId, session.user.id),
                        gte(
                            generations.date,
                            startOfMonth(new Date(Date.now()))
                        ),
                        lt(generations.date, endOfMonth(new Date(Date.now())))
                    ),
            })
            if (existingResumes.length >= 1) {
                const user = await db.query.users.findFirst({
                    where: eq(users.id, session.user.id),
                })
                if (!user?.stripeCustomerId)
                    return 'You have reached the limit of 1 resume per month of the Free Plan'

                const subscription = await getUserSubscription(session.user.id)
                if (!subscription) return 'Subscription not found'
                /* const subscription = await db.query.subscriptions.findFirst({
                    where: eq(
                        subscriptions.stripeCustomerId,
                        user.stripeCustomerId
                    ),
                }) */
                if (subscription.status !== 'active') {
                    return 'Your subscription is not active'
                }
            }
        }
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

        await db
            .insert(resumes)
            .values({
                id: resumeId,
                key,
                layout: 'metro',
                resumeJson: JSON.stringify(pdfObject),
                fileSize: pdfBuffer.byteLength,
                name:
                    file.name.replace('.pdf', '') +
                    '-' +
                    (language || '') +
                    '.pdf',
                userId: session?.user.id,
                language,
                expiresAt: session?.user.id
                    ? undefined
                    : new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
            .returning()
        if (session?.user.id) {
            await db.insert(generations).values({
                userId: session.user.id,
                resumeId,
            })
        }
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }

    redirect('/resumes/' + resumeId)
}
