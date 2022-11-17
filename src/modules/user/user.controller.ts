import { InjectRepository } from '@mikro-orm/nestjs';
import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

  @Get()
  users() {
    return this.userRepository.findAll();
  }
}
