'use client'
import translateDocument from '@/app/translate-document'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'

export default function FormTranslateResume({
    htmlString,
    resumeId,
}: {
    htmlString: string
    resumeId: string
}) {
    const [error, action] = useFormState(translateDocument, undefined)

    return (
        <form className='flex justify-center gap-2' action={action}>
            <input value={htmlString} className="hidden" name="htmlString" />
            <input value={resumeId} className="hidden" name="resumeId" />
            <SelectLanguage />
            <ButtonSubmit />
        </form>
    )
}

const languagesWithLabels = [
    { value: 'enUS', label: '🇺🇸 English (United States)' },
    { value: 'enGB', label: '🇬🇧 English (United Kingdom)' },
    { value: 'esES', label: '🇪🇸 Español (España)' },
    { value: 'esMX', label: '🇲🇽 Español (México)' },
    { value: 'frFR', label: '🇫🇷 Français (France)' },
    { value: 'deDE', label: '🇩🇪 Deutsch (Deutschland)' },
    { value: 'itIT', label: '🇮🇹 Italiano (Italia)' },
    { value: 'ptPT', label: '🇵🇹 Português (Portugal)' },
    { value: 'ptBR', label: '🇧🇷 Português (Brasil)' },
    { value: 'ruRU', label: '🇷🇺 Русский (Россия)' },
    { value: 'jaJP', label: '🇯🇵 日本語 (日本)' },
    { value: 'koKR', label: '🇰🇷 한국어 (대한민국)' },
    { value: 'zhCN', label: '🇨🇳 中文 (简体, 中国)' },
    { value: 'zhTW', label: '🇹🇼 中文 (繁體, 台灣)' },
    { value: 'arSA', label: '🇸🇦 العربية (السعودية)' },
    { value: 'hiIN', label: '🇮🇳 हिंदी (भारत)' },
    { value: 'nlNL', label: '🇳🇱 Nederlands (Nederland)' },
    { value: 'svSE', label: '🇸🇪 Svenska (Sverige)' },
    { value: 'fiFI', label: '🇫🇮 Suomi (Suomi)' },
    { value: 'noNO', label: '🇳🇴 Norsk (Norge)' },
]

function SelectLanguage() {
    return (
        <Select name="language">
            <SelectTrigger className="w-[230px]">
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {languagesWithLabels.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                            {l.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function ButtonSubmit() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} variant={'default'}>
            {pending ? (
                <div className="flex items-center">
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2 duration-1000" />
                    {'Translating...'}
                </div>
            ) : (
                <div className="flex items-center">
                    Translate
                    <ArrowRight className="h-4 w-4 ml-2" />
                </div>
            )}
        </Button>
    )
}
