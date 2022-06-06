<template lang="pug">
  div.material-manage
    div {{ title }}
    a-button.mt2(type="primary", @click="onEdit") 编辑
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class MaterialManage extends Vue {
	title = "素材管理";

	onEdit() {
		this.$router.push({
			name: "materialEdit",
			query: {
				id: "111"
			}
		});
	}
}
</script>

<style lang="stylus" scoped></style>
