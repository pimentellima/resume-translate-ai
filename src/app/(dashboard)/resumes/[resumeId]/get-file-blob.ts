'use server'

import { auth } from '@/lib/auth'
import { getFileFromS3, getSignedUrlFromS3Key } from '@/services/s3'
import { redirect } from 'next/navigation'
import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export default async function getFileBlob(resumeId: string) {
    const session = await auth()
    const resume = await db.query.resumes.findFirst({
        where: eq(resumes.id, resumeId),
    })
    if (!resume) return { blob: undefined, error: 'Resume not found' }
    if (!session?.user)
        redirect(`/sign-in?redirect=resumes&resumeId=${resumeId}`)
    const blob = await getFileFromS3(resume.key)
    return { blob, error: undefined }
}
