import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function VerifyPage({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}) {
    const session = await auth()

    if (session?.user) {
        redirect('/resumes')
    }

    return (
        <div className="flex items-center justify-center h-screen px-3 bg-background md:px-0">
            <Card className="w-full mx-2 md:w-[400px]">
                <CardHeader>
                    <CardTitle className="text-xl">Check your email</CardTitle>
                    <CardDescription>
                        A sign in link has been sent to your email address.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
