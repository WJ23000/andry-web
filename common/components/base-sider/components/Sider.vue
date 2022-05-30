<template lang="pug">
div.sidebar-child
  a-sub-menu(
    :key="menuInfo.path")
    span(slot="title")
      i(:class="menuInfo.icon")
      span {{ menuInfo.title }}
    template(v-for="item in menuInfo.children")
      a-menu-item(v-if="!item.children", :key="item.path")
        i(:class="item.icon")
        span {{ item.title }}
      sub-menu(v-else, :key="item.path", :menu-info="item")
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
	components: {}
})
export default class SidebarChild extends Vue {
	@Prop()
	menuInfo;

	isSubMenu = true;

  created(){
    console.log("数据", this.menuInfo)
  }
}
</script>

<style lang="stylus" scoped></style>
