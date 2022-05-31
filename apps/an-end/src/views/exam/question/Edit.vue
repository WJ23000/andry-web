<template lang="pug">
  div.question-edit
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class QuestionEdit extends Vue {
	title = "试题编辑";
}
</script>

<style lang="stylus" scoped></style>
