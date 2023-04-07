import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'

export class DeleteImageDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: string

  @IsNotEmpty()
  @IsString()
  passwordImage: string
}
