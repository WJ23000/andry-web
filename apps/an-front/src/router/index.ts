import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageOutline from "@/an-front/src/views/view-outline/PageOutline.vue";
import Home from "@/an-front/src/views/home/Index.vue";
import About from "@/an-front/src/views/about/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "root",
		component: PageOutline,
		children: [
			{
				path: "/",
				name: "home",
				component: Home
			}
		]
	},
	{
		path: "/about",
		name: "about",
		component: About
	}
];
const router = new VueRouter({
	routes
});

// 处理去往的路由跟上次进入的路由相同
const VueRouterPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

// 路由前置钩子判断路由是否需要登录
// router.beforeEach((to, from, next) => { 
//   if (to.matched.some((record) => record.meta.auth)) {
//     if (GlobalUserInfoService.getUserInfo()) {
//       next();
//     } else {
//       next({
//         path: "/login",
//         query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
