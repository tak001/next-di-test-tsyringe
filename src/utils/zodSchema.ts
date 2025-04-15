import { z, ZodTypeAny } from 'zod';

export class ZodSchema {
  /**
   * 文字列を分割して指定されたスキーマに基づいた配列を返す
   */
  public static splitApplySchema(elementSchema: ZodTypeAny) {
    return z.preprocess((input) => {
      // 文字列であり、かつ空文字列の場合、空の配列を返す
      if (typeof input === 'string' && input === '') {
        return [];
      }
      // 文字列であれば分割して返す
      if (typeof input === 'string') {
        return input.split(',');
      }
      // その他の場合は入力をそのまま返す
      return input;
    }, z.array(elementSchema));
  }

  /**
   * パスワードスキーマ
   * 8文字以上、20文字以下、半角英数字・数字のみ、半角英数字と数字をそれぞれ1文字以上含む
   */
  public static password() {
    return z
      .string()
      .min(8, {
        message: 'パスワードは8文字以上で設定してください',
      })
      .max(20, {
        message: 'パスワードは20文字以下で設定してください',
      })
      .regex(
        /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]+$/,
        'パスワードは半角英数字・数字のみで、両方を含めてください',
      );
  }

  public static email() {
    return z
      .string()
      .max(191, { message: 'メールアドレスは191文字以下である必要があります' })
      .email({ message: '無効なメールアドレスです' })
      .optional()
      .or(z.literal(''));
  }

  public static phoneNumber() {
    return z
      .string()
      .max(191, { message: '電話番号は191文字以下である必要があります' })
      .regex(/^0?\d{1,4}-\d{1,4}-\d{4}$/, {
        message: '無効な電話番号です',
      })
      .optional()
      .or(z.literal(''));
  }

  public static faxNumber() {
    return z
      .string()
      .max(191, {
        message: 'FAX番号は191文字以下である必要があります',
      })
      .regex(/^(?:\+81)?\d{1,4}(?:-\d{1,4}){1,2}$/, {
        message: '無効なFAX番号です',
      })
      .optional()
      .or(z.literal(''));
  }

  public static date() {
    return z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: '無効な日付形式です。 YYYY-MM-DD 形式で入力してください',
      })
      .optional()
      .or(z.literal(''));
  }

  /**
   * 文字列をbooleanに変換するカスタムバリデーション
   */
  public static stringToBoolean() {
    return z.preprocess((input) => {
      if (typeof input === 'string') {
        return input.toLowerCase() === 'true';
      }
      return false;
    }, z.boolean());
  }
}
