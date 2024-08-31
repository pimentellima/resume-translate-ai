'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ArrowUpCircle, ArrowUpIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import uploadDocument from './upload-document'

export function DialogUploadResume() {
    const [open, setOpen] = useState(false)
    const [error, action] = useFormState(uploadDocument, undefined)

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button className="mt-3">
                    <ArrowUpCircle className="h-4 w-4 mr-2" /> Upload
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Upload resume</DialogTitle>
                </DialogHeader>
                <form action={action} className="py-2">
                    <Input name="file" id="file" type="file" accept=".html" />
                    {error && (
                        <p className="text-destructive text-sm mt-1 text-right">
                            {error}
                        </p>
                    )}
                    <div className="flex justify-end gap-1 mt-6">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            variant={'destructive'}
                        >
                            Cancel
                        </Button>
                        <ButtonSubmit />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function ButtonSubmit({ disabled }: { disabled?: boolean }) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending || disabled} variant={'outline'}>
            {pending ? (
                <div className="flex items-center">
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2 duration-1000" />
                    Uploading...
                </div>
            ) : (
                <span>
                    <ArrowUpIcon className="h-4 w-4" /> Upload
                </span>
            )}
        </Button>
    )
}
