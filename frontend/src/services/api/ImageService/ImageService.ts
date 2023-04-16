import { Api } from '../config'
import { IImage } from './types'

export class ImageService {
  static async getImages(): Promise<IImage[]> {
    const { data } = await Api.get('/image')
    return data
  }
}
