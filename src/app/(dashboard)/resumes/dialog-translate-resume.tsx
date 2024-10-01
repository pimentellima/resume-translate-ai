'use client'
import SelectLanguage from '@/components/select-language'
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
import { ArrowUpCircle, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import createDocument from '../../create-document'

type FormValues = {
    file: FileList
    language: string
}

export function DialogTranslateResume() {
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
        watch,
    } = useForm<FormValues>()

    const onSubmit = async (data: FormValues) => {
        startProgressBar()
        const formData = new FormData()
        formData.set('file', data.file[0])
        formData.set('language', data.language)
        const error = await createDocument(undefined, formData)
        setProgress(0)
        if (error) {
            setError(error)
            return
        }
        setOpen(false)
    }

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
                    setError(null)
                    reset()
                }
            }}
        >
            <DialogTrigger asChild>
                <Button size={'lg'} className="mt-3">
                    <ArrowUpCircle className="w-5 h-5 mr-2" /> Translate resume
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Translate resume</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="py-2">
                    <div className="grid space-y-1">
                        <Controller
                            name="file"
                            control={control}
                            defaultValue={undefined}
                            render={({ field: { ref, ...field } }) => (
                                <>
                                    <Button
                                        className="w-full"
                                        variant={'outline'}
                                        asChild
                                    >
                                        <label htmlFor="file">
                                            {field.value?.[0]?.name
                                                ? field.value?.[0].name
                                                : 'Choose file'}
                                        </label>
                                    </Button>
                                    <Input
                                        type="file"
                                        {...register('file')}
                                        accept=".pdf"
                                        id="file"
                                        className="hidden"
                                    />
                                </>
                            )}
                        />
                        <Controller
                            name="language"
                            control={control}
                            defaultValue="enUS"
                            render={({ field }) => {
                                return (
                                    <SelectLanguage
                                        {...field}
                                        onValueChange={field.onChange}
                                    />
                                )
                            }}
                        />

                        {error && (
                            <p className="mt-1 text-sm text-right text-destructive">
                                {error}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mt-3">
                            <ProgressBar progress={progress} />
                        </div>
                        <div className="flex justify-end gap-1 mt-3">
                            <ButtonCancel disabled={isSubmitting} closeModal={() => setOpen(false)} />
                            <ButtonSubmit disabled={isSubmitting} />
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function ProgressBar({ progress }: { progress: number }) {
    if (progress === 0) return null

    return <Progress className="mt-3" value={progress} />
}

function ButtonSubmit({ disabled }: { disabled?: boolean }) {
    return (
        <Button disabled={disabled}>
            {disabled ? (
                <div className="flex items-center">
                    <LoaderCircle className="w-4 h-4 mr-2 duration-1000 animate-spin" />
                    Translating...
                </div>
            ) : (
                <div className="flex items-center">
                    <ArrowUpCircle className="w-4 h-4 mr-2" /> Translate
                </div>
            )}
        </Button>
    )
}

function ButtonCancel({
    closeModal,
    disabled,
}: {
    disabled:boolean
    closeModal: () => void
}) {
    return (
        <Button
            disabled={disabled}
            type="button"
            onClick={closeModal}
            variant={'destructive'}
        >
            Cancel
        </Button>
    )
}
