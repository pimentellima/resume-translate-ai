'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowDownCircle } from 'lucide-react'

export default function ButtonDownloadFile({
    signedUrl,
}: {
    signedUrl: string
}) {
    const handleDownload = async () => {
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
        <Button onClick={handleDownload}>
            <ArrowDownCircle className="w-4 h-4 mr-1" />
            Download
        </Button>
    )
}
