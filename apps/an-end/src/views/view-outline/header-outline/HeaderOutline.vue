<template lang="pug">
  div.header-outline.flex.column.h100
    Header
    a-config-provider(:locale="locale")
      router-view.overflow-y
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import Header from "./Header.vue";

@Component({
	components: {
		Header
	}
})
export default class HeaderOutline extends Vue {
	locale = zhCN;
}
</script>

<style lang="stylus" scoped></style>
