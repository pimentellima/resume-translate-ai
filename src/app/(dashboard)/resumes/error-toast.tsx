'use client'
import { ToastActionElement } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

export default function ErrorToast({
    title,
    description,
    action,
}: {
    title: string
    description?: string
    action?: ToastActionElement
}) {
    const { toast } = useToast()
    useEffect(() => {
        const timeout = setTimeout(() => {
            toast({
                title,
                variant: 'destructive',
                description,
                action,
            })
        }, 0)

        return () => clearTimeout(timeout)
    }, [])

    return <></>
}
