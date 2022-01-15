import { getUuid } from "@common/utils/uuid";

export default class GlobalBus {
  static callbacks = {};
  static uuidLib = {}; 

  static editCourseRelevanceQuestions = false;

  static $on(name, fn) {
    let uuid = getUuid(10);
    // 初始化该eventType对应事件容器
    this.callbacks[name] = this.callbacks[name] || [];
    // 判断uuid是否重复生成
    while (this.uuidLib[uuid]) {
      uuid = getUuid(10);
    }
    // 添加入uuidLib
    this.uuidLib[uuid] = 1;
    // 注册监听事件
    this.callbacks[name].push({ fn, id: uuid });

    return uuid;
  }

  static $off(name, uuid) {
    if (!this.callbacks[name]) {
      return;
    }
    const index = this.callbacks[name].findIndex(eventObj => {
      return eventObj.id == uuid;
    });

    index > -1 && this.callbacks[name].splice(index, 1);
    delete this.uuidLib[uuid];
  }

  static $emit(name, arg) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = [];
    }
    this.callbacks[name].forEach((fnWrap, index) => {
      const fn = fnWrap.fn;
      return Array.isArray(arg) ? fn(...arg) : fn(arg);
    });
  }
}
