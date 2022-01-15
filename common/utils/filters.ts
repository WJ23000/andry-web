// 价格格式化 -- 逢三逗号分隔 小数点后保留传入精度位 不传默认保留两位
const setPriceFormat = (num, precisionNum = 2) => {
  if (!num || num == "") {
    // 为空默认保留小数点后两位
    return "0.00";
  }
  if (String(num).indexOf(".") != -1) {
    // 存在小数点
    // ==== 获取小数点前面的数字 ====
    let dotFront = String(num).split(".")[0];
    dotFront = dotFront.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    // ==== 获取小数点后面的数字 ====
    let dotEnd = String(num).split(".")[1];
    if (dotEnd.length > precisionNum) {
      // 小数位大于精度 只取到精度位
      dotEnd = dotEnd.substring(0, precisionNum);
    } else {
      // 小数位小于精度 则补零
      let zeroNum = "";
      for (let i = 0; i <= precisionNum - dotEnd.length - 1; i++) {
        zeroNum += "0";
      }
      dotEnd = `${dotEnd}${zeroNum}`;
    }
    return `${dotFront}.${dotEnd}`;
  } else {
    return `${(num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}.00`;
  }
};
// 保留两位小数
const keepTowDecimalFormat = num => {
  if (!num || num == "") {
    // 为空默认保留小数点后两位
    return "0.00";
  }
  num = parseFloat(num).toFixed(2);
  return num;
};
export { setPriceFormat, keepTowDecimalFormat };
