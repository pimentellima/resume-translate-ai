'use client'
import { Button } from '@/components/ui/button'
import deleteResume from './delete-resume'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function ButtonDeleteResume({ resumeId }: { resumeId: string }) {
    const { toast } = useToast()
    return (
        <Button
            variant={'destructive'}
            title="Delete"
            size={'icon'}
            onClick={async () => {
                const error = await deleteResume(resumeId)
                if (error) {
                    toast({
                        title: 'Error deleting resume',
                        variant: 'destructive',
                        description: error,
                    })
                }
            }}
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    )
}
