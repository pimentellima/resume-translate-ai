'use server'

import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import generateResumePdf from '@/lib/utils/draw-resume/generate-resume-pdf'
import { extractTextFromPdf } from '@/lib/utils/extract-text-from-pdf'
import {
    generateResumeObject,
    Resume,
} from '@/lib/utils/generate-resume-object'
import { getFileFromS3 } from '@/services/s3'
import { getUserSubscription } from '@/services/stripe'
import { getUserById } from '@/services/user'
import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function changeResumeLanguage(
    resumeId: string,
    language: InferInsertModel<typeof resumes>['language']
) {
    try {
        const session = await auth()
        if (!session?.user) return 'Unauthenticated'
        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, resumeId),
        })
        const user = await getUserById(session.user.id)
        if (!user) return 'User not found'
        if (!resume) return 'Document not found'
        if (resume.translationsCount >= 3) {
            const subscription = await getUserSubscription(user.id)
            if (
                !user?.stripeCustomerId ||
                !subscription ||
                subscription.status !== 'active'
            )
                return 'You have reached the limit of 3 translations per document of the Free Plan'
        }

        if (!language) return 'No language selected'
        const fileBuffer = await getFileFromS3(resume.key)
        const text = await extractTextFromPdf(fileBuffer)
        const resumeObject = await generateResumeObject(text, language)
        const pdfBytes = await generateResumePdf(resumeObject, resume.layout)

        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: resume.key,
            Body: pdfBytes,
            ContentType: 'application/pdf',
        })
        console.log(resume.translationsCount + 1)
        await db
            .update(resumes)
            .set({
                language,
                translationsCount: resume.translationsCount + 1,
                fileSize: pdfBytes.byteLength,
                resumeJson: JSON.stringify(resumeObject),
                name: resume.language
                    ? resume.name.replace(resume.language, language)
                    : resume.name.replace('.pdf', '') + '-' + language + '.pdf',
            })
            .where(eq(resumes.id, resumeId))
    } catch (e) {
        console.log(e)
        return 'Internal error'
    }
    revalidatePath(`/resumes/${resumeId}`)
}
