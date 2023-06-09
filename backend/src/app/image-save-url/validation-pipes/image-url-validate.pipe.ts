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
    const { data, headers } = await axios.get(imageContent.imageUrl, {
      responseType: 'arraybuffer',
    })
    const mimeType = headers['content-type'] as string
    const imageSize = +data.byteLength / 1000

    if (!mimeType.match(/image\/(png|jpeg)$/)) {
      throw new HttpException(
        {
          message: ['Entered URL is not a PNG or JPEG type image.'],
        },
        HttpStatus.BAD_REQUEST
      )
    }

    if (imageSize > 2548) {
      throw new HttpException(
        {
          message: ['Your image must be a maximum of 2Mb.'],
        },
        HttpStatus.BAD_REQUEST
      )
    }

    imageContent.imageBuffer = data
    imageContent.imageContentType = mimeType

    return imageContent
  }
}
