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
            size={'icon'}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
