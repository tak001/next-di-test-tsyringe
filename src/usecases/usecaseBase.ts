import { DIContainer } from '@/di/DIContainer';
import {
  PrismaClient,
  PrismaClientSymbol,
} from '@/infrastructure/database/prismaClient';

export abstract class UseCaseBase {
  constructor() {}

  abstract execute(input: any): Promise<any>;

  protected async transaction<T>(callback: () => Promise<T>): Promise<T> {
    const prisma = DIContainer.resolve<PrismaClient>(PrismaClientSymbol);
    return prisma.$transaction(callback);
  }
}
