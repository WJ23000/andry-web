<template lang="pug">
  div.header.flex.justify-between.px4.pointer
    div.flex
      img.logo(:src="logo", @click="onRedirectHome")
      div.f2 后台管理系统
    div.right-content.flex
      a-badge.mr4(id="message", dot, @click="onShowMessage")
        a-icon(type="message")
      a-popover(
        placement="bottomRight", 
        trigger="hover", 
        overlayClassName="user-popover avatar-pop")
        template(slot="content")
          p.mb2(@click="onUserCenter") 用户中心
          p(@click="onExitLogin") 退出登录
        template(slot="title")
          div.flex
            a-avatar.avatar-bg-color.mr2 {{ userInitial }}
            span {{ userName }}
        div.avatar-content.flex
          a-avatar.mr1(:src="userAvatar")
          a-icon(type="down")
    //- 消息
    Message.hidden(
      :messageVisible="messageVisible", 
      @onHideMessage="onHideMessage", 
      @onMessageCenter="onMessageCenter")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Message } from "@/an-end/src/components";

@Component({
	components: {
		Message
	}
})
export default class PageHeader extends Vue {
	logo = require("../../../assets/andry.png");
	userAvatar = require("../../../assets/user.png");
	userName = "wj23000";
	messageVisible = false;
	wrapStyle = {
		top: "48px",
		boxShadow: "normal"
	};

	get userInitial() {
		return this.userName.substr(0, 1);
	}

	mounted() {
		// 监听除点击位置和目标位置外关闭消息中心
		document.addEventListener("click", e => {
			const messageNode = document.getElementById("message");
			const drawerNode = document.getElementById("drawer");
			const target: any = e.target;
			if (
				messageNode &&
				!messageNode.contains(target) &&
				drawerNode &&
				!drawerNode.contains(target)
			) {
				this.messageVisible = false;
			}
		});
	}

	onRedirectHome() {
		this.$router.push({
			path: "/"
		});
	}

	// 消息
	onShowMessage() {
		this.messageVisible = this.messageVisible ? false : true;
	}
	onHideMessage(value) {
		this.messageVisible = value;
	}
	onMessageCenter() {
		this.$router.push({
			name: "messageManage"
		});
	}

	// 用户中心
	onUserCenter() {
		console.log("用户中心");
	}

	// 退出登录
	onExitLogin() {
		window.location.replace(`${Vue.prototype.$HOST["LOGIN"]}`);
	}
}
</script>

<style lang="stylus" scoped>
.header
  width 100%
  height 48px
  line-height 48px
  background #ffffff
  color #000000
  z-index 999
  box-shadow 0px -16px 12px 10px #000000
  .logo
    width 30px
    height 30px
    margin-right 12px
.avatar-bg-color
  background-color #2abfe3
.avatar-content
  color #999999
.avatar-content:hover, p:hover
  color #1890ff
p
  cursor pointer
</style>
