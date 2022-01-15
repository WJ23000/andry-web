<template lang="pug">
  div.page-header
    div 顶部栏
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class PageHeader extends Vue {
}
</script>

<style lang="stylus" scoped>
.page-header
  width 100%
  height 48px
  line-height 48px
  background #000000
  color #ffffff
  text-align center
</style>
