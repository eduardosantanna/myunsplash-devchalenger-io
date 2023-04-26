import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDeleteImageProps } from './types'
import { schemaFormDeleteImage } from './schema'
import { useMutation } from '@tanstack/react-query'
import { ImageService } from '@/services/api/ImageService/ImageService'
import { useToast, ToastId } from '@chakra-ui/react'
import { useRef } from 'react'

interface IUseRemoveImageForm {
  onDelete: () => void
}

export const useRemoveImageForm = ({ onDelete }: IUseRemoveImageForm) => {
  const toast = useToast()
  const toastIdRef = useRef<ToastId>()

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

  const { mutate } = useMutation(ImageService.deleteImage, {
    onSuccess: () => {
      toast.update(toastIdRef.current!, {
        description: 'Deleted image.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
    },
    onError: () => {
      toast.update(toastIdRef.current!, {
        description: 'Error deleting image.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
    },
  })

  const handleSubmitForm = (
    { passwordImage }: FormDeleteImageProps,
    imageIdForDelete: string
  ) => {
    toastIdRef.current = toast({
      description: 'Processing...',
      status: 'loading',
      position: 'top-right',
      duration: null,
    })

    mutate({ _id: imageIdForDelete, passwordImage })
    reset()
    onDelete()
  }

  return { register, handleSubmit, reset, handleSubmitForm, errors }
}
