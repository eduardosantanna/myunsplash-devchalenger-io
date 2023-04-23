export interface IImage {
  _id: string
  imageUrl: string
  label: string
  passwordImage: string
}

export type TImageDataCreate = {
  imageUrl: string
  label: string
  passwordImage: string
}
