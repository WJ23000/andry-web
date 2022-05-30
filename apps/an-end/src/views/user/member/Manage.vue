<template lang="pug">
  div.user-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
  }
})
export default class MemberManage extends Vue {

  title = "成员管理"
}
</script>

<style lang="stylus" scoped></style>
