'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ButtonDownloadFile from './button-download-file'
import PdfVisualizer from './pdf-visualizer'
import SelectResumeLanguage from './select-resume-language'
import ButtonDeleteResume from '../button-delete-resume'

export default function EditResume({
    language,
    resumeId,
    pdfUrl,
}: {
    language: any
    resumeId: string
    pdfUrl: string
}) {
    const [loading, setLoading] = useState(false)

    return (
        <div className="w-full md:w-[700px]">
            <div className="px-4 flex flex-col md:flex-row gap-1">
                <Button size={'lg'} asChild variant={'outline'}>
                    <Link href={'/resumes'}>
                        <ArrowLeft className="w-5 h-5 mr-2" /> Resumes
                    </Link>
                </Button>
                <SelectResumeLanguage
                    setLoading={setLoading}
                    resumeId={resumeId}
                    selectedLanguage={language}
                />
                <ButtonDownloadFile
                    fileUrl={pdfUrl}
                    disabled={!language}
                    label="Download"
                    size={'lg'}
                />
                <ButtonDeleteResume resumeId={resumeId} size={'lg'} />
            </div>
            <PdfVisualizer
                translated={!!language}
                url={pdfUrl}
                loading={loading}
            />
        </div>
    )
}
