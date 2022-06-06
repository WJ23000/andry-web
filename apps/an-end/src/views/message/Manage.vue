<template lang="pug">
  div.message-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class MessageManage extends Vue {
	title = "消息管理";
}
</script>

<style lang="stylus" scoped></style>
