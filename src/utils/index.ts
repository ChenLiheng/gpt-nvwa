/**
 * px 转 rem 方法
 * @param px
 * @param root
 */
export const px2rem = (px: number, root: number = 37.5) => {
  return `${px / root}rem`;
};
