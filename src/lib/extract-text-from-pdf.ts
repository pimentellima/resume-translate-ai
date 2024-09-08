import pdf from 'pdf-parse/lib/pdf-parse'

export async function extractTextFromPdf(file: File) {
    const fileArrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(fileArrayBuffer)
    return await pdf(fileBuffer)
}
