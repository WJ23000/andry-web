export function getUuid(length = 6) {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += "x";
  }
  return str.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
