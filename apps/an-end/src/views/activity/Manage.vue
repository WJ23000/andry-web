<template lang="pug">
  div.activity-manage
    div {{ title }}
    a-button.mt2(type="primary", @click="onEdit") 编辑
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class ActivityManage extends Vue {
	title = "活动管理";

  onEdit() {
		this.$router.push({
			name: "activityEdit",
			query: {
				id: "111"
			}
		});
	}
}
</script>

<style lang="stylus" scoped></style>
