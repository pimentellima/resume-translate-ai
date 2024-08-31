import { db } from '@/drizzle/index'
import { translations } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getTranslationById(translationId: string) {
    const resume = await db.query.translations.findFirst({
        where: eq(translations.id, translationId),
    })
    return resume
}
