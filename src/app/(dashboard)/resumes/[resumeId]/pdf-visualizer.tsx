'use client'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

export default function PdfVisualizer({ url }: { url: string }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    return (
        <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div className="h-[750px] mt-3">
                    <Viewer
                        renderError={(error) => (
                            <div className="flex items-center justify-center h-full bg-white rounded-sm">
                                <p className="text-sm text-destructive">
                                    Failed to fetch document
                                </p>
                            </div>
                        )}
                        enableSmoothScroll={true}
                        fileUrl={url}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
            </Worker>
        </>
    )
}
