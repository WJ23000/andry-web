<template lang="pug">
div.message
  a-drawer(
    id="drawer",
    placement="right",
    :mask="false",
    width="360",
    :zIndex="99",
    :wrap-style="wrapStyle",
    :visible="messageVisible",
    @close="onHideMessage")
    template(slot="title")
      div.flex 
        span.mr4 未读消息
        a-button(size="small", @click="onMessageCenter") 进入消息中心
    div.message-content
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
	name: "Sider",
	components: {}
})
export default class Message extends Vue {
	@Prop({ default: false })
	messageVisible;
	wrapStyle = {
		top: "48px",
		boxShadow: "normal"
	};

	onHideMessage() {
		this.$emit("onHideMessage", false);
	}

	onMessageCenter() {
		this.$emit("onMessageCenter");
	}
}
</script>

<style lang="stylus" scoped></style>
