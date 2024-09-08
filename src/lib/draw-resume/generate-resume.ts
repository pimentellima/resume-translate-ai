import { InferSelectModel } from 'drizzle-orm'
import { Resume } from '../generate-translated-resume-object'
import { resumes } from '@/drizzle/schema'
import { drawResumeLayoutSimple } from './draw-resume-layout-simple'
import { drawResumeLayoutMetro } from './draw-resume-layout-metro'

export default async function generateResume(
    resume: Resume,
    layout: InferSelectModel<typeof resumes>['layout']
) {
    let pdfBytes: Uint8Array = null!
    switch (layout) {
        case 'metro': {
            pdfBytes = await drawResumeLayoutMetro(resume)
            break
        }
        case 'simple': {
            pdfBytes = await drawResumeLayoutSimple(resume)
            break
        }
    }
    return pdfBytes
}
