import Vue from 'vue'

import { ManagedUpload } from 'aws-sdk/clients/s3'
import { CreateGarmentImageInput } from '~/gqlSchemaTypes/globalTypes'
import { GarmentImage } from '~/types/Garment'

export default { title: 'ImageGrid' }

const fakeDoUpload = (file: File): Promise<Partial<ManagedUpload.SendData>> => {
  return Promise.resolve({
    Location: `https://picsum.photos/400/250`,
    Bucket: 'my-bucket',
    Key: file.name,
  })
}

const fakeMutation = (
  input: CreateGarmentImageInput
): Promise<Partial<GarmentImage>> => {
  return Promise.resolve({
    name: input.imageName,
    url: input.imageUrl,
    id: Math.random().toString(36).substring(7),
  })
}

interface DataType {
  fileList: File[]
  images: Partial<GarmentImage>[]
}

export const withImages = () => {
  return Vue.extend({
    data(): DataType {
      return {
        fileList: [],
        images: [],
      }
    },
    methods: {
      async onFileChange(files: File[]): Promise<void> {
        console.log(files) //eslint-disable-line
        const awsResults = await Promise.all(
          files.map((file) => fakeDoUpload(file as File))
        )
        const gqlResults = await Promise.all(
          awsResults.map((awsResult) =>
            fakeMutation({
              imageName: awsResult.Key as string,
              imageUrl: awsResult.Location as string,
            })
          )
        )
        gqlResults.forEach((gqlResult) =>
          this.images.push({
            id: gqlResult.id as string,
            url: gqlResult.url as string,
            name: gqlResult.name as string,
          })
        )
      },
    },
    template: `
      <image-grid
        :images="images"
        @fileChange="onFileChange"
      />`,
  })
}
