'use client'

import { createCheckoutSession } from '@/app/actions/create-checkout-session'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ButtonCheckout({
    plan,
}: {
    plan: 'monthly' | 'yearly'
}) {
    const session = useSession()
    const router = useRouter()
    const { toast } = useToast()

    return (
        <Button
            onClick={async () => {
                if (!session?.data?.user) {
                    return router.push('/sign-in?redirect=pricing')
                }
                const error = await createCheckoutSession(plan)
                if (error) {
                    toast({
                        title: 'Failed to create checkout session',
                        variant: 'destructive',
                    })
                    return
                }
            }}
            className="w-full text-base"
            size="lg"
            variant={'default'}
        >
            {'Upgrade to Pro'}
        </Button>
    )
}
