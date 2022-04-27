/**
 * @description 防抖
 * @param {Function} fn 回调函数
 * @param {Number} delay 延迟时间
 */
export const debounce = <F extends (...args: any[]) => void>(fn: F, delay = 200, isImmediate = false) => {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...rest: any[]) {
    if (isImmediate) {
      fn.apply(this, rest);
      isImmediate = false;
      return;
    }

    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, rest);
    }, delay);
  };
};