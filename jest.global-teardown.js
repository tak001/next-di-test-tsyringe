import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const teardown = async () => {
  await client.$executeRaw`SET GLOBAL FOREIGN_KEY_CHECKS = 1;`;
};

export default teardown;
