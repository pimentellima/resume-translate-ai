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
import { LogIn, LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

export default function DropdownMenuAccount() {
    const session = useSession()
    const pathname = usePathname()
    const params = useParams()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <User className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {session?.data?.user ? (
                        <DropdownMenuItem
                            onClick={() =>
                                signOut({
                                    callbackUrl: params.resumeId
                                        ? pathname
                                        : undefined,
                                })
                            }
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem>
                            <Link
                                href={'/sign-in'}
                                className="flex items-center"
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign in
                            </Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
