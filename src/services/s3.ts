import s3 from '@/lib/aws-s3'

export async function getS3FileByKey(key: string) {
    const file = await s3.getObject({
        Key: key,
        Bucket: process.env.S3_BUCKET_NAME,
    })
    return file.Body?.transformToString()
}
