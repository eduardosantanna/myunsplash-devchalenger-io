import { Module } from '@nestjs/common'
import { ImageController } from './image-save-url.controller'
import { ImageService } from './image-save-url.service'

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
