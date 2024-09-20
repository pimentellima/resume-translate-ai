'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function ButtonRefreshPage() {
    const router = useRouter()

    return (
        <Button onClick={() => router.refresh()}>
            Refresh
        </Button>
    )
}
