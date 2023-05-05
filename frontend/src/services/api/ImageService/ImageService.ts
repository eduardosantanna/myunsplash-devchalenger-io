import { Api } from '../config'
import { IImage, IReponseImageApi } from './types'

export class ImageService {
  static async getImages({ pageParam = 1, like = '' }) {
    const { data } = await Api.get<IReponseImageApi>(
      `/image?limit=9&page=${pageParam}&like=${like}`
    )
    return data
  }

  static async createImage(imageData: Omit<IImage, '_id'>) {
    const { data } = await Api.post<{ id: string }>('/image', imageData)
    return data
  }

  static async deleteImage({
    _id,
    passwordImage,
  }: Pick<IImage, '_id' | 'passwordImage'>) {
    await Api.delete(`/image`, {
      data: { id: _id, passwordImage },
    })
  }
}
