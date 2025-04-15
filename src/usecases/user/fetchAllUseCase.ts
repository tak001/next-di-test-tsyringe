import { User } from '@/domain/entity/user';
import {
  UserRepositorySymbol,
  type IUserRepository,
} from '@/domain/repository/userRepository';
import { UseCaseBase } from '@/usecases/usecaseBase';
import { inject, injectable } from 'tsyringe';

export const FetchAllUsersUseCaseSymbol = Symbol('FetchAllUsersUseCase');

export type FetchAllUsersUseCaseInput = {};

export type FetchAllUsersUseCaseOutput = {
  users: User[];
};

@injectable()
export class FetchAllUsersUseCase extends UseCaseBase {
  constructor(
    @inject(UserRepositorySymbol)
    private readonly repository: IUserRepository,
  ) {
    super();
  }

  async execute(): Promise<FetchAllUsersUseCaseOutput> {
    const users = await this.repository.fetchAll();

    return {
      users,
    };
  }
}
