export function throttle(fn, delay = 100) {
  let timer;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn(args);
        timer = null;
      }, delay);
    }
  }
}
