'use client'
import SelectLanguage from '@/components/select-language'
import { resumes } from '@/drizzle/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { usePathname, useRouter } from 'next/navigation'
import { changeResumeLanguage } from './change-resume-language'
import { ButtonProps } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function SelectResumeLanguage({
    resumeId,
    selectedLanguage,
    setLoading,
}: {
    resumeId: string
    selectedLanguage: InferSelectModel<typeof resumes>['language']
    setLoading: (loading: boolean) => void
}) {
    const { toast } = useToast()
    return (
        <SelectLanguage
            size={'lg'}
            defaultValue={selectedLanguage || undefined}
            onValueChange={async (language) => {
                setLoading(true)
                const error = await changeResumeLanguage(
                    resumeId,
                    language as InferInsertModel<typeof resumes>['language']
                )
                if (error) {
                    toast({
                        title: 'Failed to change language',
                        variant: 'destructive',
                    })
                    return
                }
                setLoading(false)
            }}
        />
    )
}
