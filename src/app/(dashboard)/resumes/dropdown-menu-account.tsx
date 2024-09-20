'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CogIcon, LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DropdownMenuAccount() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()

    return (
        <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <User className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-36">
                <DropdownMenuItem>
                    <button
                        onClick={() => {
                            router.push('/settings')
                            setOpen(false)
                        }}
                        className="flex items-center"
                    >
                        <CogIcon className="w-4 h-4 mr-2" />
                        Settings
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        signOut({
                            callbackUrl: params.resumeId ? pathname : undefined,
                        })
                    }
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
