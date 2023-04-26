export interface IImage {
  _id: string
  imageUrl: string
  label: string
  passwordImage: string
}

export interface IReponseImageApi {
  totalPages: number
  imagesUrls: IImage[]
}
