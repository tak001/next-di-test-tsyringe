/** pathの途中にkeyと一致する {} があれば、第二引数の値と置き換える */
export const replacePath = (
  path: string,
  replacementObj: { [key: string]: string | number | undefined },
): string => {
  path = path.replace(/{([^}]+)}/g, (_match, key) => {
    if (key in replacementObj && replacementObj[key] !== undefined) {
      return String(replacementObj[key]);
    }
    throw new Error(`'${key}'に一致する値がありません`);
  });

  return path;
};
