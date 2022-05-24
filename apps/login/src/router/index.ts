import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageOutline from "@/login/src/views/view-outline/PageOutline.vue";
import Login from "@/login/src/views/Login.vue";
import About from "@/login/src/views/about/About.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		component: PageOutline,
		children: [
			{
				path: "/",
				name: "login",
				component: Login
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
