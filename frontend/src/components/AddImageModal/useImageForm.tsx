import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ToastId, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { schemaForm } from './schema'
import { FormProps, IUseImageFormProps, TErrorResponse } from './types'
import { ImageService } from '@/services/api/ImageService/ImageService'
import { AxiosError } from 'axios'

export const useImageForm = ({ onSubmit }: IUseImageFormProps) => {
  const toast = useToast()
  const toastIdRef = useRef<ToastId>()
  const queryClient = useQueryClient()

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

  const { mutate } = useMutation({
    mutationKey: ['send-image'],
    mutationFn: ImageService.createImage,
    onSuccess: () => {
      toast.update(toastIdRef.current!, {
        title: 'Image sent.',
        description: 'Your image has been successfully uploaded to the server',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })

      queryClient.invalidateQueries({ queryKey: ['images'] })
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
        title: 'Error',
        description: renderMessages,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
    },
  })

  const handleFormSubmit = (data: FormProps) => {
    toastIdRef.current = toast({
      description: 'Processing submission...',
      status: 'loading',
      position: 'top-right',
      duration: null,
    })
    mutate(data)
    onSubmit?.()
    reset()
  }

  return { errors, register, handleSubmit, handleFormSubmit, reset }
}
