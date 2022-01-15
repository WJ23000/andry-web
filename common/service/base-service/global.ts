import { getStorage } from "@common/utils";
import { STORAGE_CONFIG } from "@common/model/data";
import debounce from "@common/utils/debounce";
import { isBrowser } from "@common/utils/browserCore";

export class GlobalProperty {
  clientHeight: any = 0;
  client: any = document.documentElement || document.body;
  previewDialogWidth = 900;
  userId: string = getStorage(STORAGE_CONFIG.LOGIN_USER).id;
  clientWidth: any = 0;
  constructor() {
    this.clientHeight = this.client.clientHeight;
    this.clientWidth = this.client.clientWidth;
    this.setPreviewDialogWidth();
    window.addEventListener(
      "resize",
      debounce(res => {
        this.clientHeight = this.client.clientHeight;
        this.setPreviewDialogWidth();
      }, 50)
    );
  }

  setPreviewDialogWidth(): void {
    this.previewDialogWidth = this.clientHeight < 650 ? 700 : 900;
  }
}

export class GlobalPropertyService {
  static globalProperty: GlobalProperty;
  static getInstance() {
    if (!GlobalPropertyService.globalProperty) {
      GlobalPropertyService.globalProperty = new GlobalProperty();
      return GlobalPropertyService.globalProperty;
    }
    return GlobalPropertyService.globalProperty;
  }
  static getBrowser() {
    const browser = isBrowser();
    return browser;
  }
}

export class GlobalFunctionService {
  // 设置antd a-select 定位函数
  static getPopupContainer(triggerNode) {
    return triggerNode.parentNode || document.body;
  }
}

export abstract class BaseAbstractService {
  static request;

  static setRequest(request) {
    // console.log("BaseAbstractService", BaseAbstractService);
    if (!this.request) {
      this.request = request;
    }
  }
}