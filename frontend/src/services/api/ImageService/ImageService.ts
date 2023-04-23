import { Api } from '../config'
import { IImage, TImageDataCreate } from './types'

export class ImageService {
  static async getImages() {
    const { data } = await Api.get<IImage[]>('/image')
    return data.reverse()
  }

  static async createImage(imageData: TImageDataCreate) {
    const { data } = await Api.post<{ id: string }>('/image', imageData)
    return data
  }
}
