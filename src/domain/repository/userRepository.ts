// import { Prisma } from '@prisma/client';
import { User } from '../entity/user';

export const UserRepositorySymbol = Symbol('UserRepository');

export interface IUserRepository {
  findById(id: number): Promise<User | undefined>;
  fetchAll(): Promise<User[]>;
  // findByFilters(
  //   limit: number,
  //   offset: number,
  //   filters: Prisma.UserWhereInput,
  // ): Promise<User[]>;
}
