import { User } from '@/domain/entity/user';
import { IUserRepository } from '@/domain/repository/userRepository';
// import { User as UserModel } from '@prisma/client';
import { inject, singleton } from 'tsyringe';
import { PrismaClient, PrismaClientSymbol } from './prismaClient';
import { RepositoryBase } from './repositoryBase';

@singleton()
export class UserRepository extends RepositoryBase implements IUserRepository {
  constructor(
    @inject(PrismaClientSymbol)
    protected readonly prisma: PrismaClient,
  ) {
    super(prisma);
  }

  async fetchAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        isDeleted: false,
      },
    });

    return users ?? [];
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return undefined;
    }

    return this.modelToEntity(user);
  }

  // private modelToEntity(user: UserModel): User {
  private modelToEntity(user: any): User {
    return new User({
      id: user.id,
      name: user.name ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
      deletedAt: user.deletedAt ?? undefined,
      isDeleted: user.isDeleted,
    });
  }
}
