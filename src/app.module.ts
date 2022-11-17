import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MikroOrmRequestContextMiddleware } from './middleware/mikro-orm-request-context.middleware';
import config from './mikro-orm.config';

import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), UserModule],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MikroOrmRequestContextMiddleware).forRoutes('*'); // For all routes (including graphql & auth)
  }
}
