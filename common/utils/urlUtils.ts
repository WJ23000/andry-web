import { getIsPrivate } from "@common/utils/privateUtils";
import { Vue } from "vue-property-decorator";

// 获取query参数
export function getQstr(name: string) {
  const reg = new RegExp("" + name + "=([^&]+?)(#|&|$)");
  const url = window.location.href;
  const index = url.indexOf("?");
  const r = url.substr(index).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[1]);
  }
  return null;
}

export function removeQstr(paramArr: string[], url = window.location.href) {
  const queryIndex = url.indexOf("?");
  if (queryIndex == -1 || paramArr.length == 0) {
    return url;
  }
  // 1 获取query字符串
  const queryUrl = url.split("?")[1];
  // 2 截取&字符
  const queryArr = queryUrl.split("&");
  // 3 将queryArr遍历成新array
  let queryData: any = [];
  queryArr.forEach(item => {
    const itemName = item.split("=");
    queryData.push({
      name: itemName[0],
      value: itemName[1]
    });
  });
  // 4 过滤传入的参数
  paramArr.forEach(item => {
    queryData = queryData.filter(function(item2) {
      return item2.name != item ? item2 : false;
    });
  });
  let urlString = url.split("?")[0];

  if (queryData.length == 0) {
    return urlString
  }
  // 5 过滤后queryData重新拼接url中
  urlString = `${urlString}?${queryData[0].name}=${queryData[0].value}`;
  if (queryData.length > 1) {
    for (let i = 1; i < queryData.length - 1; i++) {
      urlString = `${urlString}&${queryData[i].name}=${queryData[i].value}`;
    }
  }
  return urlString;
}

export function param2Obj(url: string) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

/**
 * 替换html中img标签地址为实时地址
 * @param content // 需要替换的html内容
 * @param fn // 需要根据url调用接口的函数的函数
 */
export async function changeImgUrl(
  content: string | undefined,
  fn: Function,
  isMarkDown = false
): Promise<string> {
  // 替换html中的img标签url
  if (!content) {
    return "";
  }
  let regContent = /<img[^]*?src="[^"]*?\/service-[^/]*?\/[^/]*\.[^?]*?\??[^>]*?>/g;

  let regTag = /src="[^"]*?(\/service-[^/]*?\/[^/]*\.[^?>"]*)\??/;

  if (isMarkDown) {
    // markDown格式匹配
    regContent = /!\[.*\]\(([^[]*?\/service-[^/]*?\/[^/)]*?)\)/g;

    regTag = /!\[.*\]\([^[]*?(\/service-[^/]*?\/[^/]*\.[^?)]*)\??/;
  }
  const imgsMatch = content.match(regContent);
  let newContent = content;
  if (!imgsMatch) {
    return newContent;
  }
  // 替换富文本中所有img标签中的url
  for (let i = 0; i < imgsMatch.length; i++) {
    const imgTag = imgsMatch[i];
    const src = imgTag.match(regTag);
    if (!src) {
      return "";
    }

    const res = await fn(src[1], isMarkDown);

    let reg = new RegExp(`<img[^<]*?src="([^"]*?${src[1]}.*?)">`, "g");
    let replaceVal = `<img src="${res}">`;
    if (isMarkDown) {
      reg = new RegExp(`\\!\\[.*\\]\\([^\\[]*?${src[1]}.*?\\)`, "g");
      if (getIsPrivate()) {
        if (res.data.match("service-exam")) {
          replaceVal = `![img](${Vue.prototype.$API_URL}service-exam/open/question/pic/get/${res.data})`;
        } else {
          replaceVal = `![img](${Vue.prototype.$API_URL}service-course/open/courseResourcePool/pic/get/${res.data})`;
        }
      } else {
        replaceVal = `![image](${res})`;
      }
    }
    newContent = newContent.replace(reg, replaceVal);
  }
  return newContent;
}
