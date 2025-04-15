import { PrismaClient as PrismaClientBase } from '@prisma/client';
import { singleton } from 'tsyringe';

export const PrismaClientSymbol = Symbol('PrismaClient');

@singleton()
export class PrismaClient extends PrismaClientBase {
  constructor() {
    super();
  }
}
