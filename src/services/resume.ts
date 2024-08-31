import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getResumeById(resumeId: string) {
    const resume = await db.query.resumes.findFirst({
        where: eq(resumes.id, resumeId),
        with: {
            translations: true,
        },
    })
    return resume
}
