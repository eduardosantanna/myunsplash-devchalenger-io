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
import { SearchIcon } from '@chakra-ui/icons'

import { useDebounce } from '@/hooks/useDebounce'
import logoDevChallenger from '../../../public/images/my_unsplash_logo.svg'
import { IHeaderProps } from './types'

const Header: React.FC<IHeaderProps> = ({
  onChangeInputSearch,
  onClickButtonAddAPhoto,
}) => {
  const [isMinThan600] = useMediaQuery('(max-width: 600px)')
  const { debounce } = useDebounce(1000)

  return (
    <Box as="header" paddingTop="32px" marginBottom={76}>
      <Flex flexWrap={isMinThan600 ? 'wrap' : 'nowrap'} gap="10px">
        <Image
          priority
          src={logoDevChallenger}
          width={138}
          height={26}
          alt="Logo"
        />
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
