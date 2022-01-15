import { RequestBaseService } from "../commonAdapter";
import { message } from "ant-design-vue";
import { getStorage } from "@common/utils/storage";

const RequestService = new RequestBaseService();
const LoginRequestService = RequestService;

RequestService.setRequestInterceptors(function(config) {
	const token = getStorage("accessToken");
	// 登录之前调用的接口headers不需要传token
	const isLogin =
		config.url == "service-user/api/v1/user/pwd/login" ||
		config.url == "service-user/api/v1/user/register";
	if (token) {
		config.headers["access_token"] = isLogin ? "" : token;
		config.headers["group_id"] = getStorage("groupId");
		config.headers["application_key"] = "xxxx-xxxx-xxxx-xxxx";
		config.headers["grant_type"] = "password";
	}
	config.headers["Cache-Control"] = "no-cache";
	config.headers["Pragma"] = "no-cache";
	config.headers["rentId"] = "ANDRY";
	config.headers.endpoint = "LOGIN";
	return config;
});

RequestService.setResponseInterceptors(function(response) {
	if (response.data) {
		const code = response.data.status;
		if (code && code !== 4000200) {
			const msg = response.data.message;
			msg && message.warning(msg);
			return Promise.reject(response);
		}
	}
});

export default RequestService.axios;

export { LoginRequestService };
