<template lang="pug">
  div.about
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class About extends Vue {

  title = "关于平台"
}
</script>

<style lang="stylus" scoped></style>
