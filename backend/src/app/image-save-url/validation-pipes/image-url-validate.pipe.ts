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
  async transform(imageContent: CreateImageDto) {
    try {
      const { data, headers } = await axios.get(imageContent.imageUrl, {
        responseType: 'arraybuffer',
      })
      const mimeType = headers['content-type'] as string

      if (!mimeType.match(/image\/(png|jpeg)$/)) {
        throw new HttpException(
          'Entered URL is not a PNG or JPEG type image.',
          HttpStatus.BAD_REQUEST
        )
      }

      imageContent.imageBuffer = data
      imageContent.imageContentType = mimeType

      return imageContent
    } catch (error) {
      console.log(error)
      throw new HttpException(
        { message: ['Entered URL is not a PNG or JPEG type image.'] },
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
