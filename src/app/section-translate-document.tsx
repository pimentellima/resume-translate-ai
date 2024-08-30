'use client'

import { useState } from 'react'
import FormTranslateDocument from './form-translate-document'

export default function SectionTranslateDocument() {
    const [htmlContent, setHtmlContent] = useState<string | undefined>(
        undefined
    )
    const [translatedDocument, setTranslatedDocument] = useState<
        string | undefined
    >(undefined)

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <FormTranslateDocument
                    translatedDocument={translatedDocument}
                    setTranslatedDocument={setTranslatedDocument}
                    htmlContent={htmlContent}
                    setHtmlContent={setHtmlContent}
                />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="p-4 bg-background rounded-md">
                    <h2 className="text-lg font-medium">Original</h2>
                    {htmlContent ? (
                        <div
                            className="pl-20 w-full max-w-4xl h-[700px] overflow-auto border border-gray-300 p-5 bg-gray-100 rounded shadow-md"
                            dangerouslySetInnerHTML={{
                                __html: htmlContent,
                            }}
                        />
                    ) : (
                        <p className="text-sm">Content will appear here</p>
                    )}
                </div>
                <div className="p-4 bg-background rounded-md">
                    <h2 className="text-lg font-medium">Translated</h2>
                    {translatedDocument ? (
                        <div
                            className="pl-20 w-full max-w-4xl h-[700px] overflow-auto border border-gray-300 p-5 bg-gray-100 rounded shadow-md"
                            dangerouslySetInnerHTML={{
                                __html: translatedDocument,
                            }}
                        />
                    ) : (
                        <p className="text-sm">Content will appear here</p>
                    )}
                </div>
            </div>
        </div>
    )
}
