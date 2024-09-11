import { Button } from '@/components/ui/button'
import { getResumeById } from '@/services/resumes'
import { getSignedUrlFromS3Key } from '@/services/s3'
import { CircleSlash2Icon } from 'lucide-react'
import Link from 'next/link'
import EditResume from './edit-resume'

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
