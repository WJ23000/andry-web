import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageOutline from "@/an-end/src/views/view-outline/PageOutline.vue";
import Home from "@/an-end/src/views/home/Index.vue";
import About from "@/an-end/src/views/about/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
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

export default router;
