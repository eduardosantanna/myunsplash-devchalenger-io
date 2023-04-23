import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { schemaForm } from './schema'
import { FormProps, IUseImageFormProps } from './types'
import { ImageService } from '@/services/api/ImageService/ImageService'

export const useImageForm = ({ onSubmit }: IUseImageFormProps) => {
  const toast = useToast()

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
      passwordImage: '',
    },
  })

  const { mutate } = useMutation(ImageService.createImage, {
    onSuccess: () => {
      toast({
        title: 'Image sent.',
        description: 'Your image has been successfully uploaded to the server',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to upload your image to the server',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
    },
  })

  const handleFormSubmit = (data: FormProps) => {
    mutate(data)
    onSubmit?.()
    reset()
  }

  return { errors, register, handleSubmit, handleFormSubmit, reset }
}
