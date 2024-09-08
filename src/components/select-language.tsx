import { languagesWithLabels } from '@/app/(dashboard)/resumes/language-with-labels'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

export default function SelectLanguage({ children, ...props }: SelectProps) {
    return (
        <Select {...props}>
            <SelectTrigger>
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
