import { z } from 'zod';

/** ユーザーのランク */
export const UserLank = {
  /** ユーザーのランクがAランク */
  A: 'Aランク',
  /** ユーザーのランクがBランク */
  B: 'Bランク',
  /** ユーザーのランクがCランク */
  C: 'Cランク',
  /** ユーザーのランクがDランク */
  D: 'Dランク',
} as const satisfies Record<string, string>;

export const UserLankSchema = z.union([
  z.literal(UserLank.A),
  z.literal(UserLank.B),
  z.literal(UserLank.C),
  z.literal(UserLank.D),
]);

export type UserLank = z.infer<typeof UserLankSchema>;

interface UserLankMap {
  [key: string]: string;
}

export const UserLankLabels: UserLankMap = UserLank as UserLankMap;
