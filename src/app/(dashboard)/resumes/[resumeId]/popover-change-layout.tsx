'use client'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { layoutEnum, resumes } from '@/drizzle/schema'
import { CheckIcon, ChevronUp, LayoutGrid } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { changeResumeLayout } from './change-resume-layout'
import { InferSelectModel } from 'drizzle-orm'

const layoutThumbnail = {
    metro: 'https://via.placeholder.com/150',
    simple: 'https://via.placeholder.com/150',
}

export default function PopoverChangeLayout({
    resumeId,
    selectedLayout,
    setLoading,
}: {
    resumeId: string
    selectedLayout: InferSelectModel<typeof resumes>['layout']
    setLoading: (loading: boolean) => void
}) {
    const [open, setOpen] = useState(false)
    const layouts = Object.values(z.enum(layoutEnum.enumValues).Values)

    return (
        <Popover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger asChild>
                <Button className="gap-1" variant="outline">
                    <LayoutGrid className="w-4 h-4" />
                    <ChevronUp
                        className={`w-3 h-3 opacity-50 ${
                            open && 'rotate-180'
                        } transition-transform`}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-full gap-2">
                {layouts.map((layout, index) => (
                    <button
                        disabled={layout === selectedLayout}
                        onClick={async () => {
                            setOpen(false)
                            setLoading(true)
                            const error = await changeResumeLayout(
                                resumeId,
                                layout
                            )
                            if (error) {
                                //
                                return
                            }
                            setLoading(false)
                        }}
                        key={index}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md shadow-sm w-28">
                            {/* <Image src={}/> */}
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                            <p>{layout}</p>
                            {layout === selectedLayout && (
                                <CheckIcon className="w-3 h-3 ml-1 opacity-50" />
                            )}
                        </div>
                    </button>
                ))}
            </PopoverContent>
        </Popover>
    )
}
