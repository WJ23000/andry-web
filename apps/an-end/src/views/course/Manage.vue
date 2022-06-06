<template lang="pug">
  div.course-manage
    div {{ title }}
    a-button.mt2(type="primary", @click="onEdit") 编辑
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class CourseManage extends Vue {
	title = "课程管理";

  onEdit() {
		this.$router.push({
			name: "courseEdit",
			query: {
				id: "111"
			}
		});
	}
}
</script>

<style lang="stylus" scoped></style>
