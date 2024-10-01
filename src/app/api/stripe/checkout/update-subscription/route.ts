import { db } from '@/drizzle/index'
import { users } from '@/drizzle/schema'
import { stripe } from '@/lib/stripe'
import { getUserById } from '@/services/user'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
        return NextResponse.redirect(new URL('/pricing', request.url))
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['customer', 'subscription'],
        })

        if (!session.customer || typeof session.customer === 'string') {
            throw new Error('Invalid customer data from Stripe.')
        }

        const userId = session.client_reference_id
        if (!userId) {
            throw new Error(
                "No user ID found in session's client_reference_id."
            )
        }
        const user = await getUserById(userId)
        const subscription = await stripe.subscriptions.retrieve(
            user.stripeSubscriptionId!
        )
        await stripe.subscriptionItems.update(subscription.items.data[0].id, {
            price: process.env.STRIPE_YEARLY_PRICE_ID,
        })

        return NextResponse.redirect(
            new URL('/settings?message=subscription-updated', request.url)
        )
    } catch (error) {
        console.error('Error handling successful checkout:', error)
        return NextResponse.redirect(new URL('/error', request.url))
    }
}
