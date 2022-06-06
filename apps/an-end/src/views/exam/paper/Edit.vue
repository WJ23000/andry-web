<template lang="pug">
  div.paper-edit
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class PaperEdit extends Vue {
	title = "试卷编辑";
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
