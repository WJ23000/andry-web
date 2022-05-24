<template lang="pug">
  div.page-header.flex.justify-start.px4
    img.logo(:src="logo")
    div.f2 后台管理系统
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class PageHeader extends Vue {
  logo = require("../../../assets/andry.png");
}
</script>

<style lang="stylus" scoped>
.page-header
  width 100%
  height 48px
  line-height 48px
  background #000000
  color #ffffff
  border-bottom 1px solid #edf2f5
  .logo 
    width 30px
    height 30px
    margin-right 12px
</style>
