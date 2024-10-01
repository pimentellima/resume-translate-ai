import { db } from '@/drizzle/index'
import { generations, resumes } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getGenerationsByUserInMonth } from '@/services/generations'
import { getUserById } from '@/services/user'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    const session = await auth()
    try {
        if (!session?.user) {
            await db.delete(resumes).where(eq(resumes.id, params.resumeId))
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }

        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, params.resumeId),
        })

        if (!resume) return NextResponse.redirect(new URL('/error', req.url))

        const userGenerations = await getGenerationsByUserInMonth(
            session.user.id
        )
        if (userGenerations.length >= 1) {
            const user = await getUserById(session.user.id)
            if (!user?.stripeCustomerId) {
                await db.delete(resumes).where(eq(resumes.id, params.resumeId))
                return NextResponse.redirect(
                    new URL('/resumes?error=freePlanQuota', req.url)
                )
            }

            const subscription = await stripe.subscriptions.retrieve(
                user.stripeSubscriptionId!
            )
            if (!subscription) {
                await db.delete(resumes).where(eq(resumes.id, params.resumeId))
                return NextResponse.redirect(
                    new URL('/resumes?error=subscriptionNotFound', req.url)
                )
            }
            if (subscription.status !== 'active') {
                await db.delete(resumes).where(eq(resumes.id, params.resumeId))
                return NextResponse.redirect(
                    new URL('/resumes?error=inactiveSubscription', req.url)
                )
            }
        }

        await db.update(resumes).set({ userId: session.user.id })
        await db
            .insert(generations)
            .values({ userId: session.user.id, resumeId: resume.id })

        return NextResponse.redirect(new URL('/resumes/' + resume.id, req.url))
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(new URL('/error', req.url))
    }
}
