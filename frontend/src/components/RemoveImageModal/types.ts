import { z } from 'zod'

import { schemaFormDeleteImage } from './schema'

export type FormDeleteImageProps = z.infer<typeof schemaFormDeleteImage>

export interface IRemoveImageModalProps {
  isOpen: boolean
  idImageForDelete: string
  onClose: () => void
  onDelete: () => void
}
