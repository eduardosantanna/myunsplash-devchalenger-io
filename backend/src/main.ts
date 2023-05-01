import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { initializeFirebase } from './firebase.config'

async function bootstrap() {
  initializeFirebase()

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()
  await app.listen(3333)
}
bootstrap()
