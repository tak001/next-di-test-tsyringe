import { z } from 'zod';

export type AccountPermission = {
  market?: boolean;
  partner?: boolean;
  admin?: boolean;
};

const AccountSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  permission: z
    .object({
      admin: z.boolean().optional(),
    })
    .optional(),
  disabled: z.boolean().optional(),
});

export class Account {
  private _uid: string;
  private _email: string;
  private _permission?: AccountPermission;
  private _disabled?: boolean;

  constructor(params: z.infer<typeof AccountSchema>) {
    AccountSchema.parse(params);

    this._uid = params.uid;
    this._email = params.email;
    this._permission = params.permission;
    this._disabled = params.disabled;
  }

  get uid(): string {
    return this._uid;
  }

  get email(): string {
    return this._email;
  }

  get permission(): AccountPermission | undefined {
    return this._permission;
  }
}
