import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { languages } from '@/lib/languages'
import { SelectProps } from '@radix-ui/react-select'

export default function SelectLanguage({ children, ...props }: SelectProps) {
    return (
        <Select {...props}>
            <SelectTrigger>
                <SelectValue placeholder="Select a language to translate" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {languages.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                            {l.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
