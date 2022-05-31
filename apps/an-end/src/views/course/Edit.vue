<template lang="pug">
  div.course-edit
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class CourseEdit extends Vue {
	title = "课程编辑";
}
</script>

<style lang="stylus" scoped></style>
