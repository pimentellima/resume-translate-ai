'use server'
import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'

export default async function deleteDocuments() {
    const session = await auth()
    if (!session?.user) return 'Unauthenticated'
    await db.delete(resumes).where(eq(resumes.userId, session.user.id))
}
