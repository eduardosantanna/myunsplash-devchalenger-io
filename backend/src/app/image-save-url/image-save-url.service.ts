import { Model } from 'mongoose'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compare } from 'bcrypt'
import { storage } from 'firebase-admin'
import { randomUUID } from 'crypto'

import { Image } from './schemas/image.schema'
import { CreateImageDto } from './dto/create-image.dto'
import { PaginationQueryDto } from './dto/pagination-query.dto'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async getUrlsImage({ limit = 9, page = 1, like = '' }: PaginationQueryDto) {
    const countDocumentsPromise =
      like === ''
        ? this.imageModel.countDocuments()
        : this.imageModel.countDocuments({ label: like })

    const imageDataPromise = this.imageModel
      .find(
        { label: new RegExp(like, 'i') },
        { passwordImage: false, firebaseName: false }
      )
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const [count, imagesUrls] = await Promise.all([
      countDocumentsPromise,
      imageDataPromise,
    ])

    return { totalPages: Math.ceil(count / limit), imagesUrls }
  }

  async saveUrlImage(imageData: CreateImageDto) {
    const randomNameImage = randomUUID()
    const imageSavedFirebase = storage().bucket().file(randomNameImage)
    imageSavedFirebase.save(imageData.imageBuffer, {
      metadata: { contentType: imageData.imageContentType },
    })

    const createdImage = await new this.imageModel({
      imageUrl: imageSavedFirebase.publicUrl(),
      label: imageData.label,
      passwordImage: imageData.passwordImage,
      firebaseName: randomNameImage,
    }).save()
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
    await storage().bucket().file(imageForDelete.firebaseName).delete()
  }
}
