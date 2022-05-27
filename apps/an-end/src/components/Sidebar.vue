<template lang="pug">
div.sidebar
  a-menu(
    :inlineIndent="inlineIndent",
    :defaultSelectedKeys="defaultSelectedKeys",
    :openKeys="openKeys",
    mode="inline",
    :inline-collapsed="collapsed",
    @openChange="onOpenChange",
    @click="menuClick")
    template(v-for="item in menuList")
      a-menu-item(v-if="!item.subMenu", :key="item.path")
        a-icon(:type="item.icon")
        span {{ item.title }}
      a-sub-menu(v-else, :key="item.path")
        span(slot="title")
          a-icon(:type="item.icon")
          span {{ item.title }}
        template(v-for="vv in item.subMenu")
          a-menu-item(v-if="!vv.subMenu", :key="vv.path")
            a-icon(:type="vv.icon")
            span {{ vv.title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class Sidebar extends Vue {
	// 菜单缩进
	inlineIndent = 12;
	// 默认不折叠
	collapsed = false;
	// 全部顶级父节点,用来控制所有父级菜单只展开其中的一项，可用遍历菜单信息进行赋值
	rootSubmenuKeys = ["/", "/1", "/2"];
	// 展开的父菜单项
	openKeys: any = [];
	// 选中的子菜单项
	defaultSelectedKeys = [this.$route.path];
	menuList = [
		{
			id: "sub1",
			title: "访问控制",
			icon: "home",
			path: "/",
			subMenu: [
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
					path: "/user/user-manage"
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
			path: "/1",
			subMenu: [
				{
					id: 5,
					parentId: "sub2",
					title: "素材管理",
					icon: "",
					path: "/1-1"
				},
				{
					id: 6,
					parentId: "sub2",
					title: "课程管理",
					icon: "",
					path: "/1-2"
				},
				{
					id: "sub3",
					parentId: "sub2",
					title: "考试管理",
					icon: "",
					path: "/1-3",
					subMenu: [
						{
							id: 7,
							parentId: "sub3",
							title: "试题管理",
							icon: "",
							path: "/1-3-1"
						},
						{
							id: 8,
							parentId: "sub3",
							title: "试卷管理",
							icon: "",
							path: "/1-3-2"
						}
					]
				}
			]
		},
		{
			id: "sub4",
			title: "运营管理",
			icon: "calendar",
			path: "/2",
			subMenu: [
				{
					id: 9,
					parentId: "sub4",
					title: "广告管理",
					icon: "",
					path: "/2-1"
				},
				{
					id: 10,
					parentId: "sub4",
					title: "活动管理",
					icon: "",
					path: "/2-1"
				},
				{
					id: 11,
					parentId: "sub4",
					title: "订单管理",
					icon: "",
					path: "/2-3"
				},
				{
					id: 12,
					parentId: "sub4",
					title: "用户管理",
					icon: "",
					path: "/2-4"
				}
			]
		}
	];

	created() {
		// 取出openKeys展开当前父节点
		const openKeys = window.sessionStorage.getItem("openKeys");
		if (openKeys) {
			this.openKeys = JSON.parse(openKeys);
		}
	}

	// 点击菜单，路由跳转，注意的是当点击MenuItem才会触发此函数
	menuClick({ item, key, keyPath }) {
		// 获取到当前的key,并且跳转
		this.$router.push({
			path: key
		});
		this.saveKeyPath(keyPath);
	}

	// 展开/收起
	onOpenChange(openKeys) {
		// 控制当前只打开一个父节点
		const latestOpenKey = openKeys.find(
			key => this.openKeys.indexOf(key) === -1
		);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.openKeys = openKeys;
		} else {
			this.openKeys = latestOpenKey ? [latestOpenKey] : [];
		}
	}

	// 存储当前点击的父节点
	saveKeyPath(keyPath) {
		window.sessionStorage.setItem("openKeys", JSON.stringify([keyPath.pop()]));
	}
}
</script>

<style lang="stylus" scoped></style>
