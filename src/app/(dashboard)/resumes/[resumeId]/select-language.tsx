'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

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

export default function SelectLanguage() {
    const [value, setValue] = useState('enUS')
    
    return (
        <Select value={value} onValueChange={(value) => setValue(value)}>
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
