import { Migration } from '@mikro-orm/migrations';

export class Migration20220920084700 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";');
    this.addSql('create extension if not exists "citext";');
  }
}
