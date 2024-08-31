import { db } from '@/drizzle/index'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import 'server-only'

export const getUserById = cache(async (userId: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
            password: false,
        }
    })
    if (!user) throw new Error('')
    return user
})
