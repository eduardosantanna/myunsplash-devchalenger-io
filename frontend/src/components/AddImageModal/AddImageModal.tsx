import {
  Button,
  FormControl,
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

interface IAddImageModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel: () => void
  onSubmit: () => void
}

const AddImageModal: React.FC<IAddImageModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Add a new photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={2}>
          <FormControl>
            <FormLabel>Label</FormLabel>
            <Input />
          </FormControl>

          <FormControl>
            <FormLabel>Photo URL</FormLabel>
            <Input />
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onCancel} variant="ghost" colorScheme="red">
            Cancel
          </Button>
          <Button onClick={onSubmit} colorScheme="green">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AddImageModal }
