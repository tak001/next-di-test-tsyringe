import { PrismaClient } from '@prisma/client';
import { UserRepository } from './userRepository.impl';

describe('userRepository', () => {
  const prisma = new PrismaClient();
  const repository = new UserRepository(prisma);

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  describe('fetchAll', () => {
    it('対象レコードが存在しない場合は空配列が返ること', async () => {
      const users = await repository.fetchAll();

      expect(users).toEqual([]);
    });

    it('データが存在する場合はデータが返ること', async () => {
      await prisma.user.create({
        data: {
          id: 1,
          name: 'test-name',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          isDeleted: false,
        },
      });

      const users = await repository.fetchAll();

      expect(users).toHaveLength(1);
      expect(users[0].id).toEqual(1);
      expect(users[0].name).toEqual('test-name');
    });
  });
});
