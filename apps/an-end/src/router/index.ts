import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HeaderOutline from "@/an-end/src/views/view-outline/HeaderOutline.vue";
import SidebarOutline from "@/an-end/src/views/view-outline/SidebarOutline.vue";
import Home from "@/an-end/src/views/home/Index.vue";
import About from "@/an-end/src/views/about/Index.vue";
import { accessControlRouter } from "./access-control";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		component: HeaderOutline,
		children: [
			{
				path: "/",
				component: SidebarOutline,
				children: [
					{
						path: "/",
						name: "home",
						component: Home
					},
					...accessControlRouter
				]
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
	return VueRouterPush.call(this, to).catch(err => err);
};

export default router;
