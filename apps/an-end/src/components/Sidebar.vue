<template lang="pug">
  div.sidebar
    a-menu(
      mode="inline",
      :open-keys="openKeys", 
      style="width: 256px", 
      @openChange="onOpenChange")
      a-sub-menu(key="sub1")
        span(slot="title")
          a-icon(type="home")
          span 访问控制
        a-menu-item(key="1") 权限管理
        a-menu-item(key="2") 管理员管理
        a-menu-item(key="3") 用户管理
        a-menu-item(key="4") 班级管理
      a-sub-menu(key="sub2")
        span(slot="title")
          a-icon(type="appstore")
          span 内容管理
        a-menu-item(key="5") 素材管理
        a-menu-item(key="6") 课程管理
        a-sub-menu(key="sub3" title="考试管理")
          a-menu-item(key="7") 试题管理
          a-menu-item(key="8") 试卷管理
      a-sub-menu(key="sub4")
        span(slot="title")
          a-icon(type="calendar")
          span 运营管理
        a-menu-item(key="9") 广告管理
        a-menu-item(key="10") 活动管理
        a-menu-item(key="11") 订单管理
        a-menu-item(key="12") 用户管理
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class Sidebar extends Vue {
	rootSubmenuKeys: string[] = [];
	openKeys: string[] = [];

	onOpenChange(openKeys) {
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

<style lang="stylus" scoped></style>
