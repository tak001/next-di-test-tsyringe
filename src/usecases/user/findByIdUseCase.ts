import { User } from '@/domain/entity/user';
import {
  UserRepositorySymbol,
  type IUserRepository,
} from '@/domain/repository/userRepository';
import { inject, injectable } from 'tsyringe';
import { UseCaseBase } from '../usecaseBase';

export const FindByIdUseCaseSymbol = Symbol('FindByIdUseCase');

export type FindByIdUseCaseInput = {
  id: number;
};

export type FindByIdUseCaseOutput = {
  user: User;
};

@injectable()
export class FindByIdUseCase extends UseCaseBase {
  constructor(
    @inject(UserRepositorySymbol)
    private readonly repository: IUserRepository,
  ) {
    super();
  }

  async execute(input: FindByIdUseCaseInput): Promise<FindByIdUseCaseOutput> {
    const { id } = input;

    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error('ユーザーが見つかりません');
    }
    return {
      user,
    };
  }
}
