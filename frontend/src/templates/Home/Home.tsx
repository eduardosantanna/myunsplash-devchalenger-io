import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
  Image,
  Text,
} from '@chakra-ui/react'
import * as NextImage from 'next/image'

import logoDevChallenger from '../../../public/images/my_unsplash_logo.svg'

const imagesUrls = [
  'https://images.unsplash.com/photo-1680724864797-d5559c80e6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1681148790059-a714eb72dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1661536373688-46a59b8669b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
  'https://plus.unsplash.com/premium_photo-1670333351949-47f735fa9ba4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1681488366683-2d3f96e7651a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
]

export const Home: React.FC = () => {
  const [isMinThan600] = useMediaQuery('(max-width: 600px)')

  return (
    <Container maxW="1243px">
      {/* Header Component */}
      <Box as="header" paddingTop="32px" marginBottom={76}>
        <Flex flexWrap={isMinThan600 ? 'wrap' : 'nowrap'} gap="10px">
          <NextImage.default src={logoDevChallenger} alt="Logo" />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              {<SearchIcon />}
            </InputLeftElement>
            <Input
              maxW={isMinThan600 ? 'full' : '300px'}
              placeholder="Search by name"
              borderColor="#BDBDBD"
            />
          </InputGroup>

          <Button colorScheme="green" minW={isMinThan600 ? 'full' : ''}>
            Add a photo
          </Button>
        </Flex>
      </Box>

      <Box
        marginBottom={76}
        style={{
          columnCount: isMinThan600 ? 1 : 3,
          columnWidth: isMinThan600 ? '100%' : '33%',
          columnGap: isMinThan600 ? 0 : 46,
        }}
      >
        {imagesUrls.map((imageUrl) => (
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
              src={imageUrl}
              cursor="pointer"
              _groupHover={{
                filter: 'brightness(80%)',
                transition: '200ms ease-in-out',
              }}
            />
            <Text
              position="absolute"
              fontSize={18}
              fontWeight={700}
              color="#FFF"
              bottom={5}
              left={5}
            >
              Olá
            </Text>
            <Button
              position="absolute"
              variant="outline"
              colorScheme="red"
              size="xs"
              top={5}
              right={5}
            >
              delete
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  )
}
