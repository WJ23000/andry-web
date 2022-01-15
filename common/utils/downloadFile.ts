// 下载文件(流文件)
export function exportFileBlob(res, type) {
  const href = window.URL.createObjectURL(res);
  const a = document.createElement("a");
  a.href = href;
  a.download = type;
  document.body.appendChild(a);
  a.click();
  //
  document.body.removeChild(a);
}

// 下载文件(url地址)
export function exportFileUrl(res, filename) {
  console.log(filename, "怪异");

  const href = res;
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  // a.target = "_blank"; // 新窗口打开链接
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
// 下载文件(url地址)新窗口
export function exportFileUrlNew(res, filename) {
  console.log(filename, "怪异");

  const href = res;
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.target = "_blank"; // 新窗口打开链接
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
