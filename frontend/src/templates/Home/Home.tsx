import {
  Box,
  Button,
  Container,
  Image,
  Text,
  useDisclosure,
  Center,
  Progress,
} from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { ImageService } from '@/services/api/ImageService/ImageService'
import { useEffect, useState } from 'react'
import { AddImageModal } from '@/components/AddImageModal/AddImageModal'
import { RemoveImageModal } from '@/components/RemoveImageModal/RemoveImageModal'
import { Header } from '@/components/Header/Header'
import { useImagesStore } from '@/store/useImagesStore'

import Masonry from 'react-masonry-css'
import { useLogicHome } from './useLogicHome'

export const Home: React.FC = () => {
  const {
    isOpen: isOpenDeleteImageModal,
    onOpen: onOpenDeleteImageModal,
    onClose: onCloseDeleteImageModal,
  } = useDisclosure()

  const {
    isOpen: isOpenAddImageModal,
    onOpen: onOpenAddImageModal,
    onClose: onCloseAddImageModal,
  } = useDisclosure()

  const [imageIdForDelete, setImageIdForDelete] = useState('')
  const [searchImageFilter, setSearchImageFilter] = useState('')

  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    breakpointColumnsObj,
    imagesUrls,
    fetchNextPage,
  } = useLogicHome({ searchImageFilter })

  return (
    <>
      {/* Modals for delete and add image */}
      <AddImageModal
        isOpen={isOpenAddImageModal}
        onSubmit={onCloseAddImageModal}
        onClose={onCloseAddImageModal}
      />

      <RemoveImageModal
        idImageForDelete={imageIdForDelete}
        isOpen={isOpenDeleteImageModal}
        onClose={onCloseDeleteImageModal}
        onDelete={onCloseDeleteImageModal}
      />
      {/* Modals for delete and add image */}

      <Container maxW="1243px">
        <Header
          onClickButtonAddAPhoto={onOpenAddImageModal}
          onChangeInputSearch={(value) => setSearchImageFilter(value)}
        />

        {isLoading && (
          <Progress size="xs" isIndeterminate colorScheme="green" />
        )}
        {imagesUrls?.length === 0 && !isLoading && (
          <Center>
            <Text fontSize="2xl" fontWeight="semibold">
              No image found
            </Text>
          </Center>
        )}

        <Masonry
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          breakpointCols={breakpointColumnsObj}
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
        </Masonry>

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
    </>
  )
}
