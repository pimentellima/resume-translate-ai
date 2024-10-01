'use server'
import { db } from '@/drizzle/index'
import { resumes, users } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'

export default async function deleteAccount() {
    const session = await auth()
    if (!session?.user) return 'Unauthenticated'
    await db.delete(users).where(eq(users.id, session.user.id))
}
