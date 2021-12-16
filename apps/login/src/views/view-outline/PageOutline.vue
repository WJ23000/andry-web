<template lang="pug">
  div.page-outline
    Header
    a-config-provider(:locale="locale")
      router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import Header from "./components/Header.vue";

@Component({
	components: {
		Header
	}
})
export default class Home extends Vue {
	locale = zhCN;
}
</script>

<style lang="stylus" scoped></style>
