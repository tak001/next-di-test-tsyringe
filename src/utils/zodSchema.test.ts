import { z } from 'zod';
import { ZodSchema } from './zodSchema';

describe('zodSchema', () => {
  describe('splitApplySchema', () => {
    const schema = ZodSchema.splitApplySchema(z.string());
    it('コンマで区切られた文字列を分割して配列に変換する', () => {
      const result = schema.safeParse('a,b,c');
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data).toEqual(['a', 'b', 'c']);
      }
    });
    it('空文字列を空の配列に変換する', () => {
      const result = schema.safeParse('');
      expect(result.success).toBeTruthy();
      if (result.success) {
        expect(result.data).toEqual([]);
      }
    });
    it('非文字列入力はスキーマ違反となる', () => {
      const result = schema.safeParse(123);
      expect(result.success).toBeFalsy();
    });
  });

  describe('password', () => {
    it('8文字', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('Aa123456');
      expect(result.success).toBeTruthy();
    });

    it('20文字', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('Aa123456789012345678');
      expect(result.success).toBeTruthy();
    });

    it('7文字', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('Aa12345');
      expect(result.success).toBeFalsy();
    });

    it('21文字', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('Aa1234567890123456789');
      expect(result.success).toBeFalsy();
    });

    it('半角英数字なし', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('12345678');
      expect(result.success).toBeFalsy();
    });

    it('数字なし', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('AAAAaaaa');
      expect(result.success).toBeFalsy();
    });

    it('スペースが含まれている', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse(' Aa123456');
      expect(result.success).toBeFalsy();
    });

    it('日本語が含まれている', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('あAa123456');
      expect(result.success).toBeFalsy();
    });

    it('記号が含まれている', () => {
      const schema = ZodSchema.password();
      const result = schema.safeParse('Aa!123456');
      expect(result.success).toBeFalsy();
    });
  });

  describe('stringToBoolean', () => {
    const schema = ZodSchema.stringToBoolean();

    it('"true"を真のbooleanに変換する', () => {
      const result = schema.safeParse('true');
      expect(result.success).toBeTruthy();
    });

    it('"false"を偽のbooleanに変換する', () => {
      const result = schema.safeParse('false');
      expect(result.success).toBeTruthy();
    });

    it('大文字を含む"TRUE"も真のbooleanに変換する', () => {
      const result = schema.safeParse('TRUE');
      expect(result.success).toBeTruthy();
    });

    it('非文字列は偽のbooleanに変換する', () => {
      const result = schema.safeParse(123);
      expect(result.success).toBeTruthy();
    });
  });
});
