import { User } from '@/domain/entity/user';
import { UserRepository } from '@/infrastructure/database/userRepository.mock';
import { FindByIdUseCase } from '@/usecases/user/findByIdUseCase';

describe('FindByIdUseCase', () => {
  const userRepository = new UserRepository();
  let useCase: FindByIdUseCase;

  beforeEach(async () => {
    jest.clearAllMocks();
    useCase = new FindByIdUseCase(userRepository);
  });

  const testUser = new User({
    id: 1,
    name: 'test-name',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  });

  const id = 1;

  describe('execute', () => {
    it('ユーザーを取得できる', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(testUser);

      const result = await useCase.execute({
        id: id,
      });

      expect(userRepository.findById).toHaveBeenCalledWith(id);

      expect(result).toEqual({
        user: testUser,
      });
    });
  });
});
