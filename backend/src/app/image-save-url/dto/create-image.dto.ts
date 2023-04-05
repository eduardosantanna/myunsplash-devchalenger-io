import { IsString, IsNotEmpty } from 'class-validator'

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string

  @IsString()
  @IsNotEmpty()
  label: string
}
