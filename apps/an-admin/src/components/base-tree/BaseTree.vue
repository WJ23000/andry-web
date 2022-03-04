<template lang="pug">
  div.base-tree.p4.h100
    a-input-search.mb3(
      v-show="treeConfig.isSearch",
      placeholder="请输入关键字",
      @search="onSearchTree",
      allowClear)
    //- div.flex.justify-between.mb3
    //-   div 全部
    //-   a-icon(type="plus-circle",@click="addTreeNode")
    div.tree
      div(v-for="(item, index) in treeList")
        Tree(
          :treeConfig="treeConfig"
          :name="item.name", 
          :list="item.children",
          :item="item",
          :index="index", 
          :detph="0",
          @onAddNode="onAddNode",
          @onEditNode="onEditNode",
          @onDeleteNode="onDeleteNode")
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Tree from "./components/Tree.vue";

@Component({
  components: {
    Tree
  }
})
export default class BaseTree extends Vue {
  @Prop()
  treeConfig!: any;

  treeList: any = [
    {
      id: "",
      name: "全部",
      children: [
        {
          pid: "",
          id: 1,
          name: "父节点1",
          children: [
            {
              pid: 1,
              id: 11,
              name: "子节点1"
            },
            {
              pid: 1,
              id: 12,
              name: "子节点2"
            }
          ]
        },
        {
          pid: 1000,
          id: 2,
          name: "父节点2",
          children: [
            {
              pid: 2,
              id: 21,
              name: "子节点3",
              children: [
                {
                  pid: 21,
                  id: 31,
                  name: "孙子节点4"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // 新建需要默认聚焦
  needEditNameId = "";

  // 搜索
  onSearchTree(value) {
    console.log("搜索", value);
  }

  onAddNode(item) {
    console.log("当前节点", item)
    this.treeList[0].children[0].children.push({
      id: "022",
      name: "未命名"
    })
    this.needEditNameId = "022";
    this.resetTreeList();
  }
  onEditNode(item) {
    console.log("编辑节点", item);
  }
  onDeleteNode(item) {
    console.log("删除节点", item);
  }

  // 节点遍历
  findNode(currentNode, treeList) {
    const parentData: any= []
    for (let i = 0; i < treeList.length; i++) {
      if (treeList[i].id == currentNode.pid) {
        parentData.push(treeList[i]);
        // 用当前节点再去原数据查找当前节点的父节点
        this.findNode(treeList[i], treeList);
        break;
      } else {
        if (treeList[i].children instanceof Array) {
          //	没找到，遍历该节点的子节点
          this.findNode(currentNode, treeList[i].children);
        }
      }
    }
    return parentData;
  }

  // 递归添加树形控件辅助属性
  resetTreeList(list: any = this.treeList): void {
    const treeObj = {};
    list.forEach((item, index) => {
      // 设置焦点
      if (this.needEditNameId == item.id) {
        this.needEditNameId = "";
        this.setNeedEditName(treeObj);
      }
      Object.assign(item, treeObj);
      // 递归
      if (item.children) {
        return this.resetTreeList(item.children);
      }
    });
  }

  setNeedEditName(obj): void {
    Object.assign(obj, { needEditName: true });
  }
}
</script>

<style scoped lang="stylus">
.base-tree {
  min-width: 40px;
  .tree {
    color: #575D6C;
    font-size: 12px;
  }
  .parent-node {
    padding: 7px 8px 0px 8px;
    line-height: 30px;
  }
  .children-node {
    padding: 0px 8px;
    margin-left: 22px;
  }
  .parent-node-content {
    padding: 0px 8px;
  }
  .parent-node-content:hover, .children-node:hover{
    padding: 0px 8px;
    background: rgba(233, 237, 250, 0.39);
    color: #5E7CE0;
  }
  .active {
    padding: 7px 8px;
    background: rgba(233, 237, 250, 0.39);
    color: #5E7CE0;
  }
}
</style>
