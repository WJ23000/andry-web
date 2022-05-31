<template lang="pug">
  div.activity-edit
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class ActivityEdit extends Vue {
	title = "活动编辑";
}
</script>

<style lang="stylus" scoped></style>
