'use client'
import { Button } from '@/components/ui/button'
import deleteTranslation from './delete-document'
import { Trash2 } from 'lucide-react'

export default function ButtonDeleteTranslation({
    translationId,
}: {
    translationId: string
}) {
    return (
        <Button
            variant={'destructive'}
            onClick={async () => {
                const error = await deleteTranslation(translationId)
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
