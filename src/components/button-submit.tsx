'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function ButtonSubmit(props: ButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button {...props} disabled={props.disabled || pending}>
            {pending ? (
                <div className='flex items-center'>
                    <Loader className="animate-spin h-4 w-4 mr-2 duration-1000" />
                    Submitting
                </div>
            ) : (
                <span>Submit</span>
            )}
        </Button>
    )
}
