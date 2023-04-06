import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ImageDocument = HydratedDocument<Image>

@Schema()
export class Image {
  @Prop({ required: true })
  urlImage: string

  @Prop({ required: true })
  label: string
}

export const ImageSchema = SchemaFactory.createForClass(Image)
