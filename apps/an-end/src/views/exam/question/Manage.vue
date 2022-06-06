<template lang="pug">
  div.question-manage
    div {{ title }}
    a-button.mt2(type="primary", @click="onEdit") 编辑
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class QuestionManage extends Vue {
	title = "试题管理";

	onEdit() {
		this.$router.push({
			name: "questionEdit",
			query: {
				id: "111"
			}
		});
	}
}
</script>

<style lang="stylus" scoped></style>
