<template lang="pug">
  div.top-back-header.flex.justify-start.px4
    a-icon.f2.mr3(type="left", @click="onBack")
    div.f4 返回
    slot
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class TopBackHeader extends Vue {
	onBack() {
		this.$router.back();
	}
}
</script>

<style lang="stylus" scoped>
.top-back-header
  width 100%
  height 64px
  line-height 64px
  background #ffffff
  color #000000
  border-bottom 1px solid #e8ecf0
</style>
