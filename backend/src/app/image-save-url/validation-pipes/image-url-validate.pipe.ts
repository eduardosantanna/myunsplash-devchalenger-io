import axios from 'axios'
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { CreateImageDto } from '../dto/create-image.dto'

@Injectable()
export class ImageUrlValidatePipe implements PipeTransform {
  async transform(imageRequestData: CreateImageDto) {
    try {
      const imageResponse = await axios.get(imageRequestData.imageUrl)
      const mimeType = imageResponse.headers['content-type'] as string

      if (!mimeType.match(/image\/(png|jpeg)$/)) {
        throw new HttpException(
          'Entered URL is not a PNG or JPEG type image.',
          HttpStatus.BAD_REQUEST
        )
      }

      return imageRequestData
    } catch (error) {
      throw new HttpException(
        'Entered URL is not a PNG or JPEG type image.',
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
