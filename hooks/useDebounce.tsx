let timeout: any;
export default function useDebounce(cb: any, delay = 500) {
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
