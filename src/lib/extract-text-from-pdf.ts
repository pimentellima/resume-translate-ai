import pdf from 'pdf-parse/lib/pdf-parse'

export async function extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
    return (await pdf(fileBuffer)).text
}
