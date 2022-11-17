import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(8000);
}

// Let the server fail if it fails. Server management (e.g. Kubernetes) should know this and handle
// accordingly (i.e. restart it)
bootstrap();
