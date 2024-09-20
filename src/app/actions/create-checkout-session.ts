'use server'

import { db } from '@/drizzle/index'
import { users } from '@/drizzle/schema'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(plan: 'monthly' | 'yearly') {
    let url = ''
    try {
        const session = await auth()
        if (!session) {
            redirect(`sign-in?redirect=checkout`)
        }
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.user.id),
        })

        if (!user) return 'User not found'

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId || undefined,
            client_reference_id: session.user.id,
            mode: 'subscription',
            line_items: [
                {
                    price:
                        plan === 'monthly'
                            ? process.env.STRIPE_MONTHLY_PRICE_ID
                            : process.env.STRIPE_YEARLY_PRICE_ID,
                    quantity: 1,
                },
            ],
            currency: 'usd',
            success_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
        })

        url = checkoutSession.url!
    } catch (e) {
        console.log(e)
        return 'Internal error'
    }
    redirect(url)
}
