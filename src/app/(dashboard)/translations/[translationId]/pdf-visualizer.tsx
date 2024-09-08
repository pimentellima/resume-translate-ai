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
                        enableSmoothScroll={true}
                        fileUrl={'https://proxy.cors.sh/' + url}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
            </Worker>
        </>
    )
}
