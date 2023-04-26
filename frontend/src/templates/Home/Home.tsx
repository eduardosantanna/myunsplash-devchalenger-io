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
  useDisclosure,
  Center,
  Progress,
} from '@chakra-ui/react'
import * as NextImage from 'next/image'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import logoDevChallenger from '../../../public/images/my_unsplash_logo.svg'
import { ImageService } from '@/services/api/ImageService/ImageService'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AddImageModal } from '@/components/AddImageModal/AddImageModal'
import { RemoveImageModal } from '@/components/RemoveImageModal/RemoveImageModal'
import { useDebounce } from '../../hooks/useDebounce'
import { IImage } from '@/services/api/ImageService/types'

export const Home: React.FC = () => {
  const [isMinThan600] = useMediaQuery('(max-width: 600px)')
  const [isOpen, setIsOpen] = useState(false)
  const {
    isOpen: isOpenDeleteImageModal,
    onOpen: onOpenDeleteImageModal,
    onClose: onCloseDeleteImageModal,
  } = useDisclosure()
  const [imageIdForDelete, setImageIdForDelete] = useState('')

  const [searchImage, setSearchImage] = useState('')

  const { debounce } = useDebounce(1000)

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['images', searchImage],
      queryFn: ({ pageParam = 1 }) =>
        ImageService.getImages({ pageParam, like: searchImage }),
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length < lastPage.totalPages
          ? allPages.length + 1
          : undefined
      },
    })

  const imagesUrls = useMemo(() => {
    const images = data?.pages.map((page) => page.imagesUrls)
    return images?.reduce((acc, data) => [...acc, ...data], [])
  }, [data])

  return (
    <Container maxW="1243px">
      <AddImageModal
        isOpen={isOpen}
        onSubmit={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      />

      <RemoveImageModal
        idImageForDelete={imageIdForDelete}
        isOpen={isOpenDeleteImageModal}
        onClose={onCloseDeleteImageModal}
        onDelete={onCloseDeleteImageModal}
      />

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
              onChange={(event) =>
                debounce(() => setSearchImage(event.target.value))
              }
            />
          </InputGroup>

          <Button
            onClick={() => setIsOpen(true)}
            colorScheme="green"
            minW={isMinThan600 ? 'full' : ''}
          >
            Add a photo
          </Button>
        </Flex>
      </Box>

      {isLoading && <Progress size="xs" isIndeterminate colorScheme="green" />}
      {imagesUrls?.length === 0 && (
        <Center>
          <Text fontSize="2xl" fontWeight="semibold">
            No image found
          </Text>
        </Center>
      )}

      <Box
        marginBottom={0}
        style={{
          columnCount: isMinThan600 ? 1 : 3,
          columnWidth: isMinThan600 ? '100%' : '33%',
          columnGap: isMinThan600 ? 0 : 46,
        }}
      >
        {imagesUrls?.map((imageData) => (
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
              onClick={() => (
                onOpenDeleteImageModal(), setImageIdForDelete(imageData._id)
              )}
            >
              delete
            </Button>
          </Box>
        ))}
      </Box>
      {!!imagesUrls?.length && (
        <Center paddingY={10}>
          <Button
            isLoading={isFetchingNextPage}
            isDisabled={!hasNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        </Center>
      )}
    </Container>
  )
}
