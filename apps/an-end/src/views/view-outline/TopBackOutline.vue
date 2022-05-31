<template lang="pug">
  div.top-back-outline.flex.row.flex1.align-start.w100
    a-layout.layout.h100
      a-layout-header.layout-header
        TopBackHeader
      a-layout-content.layout-content
        router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BaseSider from "@common/components/base-sider/BaseSider.vue";
import TopBackHeader from "./header-outline/TopBackHeader.vue"

@Component({
	components: {
		TopBackHeader
	}
})
export default class TopBackOutline extends Vue {}
</script>

<style lang="stylus" scoped>
.top-back-outline
  .layout
    background #e8ecf0 !important
  .layout-header
    padding 0
  .layout-content
    padding 20px
    background #ffffff
    min-height 280px
</style>
