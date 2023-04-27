import { IImage } from '@/services/api/ImageService/types'
import { Box, Button, Image, Text } from '@chakra-ui/react'

interface ICardImageProps {
  onClickDeleteButton: () => void
  imageData: IImage
}

const CardImage: React.FC<ICardImageProps> = ({
  onClickDeleteButton,
  imageData,
}) => {
  return (
    <Box
      key={Math.random()}
      marginBottom={46}
      borderRadius={16}
      overflow="hidden"
      position="relative"
      role="group"
      _hover={{
        transform: 'scale(1.05)',
        transition: '200ms ease-in-out',
      }}
    >
      <Image
        width="100%"
        alt="Image"
        src={imageData.imageUrl}
        cursor="pointer"
        _groupHover={{
          filter: 'brightness(80%)',
          transition: '200ms ease-in-out',
        }}
      />
      <Text
        display="none"
        position="absolute"
        fontSize={18}
        fontWeight={700}
        color="#FFF"
        bottom={5}
        left={5}
        _groupHover={{
          display: 'inline-block',
        }}
      >
        {imageData.label}
      </Text>
      <Button
        display="none"
        position="absolute"
        variant="outline"
        colorScheme="red"
        size="xs"
        top={5}
        right={5}
        _groupHover={{
          display: 'inline-flex',
        }}
        onClick={onClickDeleteButton}
      >
        delete
      </Button>
    </Box>
  )
}

export { CardImage }
