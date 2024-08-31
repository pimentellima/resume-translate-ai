'use server'
import { db } from '@/drizzle/index'
import { translations } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import s3 from '@/lib/aws-s3'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export default async function deleteTranslation(id: string) {
    const session = await auth()
    if (!session) return 'Unauthenticated'

    if (!id) {
        return 'No file provided'
    }

    try {
        const translation = await db.query.translations.findFirst({
            where: eq(translations.id, id),
        })
        if (!translation) return 'Translation not found'

        await s3.deleteObject({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: translation.key as string,
        })
        await db.delete(translations).where(eq(translations.id, id))
        revalidatePath('/translations')
    } catch (error) {
        console.log(error)
        return 'Internal error'
    }
}
