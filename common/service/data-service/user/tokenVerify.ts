import Vue from "vue";
import { getQstr } from "@common/utils/urlUtils";
import { getStorage, setStorage } from "@common/utils/storage";
import { STORAGE_CONFIG } from "@common/model/data";
import { message } from "ant-design-vue";

export class TokenVerifyService {
	static _requestService: any = "";
	static _config: any = {
		rentId: ""
	};

	static setRequestService(requestService) {
		this._requestService = requestService;
	}

	static setConfig(config) {
		this._config = config;
	}

	// 获取accessToken
	static getAccessToken(refreshToken, fn) {
		TokenVerifyService.setRequest(fn);
	}

	// 检查accessToken是否过期
	static checkTokenExpired(fn) {
		TokenVerifyService.setRequest(fn);
	}

	static setRequest(fn?) {
		const token = getStorage(STORAGE_CONFIG.TOKEN);
		const groupId = getStorage(STORAGE_CONFIG.GROUP_ID);
		const applicationKey = getStorage(STORAGE_CONFIG.APPLICATION_KEY);
		if (token) {
			TokenVerifyService._requestService.setRequestInterceptors(function(
				config
			) {
				if (token) {
					config.headers["access_token"] = token;
					config.headers["group_id"] = groupId ? groupId : "";
					config.headers["application_key"] = applicationKey;
					config.headers["grant_type"] = "password";
				}
				config.headers["Cache-Control"] = "no-cache";
				config.headers["Pragma"] = "no-cache";
				config.headers["rentId"] = TokenVerifyService._config.rentId || "ANDRY";
				config.headers.endpoint = "PC";
				return config;
			});
			fn && fn();
		}
	}

	static async tokenAuth({ url }, fn: Function) {
		// TokenVerifyService.setRequest(fn);
		// window.history.replaceState({}, "", url);
		fn && fn();
		return;
	}
}
