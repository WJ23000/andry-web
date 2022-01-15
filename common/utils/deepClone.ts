export function singleDeepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
