<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-06 01:11:12
 * @Description: 
-->
<template>
  <a-card>
    <a-row>
      <a-col :sm="24" :mg="12" :lg="6">
        <a-space>
          <a-dropdown-button type="primary">
            新建
            <a-menu slot="overlay">
              <a-menu-item key="1"> <a-icon type="folder-add" />添加目录</a-menu-item>
              <a-menu-item key="2"> <a-icon type="file-add" />添加文件</a-menu-item>
            </a-menu>
            <a-icon slot="icon" type="plus-circle" />
          </a-dropdown-button>
          <a-button type="primary" style="background: #4ba47c" icon="download" >
            下载
          </a-button>
          <a-button type="primary" style="background: #4ba47c" icon="upload">
            上传
          </a-button>
          <a-button type="primary" style="background: #4ba47c" icon="retweet">
            移动
          </a-button>
           <a-button type="danger" icon="delete">
            删除
          </a-button>
        </a-space>
      </a-col>
      <a-col :mg="12" :lg="6" push="12">
        <a-input-search placeholder="input search text" enter-button />
      </a-col>
    </a-row>
    <a-divider></a-divider>
     <a-row :gutter="[0, 24]">
        <a-col :md="24" :lg="24" :sm="24">
           <!-- <a-tree style="text-align:left; font-size: 20px" :tree-data="treeData" @select="onSelect"> 
             <a-icon slot="smile" type="smile-o" />
           </a-tree> -->
          <a-tree style="text-align:left; font-size: 16px" :load-data="loadData" :tree-data="treeData" :show-icon="true" @select="onSelect" @expand="onExpand">
            <a-icon slot="switcherIcon" type="a"></a-icon>
            <a-icon slot="open-folder" type="folder-open" />
            <a-icon slot="folder" type="folder" /> 
          </a-tree>
        </a-col>
      </a-row>
  </a-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Card, Row, Col, Button as Buttons, Icon, Space, Input, Dropdown, Menu, Tree, Divider } from 'ant-design-vue'
import api from '@/api/api'
const { Search } = Input
const { Item } = Menu
const { Button } = Dropdown
const { DirectoryTree, TreeNode } = Tree

// const treeData = [
//   {
//     title: 'parent1',
//     key: 'parent1',
//     slots: {
//       icon: 'folder'
//     },
//     children: [
//       { 
//         title: 'leaf', 
//         key: '0-0-0', 
//         slots: { icon: 'folder' },
//         children: [
//           { title: 'leaf1', key: '0-0-0', slots: { icon: 'folder' } },
//           { title: 'leaf2', key: '0-0-1', slots: { icon: 'folder' } }
//         ]
//       },
//       { title: 'leaf', key: '0-0-1', slots: { icon: 'folder' } }
//     ]
//   },
//   {
//     title: 'parent2',
//     key: 'parent2',
//     slots: {
//       icon: 'folder'
//     },
//     children: [
//       { title: 'leaf', key: 'leaf-1' },
//       { title: 'leaf', key: 'leaf-2' }
//     ]
//   }
// ]
@Component({
  name: "File",
  components: {
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-button': Buttons,
    'a-icon': Icon,
    'a-space': Space,
    'a-input': Input,
    'a-input-search': Search,
    'a-dropdown-button': Button,
    'a-menu': Menu,
    'a-menu-item': Item,
    'a-directory-tree': DirectoryTree,
    'a-tree': Tree,
    'a-tree-node': TreeNode,
    'a-divider': Divider
  }
})

export default class File extends Vue {
  $req = Vue.prototype.$req

  treeData: Record<string, number>[] = []

  // treeData = null

  onExpand (key: unknown, e: { expanded: boolean; node: { dataRef: { slots: { icon: string }, class: string } } }):void {
    if (e.expanded) {
      e.node.dataRef.slots.icon = "open-folder"
      e.node.dataRef.class = "highlight"
    } else {
      e.node.dataRef.slots.icon = "folder"
      e.node.dataRef.class = "default"
    }
  }

  // 递归处理目录
  setIcon (tree: { children: unknown, slots: { icon: string}, class: string }[]): void {
    for (let i = 0; i < tree.length; i++) {
      (tree[i] as { slots: {icon: string} }).slots = {
        icon: 'folder'
      }
      if ((tree[i] as { children: { length: number }[] }).children && (tree[i] as { children: { length: number }[] }).children.length > 0) {
        this.setIcon(tree)
      } else {
        break
      }
    }
    if (!tree.length) {
      return undefined
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this

    for (let i = 0; i < tree.length; i++) {
      (tree[i] as { slots: {icon: string} }).slots = {
        icon: 'folder'  
      }
      tree[i].class = 'default'
      if ((tree[i] as { children: { length: number }[] }).children && (tree[i] as { children: { length: number }[] }).children.length > 0) {
        that.setIcon(tree[i].children as { children: unknown, slots: { icon: string}, class: string }[])
      }
    }
  }

  // 路径递归
  createPath (tree:{ children: { title: string, children: unknown, slots: { icon: string}, class: string }[], slots: { icon: string}, class: string, length: number, path: string, title: string }[], path: string):void {
    if (!tree.length) {
      return undefined
    }
    for (let i = 0; i < tree.length; i++) {
      (tree[i] as { path: string }).path = path + '/' + (tree[i] as { title: string }).title
      if ((tree[i] as { children: { length: number }[] }).children && tree[i].children.length > 0) {
        this.createPath(tree[i].children, (tree[i] as { path: string }).path)
      }
    }
  }

  // 加载目录

  onSelect (key: unknown, e: { node: { onExpand: () => void } }):void {
    e.node.onExpand()
  }

  async getList ():Promise<void> {
    await this.$req(api.file.list).then((res: { data: { msg: Record<string, number>[] } }) => {
      console.log(res)
      const { msg } = res.data
      this.setIcon(msg)
      this.createPath(msg, '/')
      this.treeData = msg
    })
  }
  
  // eslint-disable-next-line no-undef
  loadData (node: TreeNode):Promise<void> { 
    console.log(node)
    return new Promise((resolve) => {
      if (node.dataRef.type === 0) {
        resolve()
        return
      }
      this.$req.post(api.file.getlist, {
        path: node.dataRef.path
      }).then(res => {
        const { msg } = res.data
        this.setIcon(msg)
        this.createPath(msg, node.dataRef.path)
        node.dataRef.children = msg
        this.treeData = [...this.treeData]
      })
      resolve()
    })
  }

  created ():void {
    this.getList() // 初始化目录
  }
}
</script>
<style lang="less" scoped>
.highlight {
  background: rgb(104, 141, 221) !important;
}
</style>
