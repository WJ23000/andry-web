// 复制内容到剪贴板
export function copyContent(msg) {
  const clipItem = document.body;
  const input = document.createElement("input");
  input.value = msg;
  clipItem.appendChild(input);
  input.select();
  document.execCommand("copy");
  clipItem.removeChild(input);
}
