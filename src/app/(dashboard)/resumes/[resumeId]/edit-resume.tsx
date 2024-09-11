'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ButtonDownloadFile from './button-download-file'
import PdfVisualizer from './pdf-visualizer'
import PopoverChangeLayout from './popover-change-layout'
import SelectResumeLanguage from './select-resume-language'
import { useState } from 'react'
import { testDraw } from '../test-draw'

export default function EditResume({
    layout,
    language,
    resumeId,
    pdfUrl,
}: {
    layout: any
    language: any
    resumeId: string
    pdfUrl: string
}) {
    const [loading, setLoading] = useState(false)

    return (
        <div className="w-[700px]">
            <div className="flex justify-between">
                <Button asChild variant={'outline'}>
                    <Link href={'/resumes'}>
                        <ArrowLeft className="w-5 h-5 mr-2" /> Go back
                    </Link>
                </Button>
                <div>
                    <SelectResumeLanguage
                        setLoading={setLoading}
                        resumeId={resumeId}
                        selectedLanguage={language}
                    />
                </div>
                <ButtonDownloadFile signedUrl={pdfUrl} />
            </div>
            <PdfVisualizer url={pdfUrl} loading={loading} />
        </div>
    )
}
