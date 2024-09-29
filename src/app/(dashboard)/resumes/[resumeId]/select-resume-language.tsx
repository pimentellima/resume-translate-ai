'use client'
import SelectLanguage from '@/components/select-language'
import { languageEnum, resumes } from '@/drizzle/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { usePathname, useRouter } from 'next/navigation'
import { changeResumeLanguage } from './change-resume-language'
import { ButtonProps } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { z } from 'zod'

export default function SelectResumeLanguage({
    resumeId,
    selectedLanguage,
    setLoading,
}: {
    resumeId: string
    selectedLanguage: InferSelectModel<typeof resumes>['language']
    setLoading: (loading: boolean) => void
}) {
    const [value, setValue] =
        useState<typeof selectedLanguage>(selectedLanguage)

    const { toast } = useToast()
    return (
        <SelectLanguage
            size={'lg'}
            value={value || undefined}
            onValueChange={async (language: string) => {
                setValue(language as typeof selectedLanguage)
                setLoading(true)
                const error = await changeResumeLanguage(
                    resumeId,
                    language as InferInsertModel<typeof resumes>['language']
                )
                setLoading(false)
                if (error) {
                    setValue(selectedLanguage)
                    toast({
                        title: error,
                        variant: 'destructive',
                    })
                }
            }}
        />
    )
}
