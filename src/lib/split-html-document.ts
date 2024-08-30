export function splitHtmlDocument(html: string) {
    // Ensure the input is a string
    if (typeof html !== 'string') {
        throw new TypeError('The input should be a string')
    }

    // Find the index of the opening and closing body tags
    const bodyStartIndex = html.indexOf('<body')
    const bodyEndIndex = html.indexOf('</body>')

    // If body tags are not found, return the whole string as is
    if (bodyStartIndex === -1 || bodyEndIndex === -1) {
        return [html, '', '']
    }

    // Adjust indices to include the body tag in the substrings
    const bodyStart = bodyStartIndex
    const bodyEnd = bodyEndIndex + '</body>'.length

    // Extract substrings
    const beforeBody = html.slice(0, bodyStart)
    const body = html.slice(bodyStart, bodyEnd)
    const afterBody = html.slice(bodyEnd)

    return [beforeBody, body, afterBody]
}
