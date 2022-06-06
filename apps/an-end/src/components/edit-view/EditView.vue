<template lang="pug">
  div.edit-view.flex.flex1.align-start.w100
    a-layout.layout.h100
      a-layout-header.layout-header
        Header(:title="title")
          slot(name="header")
      a-layout-content.layout-content.overflow-y(:style="contentStyle")
        slot
      a-layout-footer.layout-footer(v-if="isFooter")
        slot(name="footer")
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { GlobalPropertyService } from "@/an-end/src/service";
import Header from "./components/Header.vue";

@Component({
	components: {
		Header
	}
})
export default class EditView extends Vue {
	globalProperty = GlobalPropertyService.getInstance();
	@Prop()
	title!: string;
	@Prop({ default: false })
	isFooter!: string;

	contentStyle = {};

	get contentMinH(): number {
		const standardH = this.globalProperty.clientHeight - 48 - 64;
		return standardH > 300 ? standardH : 300;
	}

	mounted() {
		this.setStyle();
	}

	async setStyle() {
		let footerH = 0;

		if (this.isFooter) {
			const footer = this.$refs.refNavFooter as any;
			footerH = footer ? footer.offsetHeight : 69;
		}

		this.contentStyle = {
			"min-height": `${this.contentMinH - footerH}px`,
			"max-height": `${this.contentMinH - footerH}px`
		};
	}
}
</script>

<style lang="stylus" scoped>
.edit-view
  .layout
    background #e8ecf0 !important
  .layout-header
    padding 0
  .layout-content
    padding 20px
    background #fffff
  .layout-footer
    padding 0px 20px
    height 68px
    line-height 68px
    background #ffffff
</style>
