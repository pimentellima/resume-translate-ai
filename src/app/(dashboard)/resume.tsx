import { resumes } from '@/drizzle/schema'
import { InferSelectModel } from 'drizzle-orm'
import { File } from 'lucide-react'
import ButtonDeleteResume from './button-delete-resume'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Resume({
    resume,
}: {
    resume: InferSelectModel<typeof resumes>
}) {
    return (
        <div className="rounded-md p-3 bg-card grid grid-cols-[2fr,1fr]">
            <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                <Button className="px-0 text-base" variant="link" asChild>
                    <Link href={'/resumes/' + resume.id}>{resume.name}</Link>
                </Button>
            </div>
            <div className="grid grid-cols-[1fr,2fr,1fr] justify-items-center items-center">
                <span>{(resume.fileSize * 0.001).toFixed(2)} KB</span>
                <span>
                    {resume.createdAt &&
                        formatDistanceToNow(new Date(resume.createdAt), {
                            addSuffix: true,
                        })}
                </span>
                <div className="flex justify-end">
                    <ButtonDeleteResume resumeId={resume.id} />
                </div>
            </div>
        </div>
    )
}
