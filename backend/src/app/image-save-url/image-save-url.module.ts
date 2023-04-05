import { Module } from '@nestjs/common'
import { ImageController } from './image-save-url.controller'
import { ImageService } from './image-save-url.service'
import { ImageUrlValidatePipe } from './validation-pipes/image-url-validate.pipe'

@Module({
  controllers: [ImageController],
  providers: [ImageService, ImageUrlValidatePipe],
})
export class ImageModule {}
