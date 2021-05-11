<!--
 * @Author: wangshan
 * @Date: 2021-05-10 01:12:17
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-11 21:07:25
 * @Description: 
-->
<template>
  <a-modal
    title="Title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    width="600px"
    @cancel="$emit('close', false)"
  >
    <p style="text-align:left">选择创建目录位置</p>
    <a-tree-select
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      treeDataSimpleMode
      :tree-data="treec"
      :load-data="onLoadData"
      placeholder="选择路径"
    >
    </a-tree-select>
    <p style="text-align:left; margin-top: 12px">输入目录名</p>
    <a-input placeholder="等待输入...." />
  </a-modal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Modal, TreeSelect, Input } from 'ant-design-vue';
import api from '@/api/api';
import File from './index.vue';
const treeData = [];

@Component({
  name: 'Dir',
  components: {
    'a-modal': Modal,
    'a-tree-select': TreeSelect,
    'a-input': Input
  },
  props: {
    visible: {
      type: Boolean
    },
    tree: {
      type: Array
    }
  }
})
export default class Dir extends Vue {
  confirmLoading = false;

  value = undefined;

  treeData = [];

  closeModal() {
    this.$emit('close', false);
  }

  treeca = this.tree;

  // computed
  get treec() {
    return this.tree
      .filter(val => val.type === 1)
      .map(val => {
        return {
          id: val.path,
          pId: val.key,
          value: val.path,
          title: val.title,
          isLeaf: false
        };
      });
  }

  set treec(val) {
    // debugger;
    // console.log(val);

    this.treec = val;
  }

  createPath(tree, path) {
    return tree.map(val => {
      return {
        ...val,
        path: path + '/' + val.title
      };
    });
  }

  async getFile(path) {
    return await this.$req.post(api.file.getlist, {
      path
    });
  }

  onLoadData(node) {
    return new Promise(resolve => {
      this.treec = [];
      resolve();
    });
    // console.log(node, this);
    // return new Promise(resolve => {
    //   const { value, pId } = node.dataRef;
    //   this.getFile(value).then(res => {
    //     let { msg } = res.data;
    //     msg = this.createPath(msg, value);

    //     this.treec = [];
    //     resolve();
    //   });
    // });
  }
}
</script>

<style scoped lang="less"></style>
