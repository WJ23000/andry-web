<template lang="pug">
  div.course-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class CourseManage extends Vue {
	title = "课程管理";
}
</script>

<style lang="stylus" scoped></style>
