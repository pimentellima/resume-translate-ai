'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useFormStatus } from 'react-dom'

export default function FormTranslateDocument({
    htmlContent,
    setHtmlContent,
    translatedDocument,
    setTranslatedDocument,
}: {
    htmlContent: string | undefined
    setHtmlContent: (htmlContent: string | undefined) => void
    translatedDocument: string | undefined
    setTranslatedDocument: (translatedDocument: string | undefined) => void
}) {
    const [error, setError] = useState('')

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setError(' ')

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
        <form
            onSubmit={async (e) => {
                /*    e.preventDefault()
                const [beforeBody, body, afterBody] = splitHtmlDocument(
                    htmlContent as string
                )
                const result = await translateDocument(body)
                if (result.error) {
                    setError(result.error)
                }
                setTranslatedDocument(
                    beforeBody + result.translatedDocument + afterBody
                ) */
            }}
            className="p-10 w-[450px] rounded-md bg-background flex flex-col gap-2"
        >
            <Input
                onChange={handleFileChange}
                className=""
                accept=".html"
                id="file"
                type="file"
                name="file"
            />
            <ButtonSubmit disabled={!htmlContent} />
            {error && <div className="text-destructive">{error}</div>}
        </form>
    )
}

function ButtonSubmit({ disabled }: { disabled?: boolean }) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending || disabled} variant={'outline'}>
            {pending ? (
                <div className="flex items-center">
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2 duration-1000" />
                    Submitting...
                </div>
            ) : (
                <span>{'Submit'}</span>
            )}
        </Button>
    )
}
