<template lang="pug" functional>
a-sub-menu(:key="props.menuInfo.path")
  span(slot="title")
    a-icon(v-if="props.menuInfo.icon", :type="props.menuInfo.icon")
    span {{ props.menuInfo.title }}
  template(v-for="item in props.menuInfo.children")
    a-menu-item(v-if="!item.children", :key="item.path")
      a-icon(v-if="item.icon", :type="item.icon")
      span {{ item.title }}
    Sider(v-else, :key="item.path", :menuInfo="item")
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
	name: "Sider",
	components: {}
})
export default class Sider extends Vue {
	@Prop()
	menuInfo;
}
</script>

<style lang="stylus" scoped></style>
