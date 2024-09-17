'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { ArrowDown, ArrowDownCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'

export default function ButtonDownloadFile({
    signedUrl,
    label,
    ...props
}: Omit<ButtonProps, 'onClick'> & {
    signedUrl: string
    label?: string
}) {
    const session = useSession()
    const router = useRouter()
    const params = useParams()

    const handleDownload = async () => {
        if (!session?.data?.user) {
            router.push(
                `/sign-in?redirect_uri=${process.env.NEXT_PUBLIC_URL}/resumes/${params.resumeId}`
            )
            return
        }
        try {
            const response = await fetch(signedUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            })
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.setAttribute('href', url)
            link.setAttribute('download', 'document')
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }

    return (
        <Button {...props} onClick={handleDownload}>
            <ArrowDownCircle className="w-4 h-4" />
            {label && <span className='ml-1'>{label}</span>}
        </Button>
    )
}
