import { Injectable } from '@nestjs/common'

@Injectable()
export class ImageService {
  saveUrlImage() {
    return { message: 'Oi' }
  }

  getUrlsImage() {
    return { message: 'Oi' }
  }
}
