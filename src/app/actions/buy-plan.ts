'use server'

import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getUserById } from '@/services/user'
import { redirect } from 'next/navigation'

export async function buyPlan(plan: 'monthly' | 'yearly') {
    const session = await auth()
    if (!session) {
        redirect(`sign-in?redirect=pricing`)
    }
    const user = await getUserById(session.user.id)
    const subscription = user.stripeSubscriptionId
        ? await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
        : null

    const currentPlan = subscription?.items.data?.[0].plan.interval
    if (currentPlan === 'month' && plan === 'yearly') {
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId || undefined,
            client_reference_id: user.id,
            mode: 'setup',
            currency: 'usd',
            success_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/checkout/update-subscription?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
        })
        redirect(checkoutSession.url!)
    }
    if (subscription?.status === 'active') {
        return 'You already have an active subscription.'
    }

    const priceId =
        plan === 'monthly'
            ? process.env.STRIPE_MONTHLY_PRICE_ID!
            : process.env.STRIPE_YEARLY_PRICE_ID!

    const checkoutSession = await stripe.checkout.sessions.create({
        customer: user.stripeCustomerId || undefined,
        client_reference_id: user.id,
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        currency: 'usd',
        success_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    })

    redirect(checkoutSession.url!)
}
