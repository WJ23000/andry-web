<template lang="pug">
  div.material-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class MaterialManage extends Vue {
	title = "素材管理";
}
</script>

<style lang="stylus" scoped></style>
