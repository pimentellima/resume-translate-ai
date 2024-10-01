import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getUserById } from '@/services/user'
import { ExternalLink, RocketIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { format } from 'date-fns'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import DialogDeleteDocuments from './dialog-delete-documents'
import DialogDeleteAccount from './dialog-delete-account'

export default async function SettingsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}) {
    const session = await auth()
    if (!session?.user) {
        redirect('/sign-in')
    }
    const subscriptionUpdatedMessage =
        searchParams.message === 'subscription-updated'
    const user = await getUserById(session.user.id)

    const subscription = user.stripeSubscriptionId
        ? await stripe.subscriptions.retrieve(user.stripeSubscriptionId, {
              expand: ['items.data.price.product'],
          })
        : null

    const product = subscription?.items.data?.[0].price.product as
        | Stripe.Product
        | undefined

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-10">
            <h1 className="mb-6 font-serif text-2xl md:text-3xl">Settings</h1>
            <div className="flex flex-col gap-6">
                {subscriptionUpdatedMessage && <AlertSubscriptionUpdated />}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-normal">
                            Your plan:
                            <span className="ml-1 font-semibold">
                                {product ? product.name : 'Free Plan'}
                            </span>
                            {subscription?.status !== 'canceled' &&
                            subscription?.cancel_at ? (
                                <span className="ml-1">{`(Cancels at ${format(
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
                            <div className="flex flex-col gap-2">
                                <Button
                                    className="w-full md:w-max"
                                    asChild
                                    variant={'outline'}
                                >
                                    <Link
                                        target="_blank"
                                        className="flex items-center"
                                        href={
                                            process.env
                                                .STRIPE_CLIENT_PORTAL_URL!
                                        }
                                    >
                                        Billing
                                        <ExternalLink className="h-4 ml-1" />
                                    </Link>
                                </Button>
                                {subscription.status === 'canceled' && (
                                    <Button className="w-full md:w-max" asChild>
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
                                <Button
                                    className="w-full mt-2 md:w-max"
                                    asChild
                                >
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
                        <CardTitle className="text-lg">Danger zone</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <DialogDeleteDocuments />
                        <DialogDeleteAccount />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function AlertSubscriptionUpdated() {
    return (
        <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Subscription updated</AlertTitle>
            <AlertDescription>
                Your subscription has been updated to a yearly plan.
            </AlertDescription>
        </Alert>
    )
}
