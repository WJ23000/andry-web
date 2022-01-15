export default function debounce(callback, timing = 100) {
  let timer: any = null;

  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timing);
  };
}
