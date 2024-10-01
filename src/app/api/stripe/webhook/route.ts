import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature') as string
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    try {
        if (!sig || !webhookSecret)
            return new Response('Webhook secret not found.', { status: 400 })
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    return new Response('Webhook received', {
        status: 200,
    })

    if (event.type === 'customer.subscription.created') {
    } else {
        return new Response(`Unsupported event type: ${event.type}`, {
            status: 400,
        })
    }
}
