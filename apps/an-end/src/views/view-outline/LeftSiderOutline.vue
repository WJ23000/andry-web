<template lang="pug">
  div.sidebar-outline.flex.row.flex1.align-start.w100
    a-layout.layout.h100(id="components-layout-demo-custom-trigger")
      BaseSider
      a-layout.layout
        a-layout-content.layout-content
          router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BaseSider from "@common/components/base-sider/BaseSider.vue";

@Component({
	components: {
		BaseSider
	}
})
export default class LeftSiderOutline extends Vue {}
</script>

<style lang="stylus" scoped>
.sidebar-outline
  .layout
    background #e8ecf0 !important
  .layout-content
    margin 20px
    padding 20px
    background #ffffff
    min-height 280px
</style>
