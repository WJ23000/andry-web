<template lang="pug">
  div.activity-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class ActivityManage extends Vue {
	title = "活动管理";
}
</script>

<style lang="stylus" scoped></style>
