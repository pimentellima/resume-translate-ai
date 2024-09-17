'use client'

import { Button } from '@/components/ui/button'
import { FileIcon, LoaderCircle } from 'lucide-react'
import { useRef } from 'react'
import createDocument from '../create-document'
import { useFormState, useFormStatus } from 'react-dom'

export default function FormSubmitFile() {
    const [error, action] = useFormState(createDocument, undefined)

    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form ref={formRef} action={action}>
            <SelectFileButton />
            {error && <p className="absolute text-sm text-red-500">{error}</p>}
            <input
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        formRef.current?.requestSubmit()
                    }
                }}
                accept=".pdf"
                name="file"
                type="file"
                id="file"
                className="hidden"
            />
        </form>
    )
}

function SelectFileButton() {
    const { pending } = useFormStatus()

    return pending ? (
        <Button className="text-base" size={'lg'} type="button">
            <LoaderCircle className="w-4 h-4 mr-2 duration-1000 animate-spin" />
            Loading document...
        </Button>
    ) : (
        <Button asChild size={'lg'} className="text-base" type="button">
            <label htmlFor="file">
                <FileIcon className="w-5 h-5 mr-2" />
                Select file
            </label>
        </Button>
    )
}
