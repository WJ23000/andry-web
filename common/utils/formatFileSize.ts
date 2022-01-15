/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。
 *    如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 */
export function formatSize(size: number, pointLength = 2, units?) {
  let unit;
  units = units || ["B", "K", "M", "G", "TB"];
  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024;
  }
  return (unit === "B" ? size : size.toFixed(pointLength)) + unit;
}

// 获取上传文件后缀
export function formatSuffix(fileName) {
  const first = fileName.lastIndexOf("."); // 取到文件名开始到最后一个点的长度
  const nameLength = fileName.length; // 取到文件名长度
  const suffix = fileName.substring(first + 1, nameLength); // 截取获得后缀名
  return suffix;
}
