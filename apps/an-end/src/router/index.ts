import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HeaderOutline from "@/an-end/src/views/view-outline/header-outline/HeaderOutline.vue";
import LeftSiderOutline from "@/an-end/src/views/view-outline/LeftSiderOutline.vue";
import Home from "@/an-end/src/views/home/Index.vue";
import About from "@/an-end/src/views/about/Index.vue";
import { userManageRouter } from "./user";
import { materialManageRouter, materialEditRouter } from "./material";
import { courseManageRouter, courseEditRouter } from "./course";
import { examManageRouter, examEditRouter } from "./exam";
import { activityManageRouter, activityEditRouter } from "./activity";
import { orderManageRouter, orderEditRouter } from "./order";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		component: HeaderOutline,
		children: [
			{
				path: "/",
				component: LeftSiderOutline,
				children: [
					{
						path: "/home",
						name: "home",
						component: Home
					},
					...userManageRouter,
					...materialManageRouter,
					...courseManageRouter,
					...examManageRouter,
					...activityManageRouter,
					...orderManageRouter
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
