import { User } from '@/domain/entity/user';
import { IUserRepository } from '@/domain/repository/userRepository';
// import { Prisma } from '@prisma/client';
import { singleton } from 'tsyringe';

@singleton()
export class UserRepository implements IUserRepository {
  constructor() {}
  fetchAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findById(_id: number): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
}
