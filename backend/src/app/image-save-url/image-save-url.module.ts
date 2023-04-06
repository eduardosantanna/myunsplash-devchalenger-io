import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ImageController } from './image-save-url.controller'
import { ImageService } from './image-save-url.service'
import { ImageUrlValidatePipe } from './validation-pipes/image-url-validate.pipe'
import { Image, ImageSchema } from './schemas/image.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageUrlValidatePipe],
})
export class ImageModule {}
