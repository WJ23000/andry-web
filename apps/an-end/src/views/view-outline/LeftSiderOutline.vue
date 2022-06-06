<template lang="pug">
  div.left-sider-outline.flex.row.flex1.align-start.w100
    a-layout.layout.h100
      BaseSider(:menuList="menuList")
      a-layout.layout
        a-layout-content.layout-content
          router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BaseSider } from "@/an-end/src/components";

@Component({
	components: {
		BaseSider
	}
})
export default class LeftSiderOutline extends Vue {
	baseMenuList = [
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
			path: "/control",
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

	messageMenuList = [
		{
			id: "sub1",
			title: "消息管理",
			icon: "",
			path: "/message/manage"
		},
		{
			id: "sub2",
			title: "消息设置",
			icon: "",
			path: "/message/setting"
		}
	];

	// 根据功能划分初始化左侧菜单
	get menuList() {
		const messageType = this.$route.path.includes("message");
		return messageType ? this.messageMenuList : this.baseMenuList;
	}
}
</script>

<style lang="stylus" scoped>
.left-sider-outline
  .layout
    background #e8ecf0 !important
  .layout-content
    margin 20px
    padding 20px
    background #ffffff
    min-height 280px
</style>
