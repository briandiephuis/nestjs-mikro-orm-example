import { PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';
import request from 'supertest';

import createTestApp, { TestNestApplication } from '../../test-utils/create-test-app';
import { User } from './user.entity';
import { UserFactory } from './user.factory';

describe('UserController (e2e)', () => {
  let app: TestNestApplication;
  let em: SqlEntityManager<PostgreSqlDriver>;
  let users: User[];

  beforeAll(async () => {
    [app, em] = await createTestApp();
    users = new UserFactory(em).make(10);
    await em.persistAndFlush(users);
  });
  afterAll(async () => {
    await app.closeAndDrop();
  });

  it('should return seeded users on: /users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect(JSON.stringify(users));
  });
});
