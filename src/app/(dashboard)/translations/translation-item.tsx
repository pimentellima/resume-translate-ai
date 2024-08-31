import { Button } from '@/components/ui/button'
import { translations } from '@/drizzle/schema'
import { formatDistanceToNow } from 'date-fns'
import { InferSelectModel } from 'drizzle-orm'
import { File } from 'lucide-react'
import Link from 'next/link'
import ButtonDeleteTranslation from './button-delete-translation'
import { languagesWithLabels } from './language-with-labels'

export default function TranslationItem({
    translation,
}: {
    translation: InferSelectModel<typeof translations>
}) {
    const language = languagesWithLabels.find(
        (l) => l.value === translation.language
    )?.label
    return (
        <div className="rounded-md p-3 bg-card grid grid-cols-[1fr,3fr] gap-3">
            <div className="grid grid-cols-[20px,1fr] gap-2 items-center">
                <File className="inline w-6 h-6" />
                <Link
                    className="overflow-hidden text-base text-ellipsis whitespace-nowrap hover:underline underline-offset-4"
                    href={'/translations/' + translation.id}
                >
                    {translation.name}
                </Link>
            </div>
            <div className="grid grid-cols-[5fr,5fr,5fr,1fr] items-center justify-items-end">
                <span>{(translation.fileSize * 0.001).toFixed(2)} KB</span>
                <span className="text-nowrap">{language}</span>
                <span className="text-nowrap">
                    {translation.createdAt &&
                        formatDistanceToNow(new Date(translation.createdAt), {
                            addSuffix: true,
                        })}
                </span>
                <div className="flex justify-end">
                    <ButtonDeleteTranslation translationId={translation.id} />
                </div>
            </div>
        </div>
    )
}
