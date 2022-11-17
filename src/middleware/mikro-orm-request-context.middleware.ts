import { MikroORM, RequestContext } from '@mikro-orm/core';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class MikroOrmRequestContextMiddleware implements NestMiddleware {
  constructor(private readonly orm: MikroORM) {}

  use(req: Request, res: Response, next: NextFunction): void {
    RequestContext.create(this.orm.em, next);
  }
}
