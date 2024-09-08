'use client'

import GoogleIcon from '@/components/google-icon'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function SignInForm() {
    const params = useSearchParams()
    const error = params.get('error')

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome back!</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    size={'lg'}
                    onClick={() => signIn('google')}
                    className="w-full mt-2"
                >
                    <GoogleIcon className="w-5 h-5 mr-2" />
                    Sign in with Google
                </Button>
                {error && (
                    <p className="mt-1 text-sm text-destructive">
                        An error occurred signing in
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
