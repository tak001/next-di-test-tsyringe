import { User } from '@/domain/entity/user';
import { UserRepository } from '@/infrastructure/database/userRepository.mock';
import { FetchAllUsersUseCase } from './fetchAllUseCase';

describe('FindCorporationMastersUseCase', () => {
  const userRepository = new UserRepository();
  let useCase: FetchAllUsersUseCase;

  beforeEach(async () => {
    jest.clearAllMocks();
    useCase = new FetchAllUsersUseCase(userRepository);
  });

  const testUser = new User({
    id: 1,
    name: 'test-name',
    email: 'test-email',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    isDeleted: false,
  });

  describe('execute', () => {
    it('ユーザー一覧を取得できる', async () => {
      jest.spyOn(userRepository, 'fetchAll').mockResolvedValueOnce([testUser]);

      const result = await useCase.execute();

      expect(userRepository.fetchAll).toHaveBeenCalled();

      expect(result).toEqual({
        users: [testUser],
      });
    });
  });
});
