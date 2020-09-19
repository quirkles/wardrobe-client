import AWS from 'aws-sdk'
import { ManagedUpload } from 'aws-sdk/clients/s3'
import { v4 as uuidv4 } from 'uuid'

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
  console.log('here') //eslint-disable-line
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: uuidv4(),
      Body: file,
      ACL: 'public-read',
    },
  })
  return upload.promise()
}
