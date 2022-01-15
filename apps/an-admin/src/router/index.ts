import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageOutline from "@/an-admin/src/views/view-outline/PageOutline.vue";
import Home from "@/an-admin/src/views/home/Index.vue";
import About from "@/an-admin/src/views/about/Index.vue";

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

export default router;
