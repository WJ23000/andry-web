<template lang="pug">
	div.base-sider
		a-layout-sider(
			theme="light", 
			v-model="collapsed", 
			:trigger="null", 
			collapsible)
			a-menu(
				:inlineIndent="inlineIndent",
				:defaultSelectedKeys="defaultSelectedKeys",
				:openKeys="openKeys",
				mode="inline",
				:inline-collapsed="collapsed",
				@openChange="onOpenChange",
				@click="menuClick")
				template(v-for="item in menuList")
					a-menu-item(v-if="!item.children", :key="item.path")
						a-icon(v-if="item.icon", :type="item.icon")
						span {{ item.title }}
					Sider(v-else, :key="item.path", :menuInfo="item")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Sider  from "./components/Sider.vue"

@Component({
	components: {
		Sider
	}
})
export default class BaseSider extends Vue {
	// 菜单缩进
	inlineIndent = 22;
	// 默认不折叠
	collapsed = false;
	// 全部顶级父节点,用来控制所有父级菜单只展开其中的一项，可用遍历菜单信息进行赋值
	rootSubmenuKeys = ["/", "/user", "/content", "/business"];
	// 展开的父菜单项
	openKeys: string[] = [];
	menuList = [
		{
			id: "sub1",
			title: "首页",
			icon: "home",
			path: "/"
		},
		{
			id: "sub1",
			title: "访问控制",
			icon: "desktop",
			path: "/user",
			children: [
				{
					id: 1,
					parentId: "sub1",
					title: "权限管理",
					icon: "",
					path: "/user/role-manage"
				},
				{
					id: 2,
					parentId: "sub1",
					title: "管理员管理",
					icon: "",
					path: "/user/admin-manage"
				},
				{
					id: 3,
					parentId: "sub1",
					title: "用户管理",
					icon: "",
					path: "/user/member-manage"
				},
				{
					id: 4,
					parentId: "sub1",
					title: "班级管理",
					icon: "",
					path: "/user/class-manage"
				}
			]
		},
		{
			id: "sub2",
			title: "内容管理",
			icon: "appstore",
			path: "/content",
			children: [
				{
					id: 5,
					parentId: "sub2",
					title: "素材管理",
					icon: "",
					path: "/material/manage"
				},
				{
					id: 6,
					parentId: "sub2",
					title: "课程管理",
					icon: "",
					path: "/course/manage"
				},
				{
					id: "sub3",
					parentId: "sub2",
					title: "考试管理",
					icon: "",
					path: "/exam",
					children: [
						{
							id: 7,
							parentId: "sub3",
							title: "试题管理",
							icon: "",
							path: "/question/manage"
						},
						{
							id: 8,
							parentId: "sub3",
							title: "试卷管理",
							icon: "",
							path: "/paper/manage"
						}
					]
				}
			]
		},
		{
			id: "sub4",
			title: "运营管理",
			icon: "calendar",
			path: "/business",
			children: [
				{
					id: 10,
					parentId: "sub4",
					title: "活动管理",
					icon: "",
					path: "/activity/manage"
				},
				{
					id: 11,
					parentId: "sub4",
					title: "订单管理",
					icon: "",
					path: "/order/manage"
				}
			]
		}
	];

	// 选中的子菜单项
	get defaultSelectedKeys() {
		return [this.$route.path];
	}
	created() {
		console.log(this.$route.path, this.$route);

		// 将从缓存中取出openKeys
		const openKeys = window.sessionStorage.getItem("openKeys");
		if (openKeys) {
			// 存在即赋值
			this.openKeys = JSON.parse(openKeys);
		}
	}

	// 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
	menuClick({ item, key, keyPath }) {
		// 获取到当前的key,并且跳转
		this.$router.push({
			path: key
		});
	}
	onOpenChange(openKeys) {
		// 将当前打开的父级菜单存入缓存中
		window.sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
		//  控制只打开一个
		const latestOpenKey = openKeys.find(
			key => this.openKeys.indexOf(key) === -1
		);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.openKeys = openKeys;
		} else {
			this.openKeys = latestOpenKey ? [latestOpenKey] : [];
		}
	}
}
</script>

<style lang="stylus" scoped>
.base-sider
	background #ffffff
	.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected
		background #f6f7fb
</style>
