/**
 * px 转 rem 方法
 * @param px
 * @param root
 */
export const px2rem = (px: number, root: number = 37.5) => {
  return `${px / root}rem`;
};

export const uuid = (): string => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url); //释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1);
};

export const genNonceStr = (digit = 8) => {
  const randomNumber = Math.random() * 100000000;
  const randomInt = Math.floor(randomNumber);
  return randomInt.toString().padStart(digit, '0');
};
