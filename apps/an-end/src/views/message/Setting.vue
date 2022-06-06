<template lang="pug">
  div.message-setting
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class MessageSetting extends Vue {
	title = "消息设置";
}
</script>

<style lang="stylus" scoped></style>
