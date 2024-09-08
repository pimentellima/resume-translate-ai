'use server'

import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import s3 from '@/lib/aws-s3'
import generateResume from '@/lib/draw-resume/generate-resume'
import { extractTextFromPdf } from '@/lib/extract-text-from-pdf'
import {
    generateTranslatedResumeObject,
    Resume,
} from '@/lib/generate-translated-resume-object'
import { getFileBytesFromS3Key } from '@/services/s3'
import { eq, InferSelectModel } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function changeResumeLanguage(
    resumeId: string,
    language: InferSelectModel<typeof resumes>['language']
) {
    try {
        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, resumeId),
        })
        if (!resume) return 'Document not found'
        const fileBuffer = await getFileBytesFromS3Key(resume.key)
        const text = await extractTextFromPdf(fileBuffer)
        const resumeObject = await generateTranslatedResumeObject(
            text,
            language
        )
        const pdfBytes = await generateResume(resumeObject, resume.layout)

        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: resume.key,
            Body: pdfBytes,
            ContentType: 'application/pdf',
        })

        await db
            .update(resumes)
            .set({
                language,
                fileSize: pdfBytes.byteLength,
                name: resume.name.replace(resume.language, language),
            })
            .where(eq(resumes.id, resumeId))
    } catch {
        return 'An error occurred'
    }
    revalidatePath(`/resumes/${resumeId}`)
}
