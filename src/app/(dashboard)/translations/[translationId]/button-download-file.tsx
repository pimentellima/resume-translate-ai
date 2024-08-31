'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

export default function ButtonDownloadFile({
    htmlString,
    fileName,
}: {
    htmlString: string
    fileName: string
}) {
    const handleDownload = async () => {
        try {
            const blob = new Blob([htmlString], {
                type: 'text/html',
            })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }
    return (
        <Button onClick={handleDownload} size={'lg'}>
            <ArrowDown className="h-5 w-5 mr-2" />
            Download file
        </Button>
    )
}
