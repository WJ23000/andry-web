<template lang="pug">
  div.question-manage
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class QuestionManage extends Vue {
	title = "试题管理";
}
</script>

<style lang="stylus" scoped></style>
