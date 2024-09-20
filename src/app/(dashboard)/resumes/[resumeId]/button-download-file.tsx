'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { ArrowDownCircle } from 'lucide-react'

export default function ButtonDownloadFile({
    resumeId,
    label,
    ...props
}: Omit<ButtonProps, 'onClick'> & {
    resumeId: string
    label?: string
}) {
    const handleDownload = async () => {
        try {
            const response = await fetch(`api/file/${resumeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            })
            if (!response.ok) {
                return
            }
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
