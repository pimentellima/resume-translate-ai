import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { Resume } from './generate-translated-resume-object'

export async function drawResumeDefault(resume: Resume): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 850])

    const blueColor = rgb(0.1255, 0.4745, 0.7804)
    const blackColor = rgb(0, 0, 0)
    const grayColor = rgb(0.333, 0.333, 0.333)

    // Load standard fonts
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const fontSizeName = 21
    const fontSizeJobTitle = 11
    const fontSizeSectionTitle = 15
    const fontSizeText = 10

    let yPosition = 800
    const marginLeft = 10

    // Title: Name and Job Title
    page.drawText(`${resume.name}`, {
        x: marginLeft,
        y: yPosition,
        size: fontSizeName,
        font: helveticaBold,
        color: blackColor,
    })

    yPosition -= 20
    page.drawText(`${resume.jobTitle}`, {
        x: marginLeft,
        y: yPosition,
        size: fontSizeJobTitle,
        font: helvetica,
        color: grayColor,
    })

    /* if (resume.location) {
        yPosition -= 20
        page.drawText(
            `Location: ${resume.location.city}, ${resume.location.state}`,
            {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helvetica,
                color: blackColor,
            }
        )
    } */

    const contacts: string[] = []
    if (resume.contact?.email) contacts.push(`${resume.contact.email}`)
    if (resume.contact?.phoneNumber)
        contacts.push(`${resume.contact.phoneNumber}`)
    if (resume.contact?.linkedin)
        contacts.push(`Linkedin: ${resume.contact.linkedin}`)

    if (contacts.length > 0) {
        yPosition -= 20
        page.drawText(contacts.join('/ '), {
            x: marginLeft,
            y: yPosition,
            size: fontSizeText,
            font: helvetica,
            color: blackColor,
        })
    }

    // Summary
    yPosition -= 40
    page.drawText(resume.summarySection.sectionTitle, {
        x: marginLeft,
        y: yPosition,
        size: fontSizeSectionTitle,
        font: helveticaBold,
        color: blueColor,
    })

    yPosition -= 20
    const summaryText = wrapText(resume.summarySection.text, 500, fontSizeText)
    summaryText.forEach((line) => {
        page.drawText(line, {
            x: marginLeft,
            y: yPosition,
            size: fontSizeText,
            font: helvetica,
            color: blackColor,
        })
        yPosition -= 15
    })

    yPosition -= 20
    page.drawText(resume.experienceSection.sectionTitle, {
        x: marginLeft,
        y: yPosition,
        size: fontSizeSectionTitle,
        font: helveticaBold,
        color: blueColor,
    })

    resume.experienceSection.experiences.forEach((exp) => {
        yPosition -= 20
        page.drawText(
            `${exp.jobTitle} at ${exp.companyName} (${
                exp.remote
                    ? 'Remote'
                    : exp.location
                    ? exp.location.city + ', ' + exp.location.state
                    : ''
            })`,
            {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helveticaBold,
                color: blackColor,
            }
        )

        if (exp.date) {
            yPosition -= 15
            page.drawText(exp.date, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helvetica,
                color: grayColor,
            })
        }

        yPosition -= 20
        exp.contributions.forEach((contribution) => {
            const wrappedContributions = wrapText(
                contribution,
                500,
                fontSizeText
            )
            wrappedContributions.forEach((line, index) => {
                page.drawText(index === 0 ? `• ${line}` : line, {
                    x: marginLeft + 5,
                    y: yPosition,
                    size: fontSizeText,
                    font: helvetica,
                    color: grayColor,
                })
                yPosition -= 15
            })
        })
    })

    if (resume.projectsSection) {
        yPosition -= 20
        page.drawText(resume.projectsSection.sectionTitle, {
            x: marginLeft,
            y: yPosition,
            size: fontSizeSectionTitle,
            font: helveticaBold,
            color: blueColor,
        })

        resume.projectsSection.projects.forEach((project) => {
            yPosition -= 20
            page.drawText(project.title, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helveticaBold,
                color: blackColor,
            })

            if (project.date) {
                yPosition -= 15
                page.drawText(project.date, {
                    x: marginLeft,
                    y: yPosition,
                    size: fontSizeText,
                    font: helvetica,
                    color: grayColor,
                })
            }

            yPosition -= 20
            project.contributions.forEach((contribution) => {
                const wrappedContributions = wrapText(
                    contribution,
                    500,
                    fontSizeText
                )
                wrappedContributions.forEach((line, index) => {
                    page.drawText(index === 0 ? `• ${line}` : line, {
                        x: marginLeft + 5,
                        y: yPosition,
                        size: fontSizeText,
                        font: helvetica,
                        color: grayColor,
                    })
                    yPosition -= 15
                })
            })
        })
    }

    /*  if (resume.skillsSection) {
        yPosition -= 20
        page.drawText(resume.skillsSection.sectionTitle, {
            x: marginLeft,
            y: yPosition,
            size: fontSizeSectionTitle,
            font: helvetica,
            color: blackColor,
        })
        yPosition -= 20
        const skillsText = resume.skillsSection.skills.join(', ')
        const wrappedSkills = wrapText(skillsText, 500, fontSizeText)
        wrappedSkills.forEach((line) => {
            page.drawText(line, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helvetica,
                color: blackColor,
            })
            yPosition -= 15
        })
    } */

    if (resume.educationSection) {
        yPosition -= 20
        page.drawText(resume.educationSection.sectionTitle, {
            x: marginLeft,
            y: yPosition,
            size: fontSizeSectionTitle,
            font: helveticaBold,
            color: blueColor,
        })
        yPosition -= 20
        page.drawText(
            `${resume.educationSection.universityName} - ${resume.educationSection.title}`,
            {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helveticaBold,
                color: blackColor,
            }
        )

        if (resume.educationSection.date) {
            yPosition -= 15
            page.drawText(resume.educationSection.date, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeText,
                font: helvetica,
                color: grayColor,
            })
        }

        yPosition -= 20
        if (resume.educationSection.contributions) {
            resume.educationSection.contributions.forEach((contribution) => {
                const wrappedContributions = wrapText(
                    contribution,
                    500,
                    fontSizeText
                )
                wrappedContributions.forEach((line) => {
                    page.drawText(`• ${line}`, {
                        x: marginLeft + 5,
                        y: yPosition,
                        size: fontSizeText,
                        font: helvetica,
                        color: grayColor,
                    })
                    yPosition -= 15
                })
            })
        }
    }

    const buffer = Buffer.from(await pdfDoc.save())
    return buffer
}

function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
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
