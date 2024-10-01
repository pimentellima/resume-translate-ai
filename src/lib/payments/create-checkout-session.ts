import { stripe } from '@/lib/stripe'

export async function createCheckoutSession(
    priceId: string,
    userId: string,
    stripeCustomerId: string | undefined
) {
    const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        client_reference_id: userId,
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

    return checkoutSession.url!
}
