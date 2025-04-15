import {
  CreateRequest,
  DecodedIdToken,
  UpdateRequest,
  UserRecord,
} from 'firebase-admin/auth';
import { UserCredential } from 'firebase/auth';
import { IFirebaseClient } from './firebaseClient';

export class FirebaseClient implements IFirebaseClient {
  updateUser(_uid: string, _properties: UpdateRequest): Promise<UserRecord> {
    throw new Error('Method not implemented.');
  }
  deleteUser(_uid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signInWithEmailAndPassword(
    _email: string,
    _password: string,
  ): Promise<UserCredential> {
    throw new Error('Method not implemented.');
  }

  async getUserByEmail(_email: string): Promise<UserRecord> {
    throw new Error('Method not implemented.');
  }

  async createUser(_request: CreateRequest): Promise<UserRecord> {
    throw new Error('Method not implemented.');
  }

  async updatePassword(_oobCode: string, _newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async setCustomUserClaims(
    _uid: string,
    _customUserClaims: object,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async sendPasswordResetEmail(_email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async verifyIdToken(_idToken: string): Promise<DecodedIdToken> {
    throw new Error('Method not implemented.');
  }

  async verifyPasswordResetCode(_oobCode: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
