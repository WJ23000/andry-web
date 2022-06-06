<template lang="pug">
  div.paper-manage
    div {{ title }}
    a-button.mt2(type="primary", @click="onEdit") 编辑
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class PaperManage extends Vue {
	title = "试卷管理";

  onEdit() {
		this.$router.push({
			name: "paperEdit",
			query: {
				id: "111"
			}
		});
	}
}
</script>

<style lang="stylus" scoped></style>
