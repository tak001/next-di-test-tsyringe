import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const setup = async () => {
  await client.$executeRaw`SET GLOBAL FOREIGN_KEY_CHECKS = 0;`;
};

export default setup;
