<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-11 20:47:38
 * @Description: 
-->
<template>
  <a-card class="filesource">
    <a-row>
      <a-col :sm="24" :mg="12" :lg="6">
        <a-space>
          <a-dropdown type="primary">
            <a-button type="primary">新建</a-button>
            <a-menu slot="overlay" @click="onCreate">
              <a-menu-item key="1">
                <a-icon type="folder-add" />添加目录</a-menu-item
              >
              <a-menu-item key="2">
                <a-icon type="file-add" />添加文件</a-menu-item
              >
            </a-menu>
            <a-icon slot="icon" type="plus-circle" />
          </a-dropdown>
          <a-button type="primary" style="background: #4ba47c" icon="download">
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
          <a-button
            type="danger"
            icon="close"
            v-if="checkable"
            @click="checkable = false"
          >
            取消
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
        <a-tree
          showLine
          :checkStrictly="true"
          :checkable="checkable"
          style="text-align:left; font-size: 16px"
          :load-data="loadData"
          :tree-data="treeData"
          showIcon
          @select="onSelect"
          @expand="onExpand"
          @check="onCheck"
        >
          <a-icon
            slot="switcherIcon"
            :type="aexpandeds ? 'plus-square' : 'minus-square'"
          />
          <template v-slot:icon-Folder>
            <b-menu :size="30" type="icon-Folder" />
          </template>
          <template v-slot:icon-wenjian>
            <b-menu :size="30" type="icon-wenjian" />
          </template>
          <template v-slot:icon-wenjianjia>
            <b-menu :size="30" type="icon-wenjianjia" />
          </template>
        </a-tree>
      </a-col>
    </a-row>
    <create-dir
      :visible="visible"
      :tree="treeData"
      @close="visible = $event"
    ></create-dir>
    <a-back-top>
      <div class="ant-back-top-inner">
        UP
      </div>
    </a-back-top>
  </a-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BMenu from '@/components/menu/index.vue';
import {
  Card,
  Row,
  Col,
  Button as Buttons,
  Icon,
  Space,
  Input,
  Dropdown,
  Menu,
  Tree,
  Divider,
  notification,
  BackTop
} from 'ant-design-vue';
import createDir from './createDir.vue';
import api from '@/api/api';
const { Search } = Input;
const { Item } = Menu;
const { Button } = Dropdown;
const { DirectoryTree, TreeNode } = Tree;

@Component({
  name: 'File',
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
    'a-divider': Divider,
    'a-dropdown': Dropdown,
    'a-back-top': BackTop,
    BMenu,
    createDir
  }
})
export default class File extends Vue {
  $req = Vue.prototype.$req;

  treeData: Record<string, number>[] = [];

  aexpandeds = true;

  checkable = false;

  visible = false;

  onExpand(
    key: unknown,
    e: {
      expanded: boolean;
      node: { dataRef: { slots: { icon: string }; class: string } };
    }
  ): void {
    console.log(key, e);
    if (!e.expanded && (e.node.dataRef as any).type === 1) {
      (e.node.dataRef as any).scopedSlots.icon = 'icon-wenjianjia';
      e.node.dataRef.class = 'default';
      this.aexpandeds = true;
    } else if (e.expanded && (e.node.dataRef as any).type === 1) {
      (e.node.dataRef as any).scopedSlots.icon = 'icon-Folder';
      e.node.dataRef.class = 'default';
      this.aexpandeds = false;
    }
  }

  // 递归处理目录
  setIcon(
    tree: { children: unknown; slots: { icon: string }; class: string }[]
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    for (let i = 0; i < tree.length; i++) {
      (tree[i] as any).scopedSlots = {
        icon: (tree[i] as any).type ? 'icon-wenjianjia' : 'icon-wenjian'
      };
      (tree[i] as any).isLeaf = false;
      tree[i].class = 'default';
      if (
        (tree[i] as { children: { length: number }[] }).children &&
        (tree[i] as { children: { length: number }[] }).children.length > 0
      ) {
        that.setIcon(
          tree[i].children as {
            children: unknown;
            slots: { icon: string };
            class: string;
          }[]
        );
      }
    }
  }

  // 路径递归
  createPath(
    tree: {
      children: {
        title: string;
        children: unknown;
        slots: { icon: string };
        class: string;
      }[];
      slots: { icon: string };
      class: string;
      length: number;
      path: string;
      title: string;
    }[],
    path: string
  ): void {
    if (!tree.length) {
      return undefined;
    }
    console.log(this.$parent, 11111);
    for (let i = 0; i < tree.length; i++) {
      (tree[i] as { path: string }).path =
        path + '/' + (tree[i] as { title: string }).title;
      if (
        ((tree[i] as unknown) as { children: { length: number }[] }).children &&
        tree[i].children.length > 0
      ) {
        this.createPath(
          (tree[i] as any).children,
          (tree[i] as { path: string }).path
        );
      }
    }
  }

  // 加载目录

  onSelect(key: unknown, e: { node: { onExpand: () => void } }): void {
    e.node.onExpand();
  }

  async getList(): Promise<void> {
    await this.$req(api.file.list).then(
      (res: { data: { msg: Record<string, number>[] } }) => {
        console.log(res);
        const { msg } = res.data;
        this.setIcon(msg as any);
        this.createPath(msg as any, '/');
        this.treeData = msg;
      }
    );
  }

  // eslint-disable-next-line no-undef
  loadData(node: {
    dataRef: { type: number; path: string; children: any };
  }): Promise<void> {
    console.log(node);
    return new Promise(resolve => {
      if (node.dataRef.type === 0) {
        resolve();
        return;
      }
      this.$req
        .post(api.file.getlist, {
          path: node.dataRef.path
        })
        .then((res: { data: { msg: any } }) => {
          const { msg } = res.data;
          this.setIcon(msg);
          this.createPath(msg, node.dataRef.path);
          node.dataRef.children = msg;
          this.treeData = [...this.treeData];
        });
      resolve();
    });
  }

  // 创建目录
  onCreate(val: any): void {
    console.log(val);
    if (val.key === '1') {
      this.visible = true;
      this.checkable = true;
    } else {
    }
  }

  // 文件选择
  onCheck(key: any, e: any): void {
    console.log(key);
    if (e.node.dataRef.type !== 1 && key.checked.length > 0) {
      notification.info({
        description: '请选择目录',
        message: '通知'
      });
      return undefined;
    }
    if (e.node.dataRef.type === 1 && key.checked.length > 1) {
      notification.info({
        description: '请勾选一个目录创建',
        message: '通知'
      });
      return undefined;
    }
    this.mkdir(e.node.dataRef.path);
  }

  // 创建文件
  async mkdir(path: string): Promise<void> {
    this.$req
      .post(api.file.mkdir, {
        path,
        mkdir: 'haha'
      })
      .then((res: any) => {
        console.log(res);
      });
  }

  //
  created(): void {
    this.getList(); // 初始化目录
  }
}
</script>
<style lang="less" scoped>
.highlight {
  background: rgb(104, 141, 221) !important;
}
</style>
