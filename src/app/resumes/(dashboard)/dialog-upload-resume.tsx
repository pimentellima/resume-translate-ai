'use client'
import ButtonSubmit from '@/components/button-submit'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ArrowUpCircle } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useFormState } from 'react-dom'
import uploadDocument from './upload-document'

export function DialogUploadResume() {
    const [open, setOpen] = useState(false)
    const [error, action] = useFormState(uploadDocument, undefined)
    const [htmlContent, setHtmlContent] = useState<string | undefined>(
        undefined
    )

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (typeof e.target?.result !== 'string') {
                    return
                }

                setHtmlContent(e.target.result)
            }
            reader.readAsText(file)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button className="mt-3">
                    <ArrowUpCircle className="h-4 w-4 mr-2" /> Upload
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Upload resume</DialogTitle>
                </DialogHeader>
                <form action={action} className="py-2">
                    <Input
                        onChange={handleFileChange}
                        name="file"
                        id="file"
                        type="file"
                        accept=".html"
                    />
                    {htmlContent && (
                        <div
                            className="mt-2 pl-20 w-full h-[500px] overflow-auto border border-gray-300 p-5 bg-gray-100 rounded shadow-md"
                            dangerouslySetInnerHTML={{
                                __html: htmlContent,
                            }}
                        />
                    )}
                    {error && (
                        <p className="text-destructive text-sm mt-1 text-right">
                            {error}
                        </p>
                    )}
                    <div className="flex justify-end gap-1 mt-6">
                        <Button
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
