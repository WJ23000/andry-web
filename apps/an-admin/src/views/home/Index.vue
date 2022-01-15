<template lang="pug">
  div.home
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class Home extends Vue {

  title = "后台"
}
</script>

<style lang="stylus" scoped></style>
