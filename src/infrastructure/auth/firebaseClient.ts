import { firebaseAuth } from '@/config/firebase';
import { firebaseAdminAuth } from '@/config/firebaseAdmin';
import {
  Auth as AdminAuth,
  CreateRequest,
  DecodedIdToken,
  UpdateRequest,
  UserRecord,
} from 'firebase-admin/auth';
import {
  Auth,
  UserCredential,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { injectable } from 'tsyringe';

export const FirebaseErrorCode = {
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  EXPIRED_ACTION_CODE: 'auth/expired-action-code',
} as const;

// NOTE: FirebaseAuthErrorはなぜかexportされていないため、自前で定義する
// 参考: https://github.com/firebase/firebase-admin-node/issues/1666
export class FirebaseAuthError extends Error {
  code: string;
  message: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export const FirebaseAuthErrorCode = {
  EMAIL_EXISTS: 'auth/email-already-exists',
  INVALID_ACTION_CODE: 'auth/invalid-action-code',
} as const;

export const FirebaseClientSymbol = Symbol('FirebaseClient');

export interface IFirebaseClient {
  signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential>;
  getUserByEmail(email: string): Promise<UserRecord>;
  createUser(request: CreateRequest): Promise<UserRecord>;
  updateUser(uid: string, properties: UpdateRequest): Promise<UserRecord>;
  deleteUser(uid: string): Promise<void>;
  updatePassword(oobCode: string, newPassword: string): Promise<void>;
  setCustomUserClaims(uid: string, customUserClaims: object): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  verifyIdToken(idToken: string): Promise<DecodedIdToken>;
  verifyPasswordResetCode(oobCode: string): Promise<string>;
}

@injectable()
export class FirebaseClient implements IFirebaseClient {
  private firebaseAuth: Auth;
  private firebaseAdminAuth: AdminAuth;

  constructor() {
    this.firebaseAuth = firebaseAuth();
    this.firebaseAdminAuth = firebaseAdminAuth();
  }

  public static isFirebaseAuthError(e: any): e is FirebaseAuthError {
    return e.code !== undefined && e.message !== undefined;
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async getUserByEmail(email: string): Promise<UserRecord> {
    const user = await this.firebaseAdminAuth.getUserByEmail(email);
    return user;
  }

  async createUser(request: CreateRequest): Promise<UserRecord> {
    return await this.firebaseAdminAuth.createUser(request);
  }

  async updateUser(
    uid: string,
    properties: UpdateRequest,
  ): Promise<UserRecord> {
    return await this.firebaseAdminAuth.updateUser(uid, properties);
  }

  async deleteUser(uid: string): Promise<void> {
    await this.firebaseAdminAuth.deleteUser(uid);
  }

  async updatePassword(oobCode: string, newPassword: string): Promise<void> {
    await confirmPasswordReset(this.firebaseAuth, oobCode, newPassword);
  }

  async setCustomUserClaims(
    uid: string,
    customUserClaims: object,
  ): Promise<void> {
    await this.firebaseAdminAuth.setCustomUserClaims(uid, customUserClaims);
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(this.firebaseAuth, email);
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    return await this.firebaseAdminAuth.verifyIdToken(idToken);
  }

  async verifyPasswordResetCode(oobCode: string): Promise<string> {
    const email = await verifyPasswordResetCode(this.firebaseAuth, oobCode);
    return email;
  }
}
