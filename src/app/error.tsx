'use client'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <div className="flex justify-center items-center h-screen w-screen bg-background">
            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>Something went wrong</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-end'>
                    <Button variant={'outline'} onClick={() => reset()}>
                        Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
