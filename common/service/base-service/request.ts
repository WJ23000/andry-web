import axios, {
	AxiosInstance
} from "axios";
import BigIntJsonService from "./bigIntJson";
export class RequestBaseService {
	axios: AxiosInstance;
	type: "ict" | "tc" | "" = "";
	_requestInterceptors: Function | null = null;
	constructor() {
		this.axios = axios.create({
			transformResponse: [
				function(data) {
					if (data[0] == "{") {
						return BigIntJsonService.parse(data);
					} else {
						return data;
					}
				}
			]
			// withCredentials: true // 允许后端设置cookie
		});
	}
	static isBlob(data) {
		return Object.prototype.toString.call(data) === "[object Blob]";
	}
	setType(type) {
		this.type = type;
	}
	setRequestInterceptors(fn: Function) {
		this.axios.interceptors.request.use(
			config => {
				// 统一去除url中的 //
				config.url = config.url?.replace(/\/\//g, "/");
				fn && fn(config);
				return config;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
	}
	setResponseInterceptors(fn: Function) {
		this.axios.interceptors.response.use(
			response => {
				if (RequestBaseService.isBlob(response)) {
					return response;
				}
				const customRes = fn && fn(response);
				const res = response.data || response;
				return customRes || res;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
	}
}
