<template lang="pug">
  div.order-edit
    div {{ title }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {}
})
export default class OrderEdit extends Vue {
	title = "订单编辑";
}
</script>

<style lang="stylus" scoped></style>
