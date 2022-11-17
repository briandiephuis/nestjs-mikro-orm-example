import { Options } from '@mikro-orm/core';
import { AbstractSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { environment } from './environment';

import { User } from './modules/user/user.entity';

const config: Options<AbstractSqlDriver> = {
  type: 'postgresql',
  ...environment.db,
  entities: [User],
  debug: environment.isDevelopment,
  discovery: {
    requireEntitiesArray: true, // force usage of class references in `entities` instead of paths
  },
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: 'src/database/migrations',
  },
  seeder: {
    defaultSeeder: 'DatabaseSeeder',
    path: 'src/database/seeder',
  },
};

// Only color Mikro ORM logs in development (not on AWS)
if (environment.isDevelopment) {
  config.highlighter = new SqlHighlighter();
}

export default config;
