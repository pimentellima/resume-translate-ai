import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { count, desc, eq } from 'drizzle-orm'

export async function getResumeById(resumeId: string) {
    const resume = await db.query.resumes.findFirst({
        where: eq(resumes.id, resumeId),
    })
    return resume
}

export async function getResumesByUserId(userId: string, page = 1) {
    const userResumes = await db.query.resumes.findMany({
        where: eq(resumes.userId, userId),
        limit: 10,
        offset: 10 * (page - 1),
        orderBy: [desc(resumes.createdAt)],
    })
    const countRows = await db
        .select({
            count: count(),
        })
        .from(resumes)

    return { userResumes, count: countRows[0].count }
}
