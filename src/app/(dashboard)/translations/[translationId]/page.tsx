import { Button } from '@/components/ui/button'
import { getSignedUrlFromS3Key } from '@/services/s3'
import { getTranslationById } from '@/services/translations'
import { ArrowLeft, CircleSlash2Icon } from 'lucide-react'
import Link from 'next/link'
import ButtonDownloadFile from './button-download-file'
import PdfVisualizer from './pdf-visualizer'
import SelectLanguage from '@/components/select-language'
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectItem,
} from '@/components/ui/select'

// export const revalidate = 1200

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

    const signedUrl = await getSignedUrlFromS3Key(translation.key as string)
    return (
        <div className="flex justify-center py-4">
            <div className="w-[700px]">
                <div className="flex justify-between">
                    <Button asChild variant={'outline'}>
                        <Link href={'/translations'}>
                            <ArrowLeft className="w-5 h-5 mr-2" /> Go back
                        </Link>
                    </Button>
                    <div className="flex gap-1">
                        <Select defaultValue="default">
                            <SelectTrigger>
                                <SelectValue placeholder="Change layout" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="default">
                                        Default layout
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <SelectLanguage defaultValue={translation.language} />
                    </div>
                    <ButtonDownloadFile signedUrl={signedUrl} />
                </div>
                <PdfVisualizer url={signedUrl} />
            </div>
        </div>
    )
}
