<template lang="pug">
  div.class-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
  }
})
export default class ClassMange extends Vue {

  title = "班级管理"
}
</script>

<style lang="stylus" scoped></style>
