import { z } from 'zod';
import { UserLank } from '../value/userLank';

export const UserSchema: z.ZodSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(191),
});

export class User {
  private _id: number;
  private _name: string;

  constructor(params: z.infer<typeof UserSchema>) {
    UserSchema.parse(params);
    this._id = params.id ?? -1;
    this._name = params.name;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  /** 文字列型の値をUserLankの型に変換する */
  static parseUserLank(status: string): UserLank {
    for (const key in UserLank) {
      if (UserLank[key as keyof typeof UserLank] === status) {
        return status as UserLank;
      }
    }
    throw new Error(`Invalid user lank: ${status}`);
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
