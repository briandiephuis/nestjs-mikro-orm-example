import { Entity, EntityRepositoryType, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRepository } from './user.repository';

@Entity()
export class User {
  [EntityRepositoryType]?: UserRepository;
  [OptionalProps]?: 'id';

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
