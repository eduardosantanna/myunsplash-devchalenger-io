import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { SearchIcon } from '@chakra-ui/icons'

import { IHeaderProps } from './types'
import { useDebounce } from '@/hooks/useDebounce'
import logoDevChallenger from '../../../public/images/my_unsplash_logo.svg'

const Header: React.FC<IHeaderProps> = ({
  onChangeInputSearch,
  onClickButtonAddAPhoto,
}) => {
  const [isMinThan600] = useMediaQuery('(max-width: 600px)')
  const { debounce } = useDebounce(1000)

  return (
    <Box as="header" paddingTop="32px" marginBottom={76}>
      <Flex flexWrap={isMinThan600 ? 'wrap' : 'nowrap'} gap="10px">
        <NextLink
          href="/"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            priority
            src={logoDevChallenger}
            width={142}
            height={30}
            alt="Logo"
          />
        </NextLink>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {<SearchIcon />}
          </InputLeftElement>
          <Input
            maxW={isMinThan600 ? 'full' : '300px'}
            placeholder="Search by name"
            borderColor="#BDBDBD"
            onChange={(event) =>
              debounce(() => onChangeInputSearch(event.target.value))
            }
          />
        </InputGroup>

        <Button
          onClick={onClickButtonAddAPhoto}
          colorScheme="green"
          minW={isMinThan600 ? 'full' : ''}
        >
          Add a photo
        </Button>
      </Flex>
    </Box>
  )
}

export { Header }
