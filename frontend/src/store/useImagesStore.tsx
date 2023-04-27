import { IImage } from '@/services/api/ImageService/types'
import { create } from 'zustand'

interface IUseImagesStoreState {
  state: {
    images: IImage[]
  }
  actions: {
    addAllImage: (image: IImage[]) => void
    removeImage: (_id: string) => void
  }
}

export const useImagesStore = create<IUseImagesStoreState>((set) => ({
  state: {
    images: [],
  },
  actions: {
    addAllImage: (imageData) =>
      set(({ state }) => {
        if (imageData.length === 1) {
          state.images.pop()
          return {
            state: { images: [...imageData, ...state.images] },
          }
        }

        return { state: { images: imageData } }
      }),
    removeImage: (id) =>
      set(({ state }) => ({
        state: { images: state.images.filter((item) => item._id !== id) },
      })),
  },
}))
