import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { ImageService } from './image-save-url.service'
import { ImageUrlValidatePipe } from './validation-pipes/image-url-validate.pipe'
import { CreateImageDto } from './dto/create-image.dto'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getUrlsImage() {
    return this.imageService.getUrlsImage()
  }

  @Post()
  @UsePipes(ImageUrlValidatePipe)
  saveUrlImage(@Body() imageData: CreateImageDto) {
    return this.imageService.saveUrlImage(imageData)
  }
}
