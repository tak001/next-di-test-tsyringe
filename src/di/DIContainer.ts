import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';

// クライアント関連のインポート
import {
  FirebaseClient,
  FirebaseClientSymbol,
} from '@/infrastructure/auth/firebaseClient';
import {
  PrismaClient,
  PrismaClientSymbol,
} from '@/infrastructure/database/prismaClient';
import {
  SendGridClient,
  SendGridClientSymbol,
} from '@/infrastructure/sendGrid/sendGridClient';

// シンボルインポート（アルファベット順に整理）
import { UserRepositorySymbol } from '@/domain/repository/userRepository';

// 実装クラスのインポート（アルファベット順に整理）
import { UserRepository } from '@/infrastructure/database/userRepository.impl';

// UseCaseのインポート（アルファベット順に整理）
import {
  FetchAllUsersUseCase,
  FetchAllUsersUseCaseSymbol,
} from '@/usecases/user/fetchAllUseCase';
import {
  FindByIdUseCase,
  FindByIdUseCaseSymbol,
} from '@/usecases/user/findByIdUseCase';

container
  .register(
    PrismaClientSymbol,
    {
      useClass: PrismaClient,
    },
    { lifecycle: Lifecycle.Singleton },
  )
  .register(
    FirebaseClientSymbol,
    {
      useClass: FirebaseClient,
    },
    { lifecycle: Lifecycle.Singleton },
  )
  .register(
    SendGridClientSymbol,
    {
      useClass: SendGridClient,
    },
    { lifecycle: Lifecycle.Singleton },
  )
  .register(UserRepositorySymbol, {
    useClass: UserRepository,
  })
  .register(FetchAllUsersUseCaseSymbol, {
    useClass: FetchAllUsersUseCase,
  })
  .register(FindByIdUseCaseSymbol, {
    useClass: FindByIdUseCase,
  });

export { container as DIContainer };
