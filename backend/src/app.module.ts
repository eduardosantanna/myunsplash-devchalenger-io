import { Module } from '@nestjs/common'
import { ImageModule } from './app/image-save-url/image-save-url.module'

@Module({
  imports: [ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
