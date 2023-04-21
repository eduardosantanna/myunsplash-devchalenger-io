import { z } from 'zod'
import { schemaForm } from './schema'

export type FormProps = z.infer<typeof schemaForm>

export interface IAddImageModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel?: () => void
  onSubmit?: () => void
}

export interface IUseImageFormProps {
  onSubmit?: () => void
}
