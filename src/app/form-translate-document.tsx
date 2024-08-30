'use client'
import { Input } from '@/components/ui/input'
import ButtonSubmit from '../components/button-submit'
import translateDocument from './translate-document'
import { ChangeEvent, useState } from 'react'
import { splitHtmlDocument } from '../lib/split-html-document'

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
            <ButtonSubmit disabled={!htmlContent} variant={'outline'} />
            {error && <div className="text-destructive">{error}</div>}
        </form>
    )
}
