import { Account, AccountPermission } from '../entity/account';

export const AuthServiceSymbol = Symbol('AuthService');

export const AuthOperation = {
  UpdatePassword: 'update_password',
} as const;
export type AuthOperation = (typeof AuthOperation)[keyof typeof AuthOperation];

export const CheckTokenErrorReason = {
  Expired: 'expired',
  NotSupported: 'not_supported',
  Invalid: 'invalid',
} as const;
export type CheckTokenErrorReason =
  (typeof CheckTokenErrorReason)[keyof typeof CheckTokenErrorReason];

export type TokenInfo =
  | {
      success: true;
      email?: string;
      operation: AuthOperation;
    }
  | {
      success: false;
      reason: CheckTokenErrorReason;
    };

export interface IAuthService {
  signIn(email: string, password: string): Promise<Account>;
  findAccountByEmail(email: string): Promise<Account>;
  createAccount(
    name: string,
    email: string,
    password?: string,
  ): Promise<Account>;
  updateAccount(email: string, disabled: boolean): Promise<void>;
  updatePassword(token: string, newPassword: string): Promise<void>;
  updateEmail(email: string, newEmail: string): Promise<void>;
  deleteAccount(email: string): Promise<void>;
  setPermission(uid: string, permission: AccountPermission): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  checkPasswordResetToken(token: string): Promise<TokenInfo>;
}
