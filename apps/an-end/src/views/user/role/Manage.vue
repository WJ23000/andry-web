<template lang="pug">
  div.role-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class RoleManage extends Vue {
	title = "角色管理";
}
</script>

<style lang="stylus" scoped></style>
