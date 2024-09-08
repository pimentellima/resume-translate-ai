import SelectLanguage from '@/components/select-language'
import { Button } from '@/components/ui/button'
import { getSignedUrlFromS3Key } from '@/services/s3'
import { getResumeById } from '@/services/resumes'
import { ArrowLeft, CircleSlash2Icon } from 'lucide-react'
import Link from 'next/link'
import ButtonDownloadFile from './button-download-file'
import PdfVisualizer from './pdf-visualizer'
import PopoverChangeLayout from './popover-change-layout'

// export const revalidate = 1200

export default async function ViewResumePage({
    params,
}: {
    params: { resumeId: string }
}) {
    const resume = await getResumeById(params.resumeId)

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

    const signedUrl = await getSignedUrlFromS3Key(resume.key as string)

    return (
        <div className="flex justify-center py-4">
            <div className="w-[700px]">
                <div className="flex justify-between">
                    <Button asChild variant={'outline'}>
                        <Link href={'/resumes'}>
                            <ArrowLeft className="w-5 h-5 mr-2" /> Go back
                        </Link>
                    </Button>
                    <div className="flex gap-1">
                        <PopoverChangeLayout
                            selectedLayout={resume.layout}
                            resumeId={resume.id}
                        />
                        <SelectLanguage defaultValue={resume.language} />
                    </div>
                    <ButtonDownloadFile signedUrl={signedUrl} />
                </div>
                <PdfVisualizer url={signedUrl} />
            </div>
        </div>
    )
}
