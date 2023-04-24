import { Model } from 'mongoose'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compare } from 'bcrypt'

import { Image } from './schemas/image.schema'
import { CreateImageDto } from './dto/create-image.dto'
import { PaginationQueryDto } from './dto/pagination-query.dto'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async getUrlsImage({ limit = 9, page = 1, like = '' }: PaginationQueryDto) {
    const [count, imagesUrls] = await Promise.all([
      this.imageModel.countDocuments(),
      this.imageModel
        .find({ label: new RegExp(like, 'i') }, { passwordImage: false })
        .skip((page - 1) * limit)
        .limit(limit),
    ])

    return { totalPages: Math.ceil(count / limit), imagesUrls }
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
