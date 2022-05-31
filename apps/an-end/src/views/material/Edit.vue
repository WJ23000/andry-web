<template lang="pug">
  div.material-edit
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class MaterialEdit extends Vue {
	title = "素材编辑";
}
</script>

<style lang="stylus" scoped></style>
