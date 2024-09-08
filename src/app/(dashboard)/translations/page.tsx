import { auth } from '@/lib/auth'
import { getUserById } from '@/services/user'
import { ArrowRight, ChevronLeft, ChevronRight, File } from 'lucide-react'
import { redirect } from 'next/navigation'
import { DialogTranslateResume } from './dialog-translate-resume'
import TranslationItem from './translation-item'
import { getTranslationsByUserId } from '@/services/translations'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function TranslationsPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const session = await auth()
    if (!session) {
        return redirect('/sign-in')
    }
    const page = searchParams?.page ? Number(searchParams.page) : 1

    const { userTranslations: translations, count } =
        await getTranslationsByUserId(session.user.id, page)

    return (
        <div className="px-64 py-10 ">
            <h1 className="font-serif text-3xl">Translations</h1>
            {count === 0 ? (
                <div className="flex justify-center items-center flex-col absolute top-1/2 -translate-y-[50%] translate-x-[50%] right-1/2">
                    <File className="h-11 w-11" />
                    <h3 className="text-lg font-semibold">No translations</h3>
                    <p className="text-sm text-accent-foreground">
                        Get started by translating a new resume.
                    </p>
                    <DialogTranslateResume />
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <DialogTranslateResume />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        {translations.map((t) => (
                            <TranslationItem translation={t} key={t.id} />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        {page > 1 ? (
                            <Link
                                className="flex items-center"
                                href={'/translations?page=' + (page - 1)}
                            >
                                <ChevronLeft className="w-4 h-4 ml-2" />
                            </Link>
                        ) : (
                            <ChevronLeft className="w-4 h-4 ml-2 opacity-70" />
                        )}
                        <p>{`Page ${page} of ${Math.ceil(count / 10)}`}</p>
                        {page < Math.ceil(count / 10) ? (
                            <Link
                                className="flex items-center"
                                href={'/translations?page=' + (page + 1)}
                            >
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        ) : (
                            <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
