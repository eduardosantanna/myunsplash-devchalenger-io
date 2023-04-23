import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { IAddImageModalProps } from './types'
import { useImageForm } from './useImageForm'

const AddImageModal: React.FC<IAddImageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { errors, register, handleSubmit, handleFormSubmit, reset } =
    useImageForm({
      onSubmit,
    })

  const onCloseModal = () => {
    onClose()
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Add a new photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={2}>
          <form>
            <FormControl isInvalid={!!errors.label}>
              <FormLabel>Label</FormLabel>
              <Input {...register('label')} />
              <FormErrorMessage>{errors.label?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.imageUrl}>
              <FormLabel>Photo URL</FormLabel>
              <Input {...register('imageUrl')} />
              <FormErrorMessage>{errors.imageUrl?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.passwordImage}>
              <FormLabel>Password Image</FormLabel>
              <Input type="password" {...register('passwordImage')} />
              <FormErrorMessage>
                {errors.passwordImage?.message}
              </FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onCloseModal} variant="ghost" colorScheme="red">
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} colorScheme="green">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AddImageModal }
