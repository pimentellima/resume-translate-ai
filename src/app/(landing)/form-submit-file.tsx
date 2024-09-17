'use client'

import { Button } from '@/components/ui/button'
import { FileIcon } from 'lucide-react'
import { useRef } from 'react'
import createDocument from '../(dashboard)/resumes/create-document'

export default function FormSubmitFile() {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form ref={formRef} action={createDocument}>
            <Button asChild size={'lg'} className="text-base">
                <label htmlFor="file">
                    <FileIcon className="w-5 h-5 mr-2" />
                    Select file
                </label>
            </Button>
            <input
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        formRef.current?.submit()
                    }
                }}
                name="file"
                type="file"
                id="file"
                className="hidden"
            />
        </form>
    )
}
