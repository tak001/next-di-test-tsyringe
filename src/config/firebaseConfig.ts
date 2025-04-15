import { InternalServerError } from '@/domain/error';
import { Logger } from '@/utils/logger';

export type FirebaseConfig = {
  ApiKey: string;
  AuthDomain: string;
  ProjectId: string;
  ClientEmail: string;
  PrivateKey: string;
};

export const getFirebaseConfig = (): FirebaseConfig => {
  try {
    return JSON.parse(atob(process.env.FIREBASE_CONFIG!));
  } catch (e) {
    Logger.error(JSON.stringify(e));
    throw new InternalServerError('Failed to parse FIREBASE_CONFIG');
  }
};
