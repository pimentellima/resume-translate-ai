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
import { useParams, usePathname } from 'next/navigation'

export default function DropdownMenuAccount() {
    const params = useParams()
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <User className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-36">
                <DropdownMenuItem>
                    <CogIcon className="w-4 h-4 mr-2" />
                    Settings
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
