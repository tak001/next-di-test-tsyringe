import { PrismaClient } from './prismaClient';

export abstract class RepositoryBase {
  constructor(protected readonly prisma: PrismaClient) {}
}
