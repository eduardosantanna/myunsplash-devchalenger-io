import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class PaginationQueryDto {
  @Transform(({ value }) => (value < 1 ? 1 : Number(value)))
  @IsOptional()
  @IsNumber()
  @IsInt()
  page: number

  @Transform(({ value }) => (value < 1 ? 9 : Number(value)))
  @IsOptional()
  @IsNumber()
  @IsInt()
  limit: number

  @IsString()
  @IsOptional()
  like: string
}
