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
export default class UserManage extends Vue {

  title = "用户管理"
}
</script>

<style lang="stylus" scoped></style>
