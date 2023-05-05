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
  BadGatewayException,
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
    try {
      return await this.imageService.getUrlsImage(paginationParams)
    } catch (error) {
      throw new BadGatewayException(['Internal error when fetching images.'])
    }
  }

  @Post()
  @UsePipes(ImageUrlValidatePipe)
  async create(@Body() imageData: CreateImageDto) {
    try {
      return await this.imageService.saveUrlImage(imageData)
    } catch (error) {
      throw new BadGatewayException(['Error saving image.'])
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Body() { id, passwordImage }: DeleteImageDto) {
    try {
      return this.imageService.deleteImage(id, passwordImage)
    } catch (error) {
      throw new BadGatewayException(['Error deleting image.'])
    }
  }
}
