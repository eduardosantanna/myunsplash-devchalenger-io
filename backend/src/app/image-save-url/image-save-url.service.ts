import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Image } from './schemas/image.schema'
import { CreateImageDto } from './dto/create-image.dto'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async saveUrlImage(imageData: CreateImageDto) {
    const createdImage = await new this.imageModel(imageData).save()
    return { id: createdImage.id }
  }

  async getUrlsImage() {
    return await this.imageModel.find().exec()
  }
}
