<template lang="pug">
  div.top-back-outline.flex.flex1.align-start.w100
    router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class TopBackOutline extends Vue {}
</script>

<style lang="stylus" scoped></style>
