import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

export class AttachmentUtils
 {
    constructor(
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly urlExpiration = 3000,
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET
    ) {}

    async getAttachmentUrl(todoId: string): Promise<string>{
        return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
    }

    async getUploadUrl(todoId: string): Promise<string> {

        const params = {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: this.urlExpiration
        }
        const url = this.s3.getSignedUrl('putObject', params)

        return url
    }
}