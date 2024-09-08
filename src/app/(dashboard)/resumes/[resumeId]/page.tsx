import { Button } from '@/components/ui/button'
import { getResumeById } from '@/services/resumes'
import { getSignedUrlFromS3Key } from '@/services/s3'
import { ArrowLeft, CircleSlash2Icon, Loader, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import ButtonDownloadFile from './button-download-file'
import PdfVisualizer from './pdf-visualizer'
import PopoverChangeLayout from './popover-change-layout'
import SelectResumeLanguage from './select-resume-language'
import EditResume from './edit-resume'

// export const revalidate = 1200

export default async function ViewResumePage({
    params,
    searchParams,
}: {
    params: { resumeId: string }
    searchParams?: { loading?: string }
}) {
    const resume = await getResumeById(params.resumeId)
    const loading = searchParams?.loading === 'true'

    if (!resume)
        return (
            <div className="flex justify-center items-center flex-col absolute top-1/2 -translate-y-[50%] translate-x-[50%] right-1/2">
                <CircleSlash2Icon className="text-destructive h-11 w-11" />
                <h3 className="text-lg font-semibold">Resume not found</h3>
                <Button variant={'link'}>
                    <Link href={'/resumes'}>Go back</Link>
                </Button>
            </div>
        )

    const pdfUrl = await getSignedUrlFromS3Key(resume.key as string)

    return (
        <div className="flex justify-center py-4">
            <EditResume
                resumeId={resume.id}
                language={resume.language}
                layout={resume.layout}
                pdfUrl={pdfUrl}
            />
        </div>
    )
}
