'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { buyPlan } from '@/app/actions/buy-plan'

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
                const error = await buyPlan(plan)
                if (error) {
                    toast({
                        title: error,
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
