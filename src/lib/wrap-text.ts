export default function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    words.forEach((word) => {
        const testLine = currentLine + word + ' '
        if (testLine.length * fontSize * 0.5 < maxWidth) {
            currentLine = testLine
        } else {
            lines.push(currentLine.trim())
            currentLine = word + ' '
        }
    })

    lines.push(currentLine.trim())
    return lines
}
