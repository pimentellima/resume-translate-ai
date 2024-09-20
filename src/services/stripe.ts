import { stripe } from '@/lib/stripe'
import { getUserById } from './user'

export async function getUserSubscription(userId: string) {
    const user = await getUserById(userId)
    if (!user.stripeSubscriptionId) return null
    const subscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
    )
    return subscription
}
