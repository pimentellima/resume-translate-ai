import { Button } from '@/components/ui/button'
import { resumes } from '@/drizzle/schema'
import { formatDistanceToNow } from 'date-fns'
import { InferSelectModel } from 'drizzle-orm'
import { File } from 'lucide-react'
import Link from 'next/link'
import ButtonDeleteResume from './button-delete-resume'
import { languages } from '../../../lib/languages'
import { getSignedUrlFromS3Key } from '@/services/s3'
import ButtonDownloadFile from './[resumeId]/button-download-file'

export default async function ResumeItem({
    resume,
}: {
    resume: InferSelectModel<typeof resumes>
}) {
    const signedUrl = await getSignedUrlFromS3Key(resume.key as string)

    const language = languages.find(
        (l) => l.value === resume.language
    )?.label

    return (
        <div className="rounded-md p-3 bg-card grid grid-cols-[1fr,3fr] gap-3">
            <div className="grid grid-cols-[20px,1fr] gap-2 items-center">
                <File className="inline w-6 h-6" />
                <Link
                    className="overflow-hidden text-base text-ellipsis whitespace-nowrap hover:underline underline-offset-4"
                    href={'/resumes/' + resume.id}
                >
                    {resume.name}
                </Link>
            </div>
            <div className="grid grid-cols-[2fr,5fr,5fr,2fr] items-center justify-items-start">
                <span>{(resume.fileSize * 0.001).toFixed(2)} KB</span>
                <span className="text-nowrap">{language}</span>
                <span className="text-nowrap">
                    {resume.createdAt &&
                        formatDistanceToNow(new Date(resume.createdAt), {
                            addSuffix: true,
                        })}
                </span>
                <div className='flex gap-1'>
                    <ButtonDownloadFile variant={'secondary'} signedUrl={signedUrl} />
                    <ButtonDeleteResume resumeId={resume.id} />
                </div>
            </div>
        </div>
    )
}
