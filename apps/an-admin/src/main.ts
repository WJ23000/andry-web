import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./uiAdapter";
import "./styles/common.styl";
import axios from "axios";
import { RequestService, AdminTokenVerifyService } from "@/an-admin/src/service";

Vue.config.productionTip = false;

axios.get("./config.json").then(res => {
	const data = res.data;
	const BASE_API = data.BASE_API;
	Vue.prototype.$BASE_API = BASE_API;
	Vue.prototype.$NODE_API = data.NODE_API;
	Vue.prototype.$HOST = data.HOST;
	RequestService.defaults.baseURL = BASE_API;
	AdminTokenVerifyService.setConfig({
		rentId: ""
	});
	AdminTokenVerifyService.setRequest();

	AdminTokenVerifyService.tokenAuth(() => {
		AdminTokenVerifyService.saveUserPermissions(() => {
			new Vue({
				router,
				store,
				render: h => h(App)
			}).$mount("#app");
		});
	});
});
