import { Model, Types } from 'mongoose'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compare } from 'bcrypt'

import { Image } from './schemas/image.schema'
import { CreateImageDto } from './dto/create-image.dto'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async getUrlsImage() {
    return await this.imageModel.find().exec()
  }

  async saveUrlImage(imageData: CreateImageDto) {
    const createdImage = await new this.imageModel(imageData).save()
    return { id: createdImage.id }
  }

  async deleteImage(id: string, passwordImage: string) {
    const imageForDelete = await this.imageModel.findById(id)
    if (!imageForDelete) throw new NotFoundException()
    const verifyPasswordImage = await compare(
      passwordImage,
      imageForDelete.passwordImage
    )
    if (!verifyPasswordImage) throw new BadRequestException()
    await imageForDelete.deleteOne()
  }
}
