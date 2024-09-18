'use client'

import { Switch } from '@/components/ui/switch'
import { usePathname, useRouter } from 'next/navigation'

export default function SwitchIsYearly({ isYearly }: { isYearly: boolean }) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Switch
            checked={isYearly}
            onCheckedChange={(isYearly) => {
                router.push(
                    pathname + `?yearly=${isYearly ? 'true ' : 'false'}`,
                    { scroll: false }
                )
            }}
            className="mx-4"
        />
    )
}
