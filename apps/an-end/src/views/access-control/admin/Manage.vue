<template lang="pug">
  div.admin-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
  }
})
export default class AdminManage extends Vue {

  title = "管理员管理"
}
</script>

<style lang="stylus" scoped></style>
