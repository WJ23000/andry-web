<template lang="pug">
  div.header.flex.justify-between.px4
    div.flex
      img.logo(:src="logo")
      div.f2 后台管理系统
    div.right-content.pointer
      a-popover(
        placement="bottomRight", 
        trigger="hover", 
        overlayClassName="user-popover avatar-pop")
        template(slot="content")
          p.mb2(@click="onUserCenter") 用户中心
          p(@click="onExitLogin") 退出登录
        template(slot="title")
          div.flex
            a-avatar.avatar-color.mr2 {{ userInitial }}
            span {{ userName }}
        a-avatar(:src="userAvatar")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class PageHeader extends Vue {
	logo = require("../../../assets/andry.png");
	userAvatar = require("../../../assets/user.png");
	userName = "wj23000";

	get userInitial() {
		return this.userName.substr(0, 1);
	}

	onUserCenter() {
		console.log("用户中心");
	}

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
.avatar-color
  background-color #2abfe3
p
  cursor pointer
</style>
