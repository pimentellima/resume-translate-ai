'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import deleteResume from './delete-resume'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function ButtonDeleteResume({
    resumeId,
    ...props
}: { resumeId: string } & ButtonProps) {
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
            {...props}
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    )
}
