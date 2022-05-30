import Vue from "vue";
import App from "./App.vue";
import router  from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import "./uiAdapter";
import "./styles/common.styl";
import axios from "axios";
import { RequestService, EndTokenVerifyService } from "@/an-end/src/service";

Vue.use(Antd);

Vue.config.productionTip = false;

// axios.get("./config.json").then(res => {
// 	const data = res.data;
// 	const BASE_API = data.BASE_API;
// 	Vue.prototype.$BASE_API = BASE_API;
// 	Vue.prototype.$NODE_API = data.NODE_API;
// 	Vue.prototype.$HOST = data.HOST;
// 	RequestService.defaults.baseURL = BASE_API;
// 	EndTokenVerifyService.setConfig({
// 		rentId: ""
// 	});
// 	EndTokenVerifyService.setRequest();

// 	EndTokenVerifyService.tokenAuth(() => {
// 		EndTokenVerifyService.saveUserPermissions(() => {
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
// 		});
// 	});
// });
