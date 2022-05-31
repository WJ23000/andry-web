<template lang="pug">
  div.page-header.flex.justify-start.px4
    img.logo(:src="logo")
    div.f2 怀宁智慧互连管理系统
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
  height 68px
  line-height 68px
  background #ffffff
  color #000000
  border-bottom 1px solid #edf2f5
  .logo 
    width 36px
    height 36px
    margin-right 12px
</style>
