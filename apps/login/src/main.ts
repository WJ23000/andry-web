import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./uiAdapter";
import "./styles/common.styl";
import axios from "axios";
import { RequestService } from "@/login/src/service";

Vue.config.productionTip = false;

axios.get("./config.json").then(res => {
  const data = res.data;
  const BASE_API = data.BASE_API;
  Vue.prototype.$BASE_API = data.BASE_API;
  Vue.prototype.$HOST = data.HOST;
  Vue.prototype.$IS_PRIVATE = data.IS_PRIVATE;
  RequestService.defaults.baseURL = BASE_API;
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
