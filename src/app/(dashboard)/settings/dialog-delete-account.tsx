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
import deleteAccount from './delete-account'
import { signOut } from 'next-auth/react'

export default function DialogDeleteAccount() {
    const { toast } = useToast()

    const onClickConfirm = async () => {
        const deletingToast = toast({
            title: 'Deleting account...',
        })
        const error = await deleteAccount()
        deletingToast.dismiss()
        if (error) {
            toast({
                title: error,
                variant: 'destructive',
            })
            return
        }
        signOut()
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full md:w-max" variant={'destructive'}>
                    Delete account
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
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
