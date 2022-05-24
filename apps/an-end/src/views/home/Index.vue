<template lang="pug">
  div.home
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
  }
})
export default class Home extends Vue {

  title = "后台"
  treeConfig = {
    isSearch: true,
    mode: "read",
    grade: 2
  }

  // 当前选中的节点
  onChangeCurrentNode(value) {
    console.log("当前选中节点", value);
  }
}
</script>

<style lang="stylus" scoped></style>
