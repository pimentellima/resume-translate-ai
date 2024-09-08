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
