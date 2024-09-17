import s3 from '@/lib/aws-s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function getSignedUrlFromS3Key(key: string) {
    const getObjectParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    }

    const command = new GetObjectCommand(getObjectParams)

    return await getSignedUrl(s3, command, { expiresIn: 3600 })
}

export async function getFileFromS3(key: string) {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        }
        const data = await s3.getObject(params)

        const fileBytes = await data.Body?.transformToByteArray()
        if (!fileBytes)
            throw new Error('Error getting object from S3: No file bytes found')
        return Buffer.from(fileBytes)
    } catch (error) {
        console.error('Error getting object from S3:', error)
        throw error
    }
}
