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
  Query,
} from '@nestjs/common'
import { ImageService } from './image-save-url.service'
import { ImageUrlValidatePipe } from './validation-pipes/image-url-validate.pipe'
import { CreateImageDto } from './dto/create-image.dto'
import { DeleteImageDto } from './dto/delete-image.dto'
import { PaginationQueryDto } from './dto/pagination-query.dto'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async index(@Query() paginationParams: PaginationQueryDto) {
    return await this.imageService.getUrlsImage(paginationParams)
  }

  @Post()
  @UsePipes(ImageUrlValidatePipe)
  async create(@Body() imageData: CreateImageDto) {
    return await this.imageService.saveUrlImage(imageData)
  }

  @Delete(':id/:passwordImage')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { id, passwordImage }: DeleteImageDto) {
    return this.imageService.deleteImage(id, passwordImage)
  }
}
