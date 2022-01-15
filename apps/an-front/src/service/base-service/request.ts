import Vue from "vue";
import { RequestBaseService } from "../commonAdapter";
import { message } from "ant-design-vue";

const RequestService = new RequestBaseService();
const FrontRequestService = RequestService;

RequestService.setResponseInterceptors(function(response) {
  // Do something with response data
  if (response.data) {
    const code = response.data.status;
    if (code && code !== 4000200) {
      const msg = response.data.message;
      msg && message.warning(msg);
      if (code === 4000403) {
        // token失效返回到登录页
        localStorage.clear();
        setTimeout(() => {
          console.log("跳回到登录页面");
          window.location.replace(`${Vue.prototype.$HOST["LOGIN"]}`);
        }, 1000);
        return;
      }

      if (msg == "没有权限") {
        Vue.prototype.$router.go(-1);
        return;
      }
      return Promise.reject(response);
    }
  }
});
export default RequestService.axios;

export { FrontRequestService };
