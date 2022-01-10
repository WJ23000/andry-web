import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageOutline from "@/an-front/src/views/view-outline/PageOutline.vue";
import Home from "@/an-front/src/views/home/Index.vue";
import About from "@/an-front/src/views/about/Index.vue";

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
