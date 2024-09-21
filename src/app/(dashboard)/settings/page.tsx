import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getUserById } from '@/services/user'
import { ExternalLink, SparkleIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { format } from 'date-fns'

export default async function SettingsPage() {
    const session = await auth()
    if (!session?.user) {
        redirect('/sign-in')
    }
    const user = await getUserById(session.user.id)

    const subscription = user.stripeSubscriptionId
        ? await stripe.subscriptions.retrieve(user.stripeSubscriptionId, {
              expand: ['items.data.price.product'],
          })
        : null

    const product = subscription?.items.data?.[0].price.product as
        | Stripe.Product
        | undefined

    console.log(subscription)
    return (
        <div className="grid grid-cols-[1fr,2fr] px-64 py-10">
            <h1 className="font-serif text-3xl">Settings</h1>
            <div className="flex flex-col gap-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-normal">
                            Your plan:
                            <span className="ml-1 font-semibold">
                                {product ? product.name : 'Free Plan'}
                            </span>
                            {subscription?.status !== 'canceled' &&
                            subscription?.cancel_at ? (
                                <span className='ml-1'>{`(Cancels at ${format(
                                    new Date(subscription.cancel_at * 1000),
                                    'dd MMM yyyy'
                                )})`}</span>
                            ) : subscription?.status ? (
                                <span className="ml-1">
                                    ({subscription.status})
                                </span>
                            ) : null}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {subscription ? (
                            <div className="flex flex-col gap-1">
                                <Button
                                    className="w-max"
                                    asChild
                                    variant={'outline'}
                                >
                                    <Link
                                        target="_blank"
                                        className='flex items-center'
                                        href={
                                            process.env
                                                .STRIPE_CLIENT_PORTAL_URL!
                                        }
                                    >
                                        Billing
                                        <ExternalLink className='h-4 ml-1'/>
                                    </Link>
                                </Button>
                                {subscription.status === 'canceled' && (
                                    <Button className="w-max" asChild>
                                        <Link href={'pricing'}>Renew Plan</Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p className="inline-block w-full">
                                    You can translate one resume per month with
                                    the free plan.
                                </p>
                                <Button className="mt-2" asChild>
                                    <Link
                                        href={'/pricing'}
                                        className="flex items-center"
                                    >
                                        <SparklesIcon className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />
                                        Upgrade
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Danger zone</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">
                        <Button className="w-max" variant={'destructive'}>
                            Delete all documents
                        </Button>
                        <Button className="w-max" variant={'destructive'}>
                            Delete account
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
