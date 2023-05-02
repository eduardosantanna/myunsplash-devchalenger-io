import { z } from 'zod'

import { schemaFormDeleteImage } from './schema'
import { AxiosError } from 'axios'

export type FormDeleteImageProps = z.infer<typeof schemaFormDeleteImage>

export type TErrorResponse = AxiosError & {
  response: {
    data: {
      message: string[]
    }
  }
}

export interface IRemoveImageModalProps {
  isOpen: boolean
  idImageForDelete: string
  onClose: () => void
  onDelete: () => void
}
