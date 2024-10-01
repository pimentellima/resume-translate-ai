'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import deleteDocuments from './delete-documents'

export default function DialogDeleteDocuments() {
    const { toast } = useToast()

    const onClickConfirm = async () => {
        const deletingToast = toast({
            title: 'Deleting documents...',
        })
        const error = await deleteDocuments()
        deletingToast.dismiss()
        if (error) {
            toast({
                title: error,
                variant: 'destructive',
            })
            return
        }
        toast({
            title: 'Documents deleted succesfully.',
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full md:w-max" variant={'destructive'}>
                    Delete all documents
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete your documents.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button asChild variant={'destructive'}>
                        <AlertDialogAction onClick={onClickConfirm}>
                            Confirm
                        </AlertDialogAction>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
