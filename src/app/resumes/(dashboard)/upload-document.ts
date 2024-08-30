'use server'
import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import { revalidatePath } from 'next/cache'

export default async function uploadDocument(
    error: string | undefined,
    formData: FormData
) {
    const session = await auth()
    if (!session) return 'Unauthenticated'

    const file = formData.get('file') as File

    if (!file) {
        return 'No file provided'
    }

    const buffer = await file.arrayBuffer()

    try {
        const key = crypto.randomUUID()
        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
            Body: Buffer.from(buffer),
            ContentType: 'text/html',
        })
        await db.insert(resumes).values({
            userId: session.user.id,
            key,
            name: file.name,
            size: file.size.toString(),
        })
        revalidatePath('/resumes')
    } catch (error) {
        console.log(error)
        return 'Internal error'
    }
}
