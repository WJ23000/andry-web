/* 格式化日期及unix时间戳的转换工具包 */

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * dateFormat(time, "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * dateFormat(time, "yyyy/MM/dd hh:mm:ss.S") ==> 2006/07/02 08:09:04.423
 * dateFormat(time, "yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * dateFormat(time, "yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * dateFormat(time, "yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * dateFormat(time, "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

interface Week<T> {
  [index: string]: T;
}

export const dateFormat = function(time: Date | string, fmt = ""): string {
  let DateTime: Date;
  if (time instanceof Date) {
    DateTime = time;
  } else {
    time = time.replace(/-/g, "/"); // 兼容ie
    DateTime = new Date(time);
  }
  const o: Week<number> = {
    "M+": DateTime.getMonth() + 1, // 月份
    "d+": DateTime.getDate(), // 日
    "h+": DateTime.getHours() % 12 === 0 ? 12 : DateTime.getHours() % 12, // 小时
    "H+": DateTime.getHours(), // 小时
    "m+": DateTime.getMinutes(), // 分
    "s+": DateTime.getSeconds(), // 秒
    "q+": Math.floor((DateTime.getMonth() + 3) / 3), // 季度
    S: DateTime.getMilliseconds() // 毫秒
  };
  const week: Week<string> = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (DateTime.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "\u661f\u671f"
          : "\u5468"
        : "") + week[DateTime.getDay() + ""]
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      const rep =
        RegExp.$1.length === 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length);
      fmt = fmt.replace(RegExp.$1, String(rep));
    }
  }
  return fmt;
};
// 根据传入的unix参数格式化时间
export function formatUnixToTime(
  unixTime: number | string,
  type = "yyyy-MM-dd HH:mm"
) {
  if (String(unixTime) !== "") {
    // unixTime += "";
    // var time= parseInt(unixTime.substring(6, unixTime.length - 2));//截取字符串
    const commonTime = new Date(Number(unixTime));
    return dateFormat(commonTime, type);
  } else {
    return "";
  }
}
// 创建时间并格式化为unix时间戳
export function createTimeToUnix() {
  const time = new Date();
  return Date.parse(time.toDateString());
}
// 根据格式化的日期2015-2-5 15:34转换为unix
export function formatTimeToUnix(time = ""): number {
  const newTime = time.replace(/-/g, "/");
  const date = new Date(newTime);
  return date.getTime();
}

function getHMS(time) {
  let minute = 0; // 分
  let hour = 0; // 时
  let seconds = 0;
  if (time >= 60) {
    seconds = time % 60;
    const tmpMinute = (minute = (time - seconds) / 60);
    if (tmpMinute >= 60) {
      minute = tmpMinute % 60;
      hour = (tmpMinute - minute) / 60;
    }
  } else {
    seconds = time;
  }
  return [hour, minute, seconds]
}

// 根据豪秒数转换为时分秒
export function formatSecondsToHour(time: number): number[] {
  time = time / 1000;
  let minute = 0; // 分
  let hour = 0; // 时
  let seconds = 0;
  [hour, minute, seconds] = getHMS(time);
  return [hour, minute, seconds];
}

// 根据豪秒数转换为时分秒
export function formatSecondsToHourReturnStr(time: number): string[] {
  time = time / 1000;

  let minute = 0; // 分
  let minuteStr = "0"; // 分
  let hour = 0; // 时
  let hourStr = "0"; // 时
  let seconds = 0;
  let secondsStr = "0";
  [hour, minute, seconds] = getHMS(time);
  minuteStr = minute < 10 ? "0" + minute : minute + "";
  hourStr = hour < 10 ? "0" + hour : hour + "";
  secondsStr = seconds < 10 ? "0" + seconds : seconds + "";
  return [hourStr, minuteStr, secondsStr];
}

// 时间比较
export function timeCompare(currentTime) {
  const myDate = new Date();
  const now = myDate.getTime();
  const time = new Date(currentTime).getTime();
  return now > time;
}

export function getRestTime(time): { day: number, hour: number, min: number, sec: number } {
  if (time < 0) {
    return {day: 0, hour: 0, min: 0, sec: 0};
  }
  const minUnit = 60;
  const hourUnit = 3600;
  const dayUnit = hourUnit * 24;
  const day = Math.floor(time / dayUnit);
  const hour = Math.floor(time % dayUnit / hourUnit);
  const min = Math.floor(time % hourUnit / minUnit);
  const sec = Math.floor(time % minUnit);
  return { day, hour, min, sec };
}
