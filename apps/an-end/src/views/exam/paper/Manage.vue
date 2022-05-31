<template lang="pug">
  div.paper-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class PaperManage extends Vue {
	title = "试卷管理";
}
</script>

<style lang="stylus" scoped></style>
