<template lang="pug">
  div.order-manage
    div {{ title }}
    a-button.mt2(type="primary", @click="onEdit") 编辑
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class OrderManage extends Vue {
	title = "订单管理";

	onEdit() {
		this.$router.push({
			name: "orderEdit",
			query: {
				id: "111"
			}
		});
	}
}
</script>

<style lang="stylus" scoped></style>
