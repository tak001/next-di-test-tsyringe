/**
 * range関数 - startからendまでの数値の配列を返す
 * @param start - 開始値
 * @param end - 終了値
 * @returns startからendまでの数値の配列
 * @example
 * range(1, 5) // [1, 2, 3, 4, 5]
 * range(3, 5) // [3, 4, 5]
 */
export const range = (start: number, end: number) => {
  if (start > end) {
    return [];
  }
  return [...Array(end - start + 1)].map((_, i) => start + i);
};
