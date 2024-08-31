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
import { Progress } from '@/components/ui/progress'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowUpCircle, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import translateDocument from './translate-document'
import { languagesWithLabels } from './language-with-labels'

export function DialogTranslateResume() {
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const [file, setFile] = useState<File | undefined>()
    const [error, action] = useFormState(translateDocument, undefined)

    const startProgressBar = () => {
        setProgress(13)
        setTimeout(() => {
            setProgress((progress) => (progress === 0 ? 0 : 66))
        }, 5000)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open)
                if (open) {
                    setProgress(0)
                    setFile(undefined)
                }
            }}
        >
            <DialogTrigger asChild>
                <Button size={'lg'} className="mt-3">
                    <ArrowUpCircle className="h-5 w-5 mr-2" /> Upload resume
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Upload resume</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={() => startProgressBar()}
                    action={action}
                    className="py-2"
                >
                    <div className="grid space-y-1">
                        <Button className="w-full" variant={'outline'} asChild>
                            <label htmlFor="file">
                                {file ? file.name : 'Choose file'}
                            </label>
                        </Button>
                        <SelectLanguage />
                        <Input
                            onChange={(e) => {
                                setFile(e.target.files?.[0])
                            }}
                            name="file"
                            id="file"
                            type="file"
                            accept=".html"
                            className="hidden"
                        />
                        {error && (
                            <p className="text-destructive text-sm mt-1 text-right">
                                {error}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mt-3">
                            <ProgressBar progress={progress} />
                        </div>
                        <div className="mt-3 flex justify-end gap-1">
                            <Button
                                disabled={progress > 0}
                                type="button"
                                onClick={() => setOpen(false)}
                                variant={'destructive'}
                            >
                                Cancel
                            </Button>
                            <ButtonSubmit disabled={!file} />
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function ProgressBar({ progress }: { progress: number }) {
    const { pending } = useFormStatus()
    if (!pending) return null
    if (progress === 0) return null

    return <Progress className="mt-3" value={progress} />
}

function SelectLanguage() {
    return (
        <Select defaultValue='enUS' name="language">
            <SelectTrigger>
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {languagesWithLabels.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                            {l.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function ButtonSubmit({ disabled }: { disabled?: boolean }) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={disabled}>
            {pending ? (
                <div className="flex items-center">
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2 duration-1000" />
                    Translating...
                </div>
            ) : (
                <div className="flex items-center">
                    <ArrowUpCircle className="h-4 w-4 mr-2" /> Upload
                </div>
            )}
        </Button>
    )
}
