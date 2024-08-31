import { Button } from '@/components/ui/button'
import { getS3FileByKey } from '@/services/s3'
import { getTranslationById } from '@/services/translation'
import { ArrowLeft, CircleSlash2Icon } from 'lucide-react'
import Link from 'next/link'
import ButtonDownloadFile from './button-download-file'

export default async function ViewTranslationPage({
    params,
}: {
    params: { translationId: string }
}) {
    const translation = await getTranslationById(params.translationId)

    if (!translation)
        return (
            <div className="flex justify-center items-center flex-col absolute top-1/2 -translate-y-[50%] translate-x-[50%] right-1/2">
                <CircleSlash2Icon className="text-destructive h-11 w-11" />
                <h3 className="text-lg font-semibold">Translation not found</h3>
                <Button variant={'link'}>
                    <Link href={'/translations'}>Go back</Link>
                </Button>
            </div>
        )

    const htmlString = await getS3FileByKey(translation.key as string)

    if (!htmlString)
        return (
            <div className="flex justify-center items-center flex-col absolute top-1/2 -translate-y-[50%] translate-x-[50%] right-1/2">
                <CircleSlash2Icon className="text-destructive h-11 w-11" />
                <h3 className="text-lg font-semibold">
                    Failed getting file from server
                </h3>
                <Button variant={'link'}>
                    <Link href={'/translations'}>Go back</Link>
                </Button>
            </div>
        )

    return (
        <div className="py-4 flex justify-center">
            <div className="w-[700px]">
                <div className="flex justify-between">
                    <Button asChild variant={'outline'} size={'lg'}>
                        <Link href={'/translations'}>
                            <ArrowLeft className="h-5 w-5 mr-2" /> Go back
                        </Link>
                    </Button>
                    <ButtonDownloadFile
                        htmlString={htmlString}
                        fileName={translation.name || 'translation.html'}
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <div
                        className={
                            'pl-16 h-[82vh] overflow-auto border border-gray-300 bg-gray-100 rounded shadow-md'
                        }
                        dangerouslySetInnerHTML={{
                            __html: htmlString,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
