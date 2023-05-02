import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useToast, ToastId } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormDeleteImageProps, TErrorResponse } from './types'
import { schemaFormDeleteImage } from './schema'
import { useImagesStore } from '@/store/useImagesStore'
import { ImageService } from '@/services/api/ImageService/ImageService'

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

  const {
    actions: { removeImage },
  } = useImagesStore()

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
    onError: (error: TErrorResponse) => {
      const errorMessages = error.response.data.message
      const renderMessages = errorMessages.map((message) => (
        <React.Fragment key={Math.random()}>
          {message}
          <br />
        </React.Fragment>
      ))

      toast.update(toastIdRef.current!, {
        description: renderMessages,
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

    mutate(
      { _id: imageIdForDelete, passwordImage },
      {
        onSuccess: () => {
          removeImage(imageIdForDelete)
        },
      }
    )

    reset()
    onDelete()
  }

  return { register, handleSubmit, reset, handleSubmitForm, errors }
}
