import { EntityRepository } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';

import { User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
  private readonly logger = new Logger(UserRepository.name);
}
