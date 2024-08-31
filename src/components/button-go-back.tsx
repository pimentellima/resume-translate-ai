'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'

export default function ButtonGoBack(props: ButtonProps) {
    const router = useRouter()
    return (
        <Button
            onClick={() => router.back()}
            {...props}
            children={props.children || <span>Go back</span>}
        />
    )
}
