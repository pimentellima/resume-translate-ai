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
import { Button, ButtonProps } from './ui/button'

export default function SelectLanguage({
    children,
    size,
    ...props
}: SelectProps & { size?: ButtonProps['size'] }) {
    return (
        <Select {...props}>
            <Button size={size} asChild variant="ghost">
                <SelectTrigger>
                    <SelectValue placeholder="Select a language to translate" />
                </SelectTrigger>
            </Button>
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
