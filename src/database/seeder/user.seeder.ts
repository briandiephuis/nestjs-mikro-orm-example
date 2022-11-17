import { UserFactory } from '@app/modules/user/user.factory';
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Logger } from '@nestjs/common';

export class UserSeeder extends Seeder {
  private readonly logger = new Logger(UserSeeder.name);
  async run(em: EntityManager): Promise<void> {
    const userFactory = new UserFactory(em);

    const users = userFactory.make(10);

    await em.persistAndFlush(users);
  }
}
