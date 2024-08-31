import { auth } from '@/lib/auth'
import { getUserById } from '@/services/user'
import { File } from 'lucide-react'
import { redirect } from 'next/navigation'
import { DialogTranslateResume } from './dialog-translate-resume'
import TranslationItem from './translation-item'

export default async function TranslationsPage() {
    const session = await auth()
    if (!session) {
        return redirect('/sign-in')
    }
    const user = await getUserById(session.user.id)

    return (
        <div className="py-10 px-64 ">
            <h1 className="font-serif text-3xl">Translations</h1>
            {user.translations.length === 0 ? (
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
                    <div className="mt-3 flex flex-col gap-2">
                        {user.translations.map((t) => (
                            <TranslationItem translation={t} key={t.id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
