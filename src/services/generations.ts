import { db } from '@/drizzle/index'
import { endOfMonth, startOfMonth } from 'date-fns'

export async function getGenerationsByUserInMonth(userId: string) {
    return await db.query.generations.findMany({
        where: (generations, { lt, gte, and, eq }) =>
            and(
                eq(generations.userId, userId),
                gte(generations.date, startOfMonth(new Date(Date.now()))),
                lt(generations.date, endOfMonth(new Date(Date.now())))
            ),
    })
}
