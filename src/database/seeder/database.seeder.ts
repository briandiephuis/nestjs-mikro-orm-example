import { SqlEntityManager } from '@mikro-orm/postgresql';
import { faker, Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './user.seeder';

export class DatabaseSeeder extends Seeder {
  constructor() {
    super();

    faker.seed(1); // Fix seeding number to get repeatable results (when the seeding itself doesn't change)
  }

  async run(em: SqlEntityManager): Promise<void> {
    await this.call(em, [UserSeeder]);
  }
}
