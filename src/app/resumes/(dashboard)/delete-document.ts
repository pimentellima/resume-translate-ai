'use server'
import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export default async function deleteDocument(id: string) {
    const session = await auth()
    if (!session) return 'Unauthenticated'

    if (!id) {
        return 'No file provided'
    }

    try {
        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, id),
        })
        if (!resume) return 'Resume not found'

        await s3.deleteObject({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: resume.key as string,
        })
        await db.delete(resumes).where(eq(resumes.id, id))
        revalidatePath('/resumes')
    } catch (error) {
        console.log(error)
        return 'Internal error'
    }
}
