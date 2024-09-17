'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ButtonDownloadFile from './button-download-file'
import PdfVisualizer from './pdf-visualizer'
import SelectResumeLanguage from './select-resume-language'
import { useSession } from 'next-auth/react'
import { testDraw } from '../test-draw'

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
    const session = useSession()

    return (
        <div className="w-[700px]">
            <div className="flex justify-between">
                {session?.data?.user && (
                    <Button size={'lg'} asChild variant={'outline'}>
                        <Link href={'/resumes'}>
                            <ArrowLeft className="w-5 h-5 mr-2" /> Resumes
                        </Link>
                    </Button>
                )}
                <div>
                    <SelectResumeLanguage
                        setLoading={setLoading}
                        resumeId={resumeId}
                        selectedLanguage={language}
                    />
                </div>
                <ButtonDownloadFile label='Download' size={'lg'} signedUrl={pdfUrl} />
            </div>
            <PdfVisualizer url={pdfUrl} loading={loading} />
        </div>
    )
}
