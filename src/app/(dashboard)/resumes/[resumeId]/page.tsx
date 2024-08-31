import { Button } from '@/components/ui/button'
import { getResumeById } from '@/services/resume'
import { getS3FileByKey } from '@/services/s3'
import { CircleSlash2Icon } from 'lucide-react'
import Link from 'next/link'
import SelectLanguage from './select-language'
import FormTranslateResume from './form-translate-resume'

export default async function TranslateResumePage({
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

    const file = await getS3FileByKey(resume.key as string)

    if (!file)
        return (
            <div className="flex justify-center items-center flex-col absolute top-1/2 -translate-y-[50%] translate-x-[50%] right-1/2">
                <CircleSlash2Icon className="text-destructive h-11 w-11" />
                <h3 className="text-lg font-semibold">
                    Failed getting file from server
                </h3>
                <Button variant={'link'}>
                    <Link href={'/resumes'}>Go back</Link>
                </Button>
            </div>
        )

    return (
        <div className="py-4 px-32">
            <FormTranslateResume htmlString={file} resumeId={params.resumeId} />
            <div className="mt-4 flex justify-center">
                <div
                    className={
                        'pl-16 h-[82vh] w-[700px] overflow-auto border border-gray-300 bg-gray-100 rounded shadow-md'
                    }
                    dangerouslySetInnerHTML={{
                        __html: file,
                    }}
                />
            </div>
        </div>
    )
}
