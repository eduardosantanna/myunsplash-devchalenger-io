import { IImage } from '@/services/api/ImageService/types'

export interface ICardImageProps {
  onClickDeleteButton: () => void
  imageData: IImage
}
