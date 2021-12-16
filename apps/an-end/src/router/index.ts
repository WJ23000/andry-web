import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageOutline from "@/login/src/views/view-outline/PageOutline.vue";
import Home from "@/login/src/views/home/Index.vue";
import About from "@/login/src/views/about/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		component: PageOutline,
		children: [
			{
				path: "/about",
				name: "about",
				component: About
			}
		]
	},
	{
		path: "/home",
		name: "home",
		component: Home
	}
];
const router = new VueRouter({
	routes
});

export default router;
