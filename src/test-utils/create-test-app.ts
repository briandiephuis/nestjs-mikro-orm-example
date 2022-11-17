import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';
import { faker } from '@mikro-orm/seeder';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';

import { AppModule } from '@app/app.module';
import { environment } from '@app/environment';
import mikroOrmConfig from '@app/mikro-orm.config';
import { User } from '@app/modules/user/user.entity';

import { TestLogger } from './test-logger';

export interface TestNestApplication extends INestApplication {
  /** Terminates the application (including NestApplication, Gateways, and each connected microservice) **and drops the test database** */
  closeAndDrop: () => Promise<void>;
  /** @deprecated ⚠️ Use `closeAndDrop()` instead */
  close: () => Promise<void>;
}

type TestApp = [TestNestApplication, SqlEntityManager<PostgreSqlDriver>];

export default async function createTestApp(): Promise<TestApp> {
  // Sets up a different mikro-orm database
  environment.db.dbName = v4(); //v4();

  mikroOrmConfig.dbName = environment.db.dbName;
  mikroOrmConfig.logger = (msg) => new TestLogger().log(msg);

  // Creates another test ORM to create and migrate the database;
  // This needs to happen before NestJS starts with its MikroORM instance
  const initOrm = await MikroORM.init(mikroOrmConfig);

  // THIS SEEMS TO GO WRONG
  await initOrm.getMigrator().up();

  await initOrm.getSchemaGenerator().refreshDatabase();
  await initOrm.close(true);

  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication() as TestNestApplication;

  const orm = app.get<MikroORM<PostgreSqlDriver>>(MikroORM);

  app.useLogger(new TestLogger());

  await app.init();

  // Append a method that will close the application, then drop the created database
  // eslint-disable-next-line require-atomic-updates
  app.closeAndDrop = async () => {
    // Close the Nest Application (disconnecting it from the created database)
    await app.close(); // Note: not deprecated. It should be used here, but not in the tests themselves.
    await moduleRef.close();
    await orm.close(true);
    await orm.getSchemaGenerator().dropDatabase(environment.db.dbName);
  };

  const em = orm.em.fork();

  // Fix seeding number to get repeatable results (when the seeding itself doesn't change)
  faker.seed(1);

  return [app, em];
}
