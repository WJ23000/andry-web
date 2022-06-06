<template lang="pug">
  div.order-edit.flex.flex1.align-start.w100
    EditView(:title="title", :isFooter="true")
      template(slot="header")
        a-button.f5(size="small") 报表统计
      div {{ 1 }}
      template(slot="footer")
        a-button.mr4(type="primary", @click="onConfirm") 确定
        a-button(@click="onCancel") 取消
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { EditView } from "@/an-end/src/components";

@Component({
	components: {
		EditView
	}
})
export default class OrderEdit extends Vue {
	title = "NO0001";
	content = "正文";

	onConfirm() {
		console.log("确定");
	}
	onCancel() {
		console.log("取消");
		this.$router.back();
	}
}
</script>

<style lang="stylus" scoped></style>
