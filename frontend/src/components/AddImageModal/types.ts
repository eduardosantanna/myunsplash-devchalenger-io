import { z } from 'zod'

import { schemaForm } from './schema'
import { AxiosError } from 'axios'

export type FormProps = z.infer<typeof schemaForm>

export type TErrorResponse = AxiosError & {
  response: {
    data: {
      message: string[]
    }
  }
}

export interface IAddImageModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
}

export interface IUseImageFormProps {
  onSubmit?: () => void
}
