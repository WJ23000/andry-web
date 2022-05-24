<template lang="pug">
  div.sidebar-outline.flex.row.flex1.align-start.w100
    Sidebar
    div.right-content.px4.w100.h100
      router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Sidebar } from "@/an-end/src/components";


@Component({
	components: {
		Sidebar
	}
})
export default class SidebarOutline extends Vue {

}
</script>

<style lang="stylus" scoped>
.sidebar-outline
  .right-content
    background #edf2f5
</style>
