<template lang="pug">
  div.echart-container.w100.h100(
    ref="echart")
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import * as echarts from "echarts";

@Component({
	components: {}
})
export default class Echart extends Vue {
	@Prop()
	option: any;

	echartData: any = "";

	@Watch("option")
	onOptionChange() {
		this.echartData.clear(); // 消除当前实例，重新渲染
		this.echartData && this.echartData.setOption(this.option, true);
	}

	mounted() {
		const dom = this.$refs.echart;
		this.echartData = echarts.init(dom as HTMLElement);
		this.echartData.clear(); // 消除当前实例，重新渲染
		this.echartData.setOption(this.option, true);
		window.addEventListener("resize", () => {
			(this.echartData as any).resize();
		});
	}
}
</script>

<style scoped lang="stylus" scoped></style>
