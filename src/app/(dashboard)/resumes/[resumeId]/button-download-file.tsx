'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ArrowDownCircle } from 'lucide-react'

export default function ButtonDownloadFile({
    label,
    fileUrl,
    ...props
}: Omit<ButtonProps, 'onClick'> & {
    fileUrl: string
    label?: string
}) {
    const { toast } = useToast()

    const handleDownload = async () => {
        try {
            const response = await fetch(fileUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            })
            if (!response.ok)
                return toast({
                    title: 'Failed to download file',
                    variant: 'destructive',
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
            {label && <span className="ml-1">{label}</span>}
        </Button>
    )
}
