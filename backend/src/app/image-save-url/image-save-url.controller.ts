import { Controller, Get, Post } from '@nestjs/common'
import { ImageService } from './image-save-url.service'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getUrlsImage() {
    return this.imageService.getUrlsImage()
  }

  @Post()
  saveUrlImage() {
    return this.imageService.saveUrlImage()
  }
}
