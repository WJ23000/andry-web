<template lang="pug">
  div.tree(:style="getDetph")
    div.tree-item.flex.justify-between(
      draggable="true"
      @mouseenter="onMouseEnterNode", 
      @mouseleave="onMouseLeaveNode")
      div.tree-node.flex.flex1.pointer
        span(v-if="list", @click="onOpenNode")
          a-icon.minus.mr2(v-if="isShow", type="minus-square")
          a-icon.mr2(v-else, type="plus-square")
        a-input.flex1(
          ref="input",
          v-if="isEdit", 
          type="text", 
          v-model.trim="item.name", 
          :maxLength="16",
          @pressEnter="onInputEnter(item)",
          @blur="onInputBlur(item)")
        span.flex1.tree-name(
          v-else, 
          :title="item.name", 
          draggable="true", 
          @dragstart='dragNode($event, item)', 
          @drop='dropNode($event, item)') {{ item.name }} 
      div.pointer(v-if="isOption")
        a-icon.operater.ml2(v-if="detph != 2", type="plus-circle", @click="onAddNode(item)")
        a-icon.operater.ml2(v-if="detph != 0", type="form", @click="onEditNode(item,index)")
        a-icon.operater.ml2(v-if="detph != 0", type="delete", @click="onDeleteNode(item)")
    div.tree-children-item(
      v-if="isShow", 
      draggable="true", 

      @dragstart='dragNode($event, item)', 
      @drop='dropNode($event, item)')
      Tree(
        v-on="$listeners",
        :treeConfig="treeConfig",
        :name="item.name"
        :list="item.children"
        v-for="(item, tIndex) in list"
        :key="tIndex",
        :item="item",
        :index="tIndex",
        :detph="detph+1")
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Tree extends Vue {
  @Prop()
  treeConfig!: any;
  @Prop()
  name: any;
  @Prop()
  list: any;
  @Prop()
  item: any; // 当前节点
  @Prop()
  index: any; // 当前节点索引
  @Prop()
  detph: any; // 递归层级

  isShow = false; // 显示/隐藏节点
  isOption = false; // 是否可对节点操作
  isEdit = false; // 是否编辑

  @Watch("item.needEditName", { immediate: true })
  onNameChange(needEditName): void {
    needEditName && this.onEditNode();
  }

  get getDetph() {
    return `margin-left:${this.detph * 10}px`;
  }

  onOpenNode() {
    this.isShow = !this.isShow;
  }

  // 鼠标移入移出
  onMouseEnterNode() {
    if (this.treeConfig.mode == "read") return;
    this.isOption = true;
  }
  onMouseLeaveNode() {
    if (this.treeConfig.mode == "read") return;
    this.isOption = false;
  }

  // 节点操作
  onAddNode(item) {
    this.$emit("onAddNode", item);
  }
  onEditNode() {
    this.isEdit = true;
    this.inputFocus();
  }
  onDeleteNode(item) {
    this.$emit("onDeleteNode", item);
  }

  // input动态获取焦点
  inputFocus() {
    this.$nextTick(() => {
      (this.$refs as any).input.focus();
    });
  }
  // 编辑节点input回车
  onInputEnter(item) {
    this.$emit("onEditNode", item);
    this.isEdit = false;
  }
  // 编辑节点input失去焦点
  onInputBlur(item) {
    this.$emit("onEditNode", item);
    this.isEdit = false;
  }

  // 拖拽节点
  dragNode(event, item) {
    console.log("拖拽节点")
  }
  // 释放节点
  dropNode() {
    console.log("释放节点")
  }
}
</script>

<style scoped lang="stylus">
.tree {
  .tree-item {
    position: relative;
    line-height: 32px;
    padding: 0px 10px;
  }
  .tree-item:hover {
    background: rgba(233, 237, 250, 0.39);
    .tree-name {
      color: #5E7CE0
    }
  }
  .tree-item:before {
    position: absolute;
    left: -7px;
    width: 10px;
    height: 1px;
    margin: 0px 0px 0px 3px;
    border-top: 1px solid #d9d9d9;
    content: " ";
  }
  .tree-children-item {
    position: relative;
  }
  .tree-children-item:before {
    position: absolute;
    left: 12px;
    width: 1px;
    height: calc(100% - 16px);
    margin: 0px 0px 0px 3px;
    border-left: 1px solid #d9d9d9;
    content: " ";
  }
  .tree-node {
    overflow: hidden;
  }
  .minus {
    color: #5E7CE0;
  }
  .tree-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .operater:hover {
    color: #5E7CE0;
  }
}
</style>
