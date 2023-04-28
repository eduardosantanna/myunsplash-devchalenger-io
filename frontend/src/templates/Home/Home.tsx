import {
  Button,
  Container,
  Text,
  useDisclosure,
  Center,
  Progress,
} from '@chakra-ui/react'
import Masonry from 'react-masonry-css'
import { useState } from 'react'

import { useLogicHome } from './useLogicHome'
import { Header } from '@/components/Header/Header'
import { CardImage } from '@/components/CardImage/CardImage'
import { AddImageModal } from '@/components/AddImageModal/AddImageModal'
import { RemoveImageModal } from '@/components/RemoveImageModal/RemoveImageModal'

export const Home: React.FC = () => {
  const [imageIdForDelete, setImageIdForDelete] = useState('')
  const [searchImageFilter, setSearchImageFilter] = useState('')

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

        {!isLoading && (
          <Masonry
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            breakpointCols={breakpointColumnsObj}
          >
            {imagesUrls?.map((imageData) => (
              <CardImage
                key={Math.random()}
                imageData={imageData}
                onClickDeleteButton={() => (
                  setImageIdForDelete(imageData._id), onOpenDeleteImageModal()
                )}
              />
            ))}
          </Masonry>
        )}

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
