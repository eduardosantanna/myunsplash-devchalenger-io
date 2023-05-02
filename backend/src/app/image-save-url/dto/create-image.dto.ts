import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string

  @IsString()
  @IsNotEmpty()
  label: string

  @IsString()
  @IsNotEmpty()
  passwordImage: string

  @IsOptional()
  imageBuffer: Buffer

  @IsOptional()
  imageContentType: string
}
