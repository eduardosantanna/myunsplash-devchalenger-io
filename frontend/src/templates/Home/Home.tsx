import Image from 'next/image'
import logoDevChallenger from '../../../public/images/my_unsplash_logo.svg'
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
} from '@chakra-ui/react'

export const Home: React.FC = () => {
  const [isMinThan600] = useMediaQuery('(max-width: 600px)')

  return (
    <Container maxW="1243px">
      {/* Header Component */}
      <Box as="header" paddingTop="32px">
        <Flex flexWrap={isMinThan600 ? 'wrap' : 'nowrap'} gap="10px">
          <Image priority src={logoDevChallenger} alt="Logo" />
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
    </Container>
  )
}
