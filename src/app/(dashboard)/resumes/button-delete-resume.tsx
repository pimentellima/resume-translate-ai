'use client'
import { Button } from '@/components/ui/button'
import deleteResume from './delete-resume'
import { Trash2 } from 'lucide-react'

export default function ButtonDeleteResume({
    translationId,
}: {
    translationId: string
}) {
    return (
        <Button
            variant={'destructive'}
            onClick={async () => {
                const error = await deleteResume(translationId)
                /* if (error) {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error,
            })
        } */
            }}
        >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
        </Button>
    )
}
