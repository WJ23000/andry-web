// 私有化相关工具库
import { Vue } from "vue-property-decorator";

export function getObsResource(res: any, isPrivate = false) {
  // 根据判断私有化获取资源，公有云从obs获取url 5分钟有效
  if (isPrivate) {
    // 私有化

    if (res && res.size > 0) {
      const data = [].concat(res);
      return window.URL.createObjectURL(new Blob(data));
    } else {
      return "";
    }
  }
  return res.data;
}

export function getIsPrivate() {

  return false;

}
