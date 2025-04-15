// @ts-ignore
import changeCase from 'change-object-case';

changeCase.options = { recursive: true, arrayRecursive: true };

export const objectKeysToCamel = (item: unknown) => changeCase.toCamel(item);

export const stringToCamel = (str: unknown) => changeCase.camelCase(str);

export const objectKeysToKebab = (item: unknown) => changeCase.toParam(item);

export const stringToKebab = (str: unknown) => changeCase.paramCase(str);

export const stringToSnake = (str: unknown) => changeCase.snakeCase(str);

export const objectKeysToSnake = (item: unknown) => changeCase.snakeKeys(item);
