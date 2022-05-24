import RequestService, { EndRequestService } from "../base-service/request";
import { TokenVerifyService } from "../commonAdapter";
import { message } from "ant-design-vue";

export default class EndTokenVerifyService {
	static setConfig(config) {
		TokenVerifyService.setConfig(config);
	}

	static setRequest() {
		TokenVerifyService.setRequestService(EndRequestService);
	}

	static tokenAuth(fn: Function) {
		TokenVerifyService.tokenAuth({ url: "/admin/" }, fn);
	}

	static saveUserPermissions(fn) {
		console.log("获取权限");
		fn();
	}
}
