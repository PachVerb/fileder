<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-15 00:19:54
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
              <a-menu-item :key="1">
                <a-icon type="folder-add" />添加目录</a-menu-item
              >
              <a-menu-item :key="2">
                <a-icon type="file-add" />添加文件</a-menu-item
              >
            </a-menu>
            <a-icon slot="icon" type="plus-circle" />
          </a-dropdown>
          <a-button type="primary" style="background: #4ba47c" icon="download">
            下载
          </a-button>
          <a-button
            type="primary"
            style="background: #4ba47c"
            icon="upload"
            @click="onUp"
          >
            上传
          </a-button>
          <a-button type="primary" style="background: #4ba47c" icon="retweet">
            移动
          </a-button>
          <a-button type="danger" icon="delete" @click="onDelete">
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
          :replaceFields="{
            key: 'path'
          }"
          v-model="checkedKey"
          @select="onSelect"
          @expand="onExpand"
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
      :mtype="menutype"
      @close="visible = $event"
    ></create-dir>

    <up-file
      :tvisible="tvisible"
      :tree="treeData"
      @close="tvisible = $event"
    ></up-file>

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
// import Checked from '@/type/filesource.d.ts';
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
  BackTop,
  message
} from 'ant-design-vue';
import createDir from './createDir.vue';
import upFile from './UploadFile.vue';
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
    upFile,
    BMenu,
    createDir
  },
  inject: ['reload']
})
export default class File extends Vue {
  $req = Vue.prototype.$req;

  treeData: Record<string, number>[] = [];

  aexpandeds = true;

  checkable = true;

  visible = false;

  menutype = 0;

  checkedKey: any = {};

  // 传输
  tvisible = false;

  onExpand(
    key: unknown,
    e: {
      expanded: boolean;
      node: { dataRef: { slots: { icon: string }; class: string } };
    }
  ): void {
    // console.log(key, e);
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
    // console.log(this.$parent, 11111);
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
        const { msg } = res.data;
        this.setIcon(msg as any);
        this.createPath(msg as any, '/');
        this.treeData = msg;
      }
    );
  }

  //* 选中节点树

  // eslint-disable-next-line no-undef
  loadData(node: {
    dataRef: { type: number; path: string; children: any };
  }): Promise<void> {
    // console.log(node);
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
  onCreate(e: any): void {
    // console.log(val);
    this.menutype = e.key;
    this.visible = true;
  }

  // 文件选择
  onDelete() {
    if (
      !this.checkedKey.checked ||
      this.checkedKey.checked.length > 1 ||
      this.checkedKey.checked.length === 0
    ) {
      notification.info({
        description: '选择一个文件或目录后在操作～～～',
        message: '提示',
        duration: 3,
        getContainer: () => document.body
      });
      return false;
    }
    this.Remove(this.checkedKey.checked[0]).then(res => {
      if (!res.data.code) {
        message.success(res.data.msg);
        this.getList();
      } else {
        message.warning(res.data.msg);
      }
    });
  }

  // 移除目录
  async Remove(path: string) {
    try {
      const res = await this.$req.post(api.file.rmove, { path });
      (this as any).reload();
      return res;
    } catch (err) {
      message.warning('操作失败:' + err);
    }
  }

  // upload

  onUp() {
    this.tvisible = true;
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
