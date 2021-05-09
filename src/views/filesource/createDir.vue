<!--
 * @Author: wangshan
 * @Date: 2021-05-10 01:12:17
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-10 01:27:29
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
      :tree-data="treeData"
      placeholder="Please select"
      tree-default-expand-all
    >
      <span
        v-if="key === '0-0-1'"
        slot="title"
        slot-scope="{ key, value }"
        style="color: #08c"
      >
        Child Node1 {{ value }}
      </span>
    </a-tree-select>
    <p style="text-align:left; margin-top: 12px">输入目录</p>
    <a-input placeholder="等待输入...." />
  </a-modal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Modal, TreeSelect, Input } from 'ant-design-vue';
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        value: '0-0-1',
        key: '0-0-1',
        scopedSlots: {
          // custom title
          title: 'title'
        }
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1'
  }
];
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
    }
  }
})
export default class Dir extends Vue {
  confirmLoading = false;

  value = undefined;

  treeData = treeData;

  closeModal() {
    this.$emit('close', false);
  }
}
</script>

<style scoped lang="less"></style>
