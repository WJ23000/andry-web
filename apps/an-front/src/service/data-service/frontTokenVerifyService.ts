import RequestService, { FrontRequestService } from "../base-service/request";
import { TokenVerifyService } from "../commonAdapter";
import { message } from "ant-design-vue";

export default class FrontTokenVerifyService {
	static setConfig(config) {
		TokenVerifyService.setConfig(config);
	}

	static setRequest() {
		TokenVerifyService.setRequestService(FrontRequestService);
	}

	static tokenAuth(fn: Function) {
		TokenVerifyService.tokenAuth({ url: "/" }, fn);
	}

	static saveUserPermissions(fn) {
		console.log("获取权限");
		fn();
	}
}
