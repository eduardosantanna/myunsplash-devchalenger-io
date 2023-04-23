import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDeleteImageProps } from './types'
import { schemaFormDeleteImage } from './schema'

export const useRemoveImageForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDeleteImageProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaFormDeleteImage),
    defaultValues: {
      passwordImage: '',
    },
  })

  const handleSubmitForm = (data: FormDeleteImageProps) => {
    console.log(data)
  }

  return { register, handleSubmit, reset, handleSubmitForm, errors }
}
