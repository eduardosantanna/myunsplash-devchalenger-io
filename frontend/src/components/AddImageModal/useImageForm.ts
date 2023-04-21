import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { schemaForm } from './schema'
import { FormProps, IUseImageFormProps } from './types'

export const useImageForm = ({ onSubmit }: IUseImageFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      imageUrl: '',
      label: '',
    },
  })

  const handleFormSubmit = (data: FormProps) => {
    onSubmit?.()
    reset()
  }

  return { errors, register, handleSubmit, handleFormSubmit }
}
