<!--
 * @Author: wangshan
 * @Date: 2021-05-10 01:12:17
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-12 20:48:29
 * @Description: 
-->
<template>
  <a-modal
    :title="mtype === 1 ? '新建目录' : '新建文件'"
    :visible="visible"
    :confirm-loading="confirmLoading"
    width="600px"
    :mask-closable="false"
    :confirmLoading="confirmLoading"
    @cancel="$emit('close', false)"
    @ok="onCreate"
  >
    <p style="text-align:left">选择创建目录位置</p>
    <a-tree-select
      style="width: 100%"
      v-model="dirPath"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      treeDataSimpleMode
      :tree-data="treeData"
      :load-data="onLoadData"
      placeholder="选择路径"
    >
    </a-tree-select>
    <p style="text-align:left; margin-top: 12px">输入目录名</p>
    <a-input v-model="dirname" placeholder="等待输入...." />
  </a-modal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Modal, TreeSelect, Input, message } from 'ant-design-vue';
import api from '@/api/api';
// import Log from '../common/decorator.ts';
// !: Failed to resolve directive: ant-portal,
Modal.install(Vue);

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
    },
    mtype: {
      type: Number
    }
  },
  watch: {
    treec(val, old) {
      this.treeData = this.treec;
    },
    $router(to, from) {
      console.log(to, from);
    }
  }
})
export default class Dir extends Vue {
  confirmLoading = false;

  value = undefined;

  treeData = [];

  dirPath = '';

  dirname = '';

  confirmLoading = false;

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
    this.treec = val;
  }

  init() {
    this.dirname = this.dirPath = '';
  }

  createPath(tree, path) {
    return tree
      .filter(val => val.type === 1)
      .map(val => {
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
      const { value, pId } = node.dataRef;
      if (node.dataRef.type === 0) {
        resolve();
        return;
      }
      this.getFile(value).then(res => {
        let { msg } = res.data;
        msg = this.createPath(msg, value);

        const tree = msg.map(val => {
          return {
            id: val.key,
            pId: pId,
            value: val.path,
            title: val.title,
            isLeaf: false
          };
        });
        this.treeData = this.treeData.concat(tree);
        resolve();
      });
    });
  }

  async create(type) {
    let res = null;
    try {
      this.confirmLoading = true;
      res = await this.$req.post(api.file.mkdir, {
        path: this.dirPath,
        dirname: this.dirname,
        type
      });
      message.success(res.data.msg);
      this.init();
      this.$emit('close', false);
    } catch (err) {
      console.log(err);
    } finally {
      this.confirmLoading = false;
    }
    return res;
  }

  onCreate() {
    if (!this.dirname) {
      if (this.mtype === 1) {
        message.info('输入目录名');
      }
      if (this.mtype === 2) {
        message.info('输入文件名');
      }
      return undefined;
    }
    this.create(this.mtype);
  }

  // * hook
  //   created() {}
}
</script>

<style scoped lang="less"></style>
