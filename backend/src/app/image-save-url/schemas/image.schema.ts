import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { hashSync } from 'bcrypt'

export type ImageDocument = HydratedDocument<Image>

@Schema()
export class Image {
  @Prop({ required: true })
  imageUrl: string

  @Prop({ required: true })
  label: string

  @Prop({ required: true })
  passwordImage: string
}

export const ImageSchema = SchemaFactory.createForClass(Image)

ImageSchema.pre('save', function (next) {
  this.passwordImage = hashSync(this.passwordImage, 10)
  next()
})
