import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    // 日志
    logger: ['error', 'warn', 'log'],
  });
  app.setGlobalPrefix('api/v1');

  const port = 3000;
  await app.listen(port);
  logger.warn(`App 运行在 ${port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
