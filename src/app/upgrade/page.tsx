import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import ButtonRefreshPage from './button-refresh-page'

const paymentStatusMessage: Record<Stripe.Checkout.Session.Status, string> = {
    complete: 'Payment complete',
    expired: 'Payment expired',
    open: 'Payment open',
}

export default async function UpgradePage({
    searchParams,
}: {
    searchParams: {
        session_id?: string
    }
}) {
    if (!searchParams.session_id) {
        redirect('/resumes')
    }

    const checkoutSession = searchParams.session_id
        ? await stripe.checkout.sessions.retrieve(searchParams.session_id)
        : null

    if (checkoutSession?.status)
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <Card className=" w-[350px]">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Purchase details
                        </CardTitle>
                        <CardDescription>
                            {paymentStatusMessage[checkoutSession.status]}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end">
                        <Button variant={'link'} asChild>
                            <Link href={'/resumes'}>Go back to user page</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-lg">Purchase details</CardTitle>
                    <CardDescription>
                        Refresh the page to see the purchase details
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                    <Button asChild variant={'link'}>
                        <Link href={'/resumes'}>Go back to user page </Link>
                    </Button>
                    <ButtonRefreshPage />
                </CardFooter>
            </Card>
        </div>
    )
}
