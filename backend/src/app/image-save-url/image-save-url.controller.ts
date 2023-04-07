import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ImageService } from './image-save-url.service'
import { ImageUrlValidatePipe } from './validation-pipes/image-url-validate.pipe'
import { CreateImageDto } from './dto/create-image.dto'
import { DeleteImageDto } from './dto/delete-image.dto'
import { IsMongoId } from 'class-validator'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async index() {
    return await this.imageService.getUrlsImage()
  }

  @Post()
  @UsePipes(ImageUrlValidatePipe)
  async create(@Body() imageData: CreateImageDto) {
    return await this.imageService.saveUrlImage(imageData)
  }

  @Delete(':id/:passwordImage')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: DeleteImageDto) {
    return this.imageService.deleteImage(params.id, params.passwordImage)
  }
}
