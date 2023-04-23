import { z } from 'zod'
import { schemaFormDeleteImage } from './schema'

export type FormDeleteImageProps = z.infer<typeof schemaFormDeleteImage>

export interface IRemoveImageModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}
