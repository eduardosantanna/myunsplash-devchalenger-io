import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDeleteImageProps } from './types'
import { schemaFormDeleteImage } from './schema'
import { useMutation } from '@tanstack/react-query'
import { ImageService } from '@/services/api/ImageService/ImageService'

interface IUseRemoveImageForm {
  onDelete: () => void
}

export const useRemoveImageForm = ({ onDelete }: IUseRemoveImageForm) => {
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

  const { mutate } = useMutation(ImageService.deleteImage)

  const handleSubmitForm = (
    { passwordImage }: FormDeleteImageProps,
    imageIdForDelete: string
  ) => {
    mutate({ _id: imageIdForDelete, passwordImage })
    onDelete()
  }

  return { register, handleSubmit, reset, handleSubmitForm, errors }
}
