import { db } from '@/drizzle/index'
import { translations } from '@/drizzle/schema'
import { count, desc, eq } from 'drizzle-orm'

export async function getTranslationById(translationId: string) {
    const translation = await db.query.translations.findFirst({
        where: eq(translations.id, translationId),
    })
    return translation
}

export async function getTranslationsByUserId(userId: string, page = 1) {
    const userTranslations = await db.query.translations.findMany({
        where: eq(translations.userId, userId),
        limit: 10,
        offset: 10 * (page - 1),
        orderBy: [desc(translations.createdAt)],
    })
    const countRows = await db
        .select({
            count: count(),
        })
        .from(translations)

    return { userTranslations, count: countRows[0].count }
}
