import RequestService, { AdminRequestService } from "../base-service/request";
import { TokenVerifyService } from "../commonAdapter";
import { message } from "ant-design-vue";

export default class AdminTokenVerifyService {
	static setConfig(config) {
		TokenVerifyService.setConfig(config);
	}

	static setRequest() {
		TokenVerifyService.setRequestService(AdminRequestService);
	}

	static tokenAuth(fn: Function) {
		TokenVerifyService.tokenAuth({ url: "/admin/" }, fn);
	}

	static saveUserPermissions(fn) {
		console.log("获取权限");
		fn();
	}
}
