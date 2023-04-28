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

import { IRemoveImageModalProps } from './types'
import { useRemoveImageForm } from './useRemoveImageForm'

const RemoveImageModal: React.FC<IRemoveImageModalProps> = ({
  isOpen,
  onClose,
  idImageForDelete,
}) => {
  const { register, handleSubmit, handleSubmitForm, reset, errors } =
    useRemoveImageForm({ onDelete: onClose })

  const onCloseModal = () => {
    onClose()
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl isInvalid={!!errors.passwordImage}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register('passwordImage')} />
              <FormErrorMessage>
                {errors.passwordImage?.message}
              </FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button colorScheme="gray" variant="ghost" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={handleSubmit((data) =>
              handleSubmitForm(data, idImageForDelete)
            )}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { RemoveImageModal }
