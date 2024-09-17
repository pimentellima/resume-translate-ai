'use client'
import SelectLanguage from '@/components/select-language'
import { resumes } from '@/drizzle/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { usePathname, useRouter } from 'next/navigation'
import { changeResumeLanguage } from './change-resume-language'

export default function SelectResumeLanguage({
    resumeId,
    selectedLanguage,
    setLoading,
}: {
    resumeId: string
    selectedLanguage: InferSelectModel<typeof resumes>['language']
    setLoading: (loading: boolean) => void
}) {
    return (
        <SelectLanguage
            defaultValue={selectedLanguage || undefined}
            onValueChange={async (language) => {
                setLoading(true)
                const error = await changeResumeLanguage(
                    resumeId,
                    language as InferInsertModel<typeof resumes>['language']
                )
                if (error) {
                    //
                    return
                }
                setLoading(false)
            }}
        />
    )
}
