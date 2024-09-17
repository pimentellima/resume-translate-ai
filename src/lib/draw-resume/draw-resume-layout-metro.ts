import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib'
import { Resume } from '../generate-resume-object'
import wrapText from '../wrap-text'
import fontkit from '@pdf-lib/fontkit'
import { promises, readFile } from 'fs'

export async function drawResumeLayoutMetro(
    resume: Resume
): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)
    const poppinsLightBytes = await promises.readFile(
        process.cwd() + '/public/fonts/Poppins/Poppins-Light.ttf'
    )
    const poppinsMediumBytes = await promises.readFile(
        process.cwd() + '/public/fonts/Poppins/Poppins-Medium.ttf'
    )
    const poppinsLight = await pdfDoc.embedFont(poppinsLightBytes)
    const poppinsMedium = await pdfDoc.embedFont(poppinsMediumBytes)
    let page = pdfDoc.addPage([600, 850])

    const secondaryColor = rgb(0, 0, 0)
    const primaryColor = rgb(0.25, 0.25, 0.25)

    const fontSizeLg = 32
    const fontSizeMd = 15
    const fontSizeSm = 10

    let yPosition = 780
    const marginLeft = 33

    const decreaseY = (offset: number) => {
        if (yPosition - offset <= 0) {
            page = pdfDoc.addPage([600, 850])
            yPosition = 780
        } else {
            yPosition -= offset
        }
    }

    // Title: Name and Job Title
    page.drawText(`${resume.name.toUpperCase()}`, {
        x: marginLeft,
        y: yPosition,
        size: fontSizeLg,
        font: poppinsMedium,
        color: primaryColor,
    })

    if (resume.jobTitle) {
        decreaseY(40)
        page.drawText(`${resume.jobTitle}`, {
            x: marginLeft,
            y: yPosition,
            size: fontSizeMd,
            font: poppinsMedium,
            color: secondaryColor,
        })
    }

    decreaseY(20)
    page.drawRectangle({
        color: primaryColor,
        x: marginLeft,
        y: yPosition,
        height: 4,
        width: 600 - marginLeft * 2,
    })

    const contacts: string[] = []
    if (resume.contact?.email) contacts.push(`${resume.contact.email}`)
    if (resume.contact?.phoneNumber)
        contacts.push(`${resume.contact.phoneNumber}`)
    if (resume.contact?.linkedin) contacts.push(`${resume.contact.linkedin}`)

    if (contacts.length > 0) {
        decreaseY(20)
        page.drawText(contacts.join('/ '), {
            x: marginLeft,
            y: yPosition,
            size: fontSizeSm,
            font: poppinsLight,
            color: primaryColor,
        })
    }

    if (resume.summarySection) {
        decreaseY(40)
        page.drawText(resume.summarySection.sectionTitle.toUpperCase(), {
            x: marginLeft,
            y: yPosition,
            size: fontSizeMd,
            font: poppinsMedium,
            color: secondaryColor,
        })
        decreaseY(20)
        const summaryText = wrapText(
            resume.summarySection.text,
            500,
            fontSizeSm
        )
        summaryText.forEach((line) => {
            page.drawText(line, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeSm,
                font: poppinsLight,
                color: secondaryColor,
            })
            decreaseY(15)
            if (yPosition <= 0) {
                page = pdfDoc.addPage([600, 850])
                yPosition = 780
            }
        })
    }

    decreaseY(20)
    if (yPosition <= 0) {
        page = pdfDoc.addPage([600, 850])
        yPosition = 780
    }

    page.drawText(resume.experienceSection.sectionTitle.toUpperCase(), {
        x: marginLeft,
        y: yPosition,
        size: fontSizeMd,
        font: poppinsMedium,
        color: secondaryColor,
    })

    resume.experienceSection.experiences.forEach((exp) => {
        decreaseY(20)
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
                size: fontSizeSm,
                font: poppinsMedium,
                color: secondaryColor,
            }
        )

        if (exp.date) {
            decreaseY(15)
            page.drawText(exp.date, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeSm,
                font: poppinsLight,
                color: secondaryColor,
            })
        }

        decreaseY(20)
        exp.contributions?.forEach((contribution) => {
            const wrappedContributions = wrapText(contribution, 500, fontSizeSm)
            wrappedContributions.forEach((line, index) => {
                page.drawText(index === 0 ? `• ${line}` : line, {
                    x: marginLeft + 5,
                    y: yPosition,
                    size: fontSizeSm,
                    font: poppinsLight,
                    color: secondaryColor,
                })
                decreaseY(15)
            })
        })
    })

    if (resume.projectsSection) {
        decreaseY(20)
        page.drawText(resume.projectsSection.sectionTitle.toUpperCase(), {
            x: marginLeft,
            y: yPosition,
            size: fontSizeMd,
            font: poppinsMedium,
            color: secondaryColor,
        })

        resume.projectsSection.projects.forEach((project) => {
            decreaseY(20)
            page.drawText(project.title, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeSm,
                font: poppinsMedium,
                color: secondaryColor,
            })

            if (project.date) {
                decreaseY(15)
                page.drawText(project.date, {
                    x: marginLeft,
                    y: yPosition,
                    size: fontSizeSm,
                    font: poppinsLight,
                    color: secondaryColor,
                })
            }

            decreaseY(20)
            project.contributions.forEach((contribution) => {
                const wrappedContributions = wrapText(
                    contribution,
                    500,
                    fontSizeSm
                )
                wrappedContributions.forEach((line, index) => {
                    page.drawText(index === 0 ? `• ${line}` : line, {
                        x: marginLeft + 5,
                        y: yPosition,
                        size: fontSizeSm,
                        font: poppinsLight,
                        color: secondaryColor,
                    })
                    decreaseY(15)
                })
            })
        })
    }

    if (resume.educationSection) {
        decreaseY(20)
        page.drawText(resume.educationSection.sectionTitle.toUpperCase(), {
            x: marginLeft,
            y: yPosition,
            size: fontSizeMd,
            font: poppinsMedium,
            color: secondaryColor,
        })
        decreaseY(20)
        page.drawText(
            `${resume.educationSection.universityName} ${
                resume.educationSection.title
                    ? `- ${resume.educationSection.title}`
                    : ''
            }`,
            {
                x: marginLeft,
                y: yPosition,
                size: fontSizeSm,
                font: poppinsMedium,
                color: secondaryColor,
            }
        )

        if (resume.educationSection.date) {
            decreaseY(15)
            page.drawText(resume.educationSection.date, {
                x: marginLeft,
                y: yPosition,
                size: fontSizeSm,
                font: poppinsLight,
                color: secondaryColor,
            })
        }

        decreaseY(20)
        if (resume.educationSection.contributions) {
            resume.educationSection.contributions.forEach((contribution) => {
                const wrappedContributions = wrapText(
                    contribution,
                    500,
                    fontSizeSm
                )
                wrappedContributions.forEach((line) => {
                    page.drawText(`• ${line}`, {
                        x: marginLeft + 5,
                        y: yPosition,
                        size: fontSizeSm,
                        font: poppinsLight,
                        color: secondaryColor,
                    })
                    decreaseY(15)
                })
            })
        }
    }

    if (resume.skillsSection) {
        decreaseY(20)
        page.drawText(resume.skillsSection.sectionTitle.toUpperCase(), {
            x: marginLeft,
            y: yPosition,
            size: fontSizeMd,
            font: poppinsMedium,
            color: secondaryColor,
        })
        decreaseY(20)
        resume.skillsSection.skills.forEach((skill, index) => {
            page.drawText(skill, {
                x: index % 2 === 0 ? marginLeft : marginLeft + 300,
                y: yPosition,
                size: fontSizeSm,
                font: poppinsLight,
                color: secondaryColor,
            })
            if (index % 2 !== 0) decreaseY(18)
        })
    }

    const buffer = Buffer.from(await pdfDoc.save())
    return buffer
}
