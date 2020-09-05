import AWS from 'aws-sdk'
import { ManagedUpload } from 'aws-sdk/clients/s3'

const bucketName = process.env.AWS_BUCKET_NAME as string
const bucketRegion = process.env.AWS_BUCKET_REGION
const identityPoolId = process.env.AWS_IDENTITY_POOL_ID as string

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  }),
})

export const doUpload = (file: File): Promise<ManagedUpload.SendData> => {
  const fileName = file.name
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
      ACL: 'public-read',
    },
  })
  return upload.promise()
}
