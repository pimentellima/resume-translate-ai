import { auth } from '@/lib/auth'
import { getFileFromS3, getSignedUrlFromS3Key } from '@/services/s3'
import { redirect } from 'next/navigation'
import { db } from '@/drizzle/index'
import { resumes } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const session = await auth()
        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, params.resumeId),
        })
        if (!resume)
            return NextResponse.json(
                { message: 'Resume not found' },
                { status: 404 }
            )
        if (!session?.user) {
            return NextResponse.redirect(
                `/sign-in?redirect=resumes&resumeId=${params.resumeId}`
            )
        }
        const blob = await getFileFromS3(resume.key)
        return new NextResponse(blob)
    } catch (e) {
        return NextResponse.json({ message: 'Internal error' }, { status: 500 })
    }
}
