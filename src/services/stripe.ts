import { stripe } from '@/lib/stripe'
import { getUserById } from './user'

export async function getUserSubscription(userId: string) {
    const user = await getUserById(userId)
    if (!user.stripeCustomerId) return null
    const subscriptionList = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
    })
    if (subscriptionList.data.length === 0) return null
    return subscriptionList.data[0]
}
