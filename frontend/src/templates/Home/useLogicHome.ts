import { ImageService } from '@/services/api/ImageService/ImageService'
import { useImagesStore } from '@/store/useImagesStore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface IUseLogicHomeProps {
  searchImageFilter: string
}

export const useLogicHome = ({ searchImageFilter }: IUseLogicHomeProps) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['images', searchImageFilter],
      queryFn: ({ pageParam = 1 }) =>
        ImageService.getImages({ pageParam, like: searchImageFilter }),
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length < lastPage.totalPages
          ? allPages.length + 1
          : undefined
      },
    })

  const {
    actions: { addAllImage },
    state: { images: imagesUrls },
  } = useImagesStore()

  useEffect(() => {
    const images = data?.pages.map((page) => page.imagesUrls)
    const imagesReduced = images?.reduce((acc, data) => [...acc, ...data], [])
    if (imagesReduced) addAllImage(imagesReduced)
  }, [data, addAllImage])

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  }

  return {
    breakpointColumnsObj,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    imagesUrls,
    fetchNextPage,
  }
}
