'use server'

import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import s3 from '@/lib/aws-s3'
import generateResume from '@/lib/draw-resume/generate-resume'
import { Resume } from '@/lib/generate-translated-resume-object'
import { eq, InferSelectModel } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function changeResumeLayout(
    resumeId: string,
    layout: InferSelectModel<typeof resumes>['layout']
) {
    try {
        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, resumeId),
        })
        if (!resume) return 'Document not found'
        const resumeObject = JSON.parse(resume.resumeJson) as Resume
        const pdfBytes = await generateResume(resumeObject, layout)

        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: resume.key,
            Body: pdfBytes,
            ContentType: 'application/pdf',
        })

        await db
            .update(resumes)
            .set({
                layout,
                fileSize: pdfBytes.byteLength,
                resumeJson: JSON.stringify(resumeObject),
            })
            .where(eq(resumes.id, resumeId))
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
    revalidatePath(`/resumes/${resumeId}`)
}
