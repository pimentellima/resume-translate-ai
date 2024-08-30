import { resumes } from '@/drizzle/schema'
import { InferSelectModel } from 'drizzle-orm'
import { File } from 'lucide-react'
import ButtonDeleteResume from './button-delete-resume'
import { useToast } from '@/components/ui/use-toast'

export default function Resume({
    resume,
}: {
    resume: InferSelectModel<typeof resumes>
}) {
    return (
        <div className="rounded-md p-3 bg-card flex justify-between">
            <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                {resume.name}
            </div>
            <input className="hidden" name="id" />
            <ButtonDeleteResume resumeId={resume.id} />
        </div>
    )
}
