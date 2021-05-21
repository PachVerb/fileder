<!--
 * @Author: wangshan
 * @Date: 2021-05-15 00:12:26
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-22 00:21:30
 * @Description: 
-->
<template>
  <a-drawer
    title="文件上传"
    placement="right"
    :closable="true"
    :visible="tvisible"
    :width="600"
    :maskClosable="false"
    @close="$emit('close', false)"
  >
    <a-space direction="vertical" size="large">
      <a-row>
        <a-col :span="24">
          <h3>选择上传位置:</h3>
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
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-upload-dragger
            name="file"
            :multiple="true"
            :beforeUpload="() => false"
            :customRequest="upload"
            @change="handleChange"
          >
            <!-- body -->
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
            <!-- footer -->
          </a-upload-dragger>
        </a-col>
      </a-row>
    </a-space>

    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px'
      }"
    >
      <a-button style="marginRight: 8px" @click="onClose">
        Cancel
      </a-button>
      <a-button type="primary" @click="onUP" :loading="updisbtn">
        Submit
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import api from '@/api/api.ts';
import io from 'socket.io-client';
import ss from 'socket.io-stream';
import {
  Row,
  Col,
  Space,
  Drawer,
  Upload,
  Icon,
  Button,
  TreeSelect
} from 'ant-design-vue';
const { Dragger: DragUp } = Upload;
@Component({
  components: {
    'a-drawer': Drawer,
    'a-upload-dragger': DragUp,
    'a-icon': Icon,
    'a-button': Button,
    'a-row': Row,
    'a-col': Col,
    'a-tree-select': TreeSelect,
    'a-space': Space
  },
  props: {
    tvisible: {
      type: Boolean
    },
    tree: {
      type: Array
    }
  },
  watch: {
    treec(val, old) {
      this.treeData = this.treec;
    }
  }
})
export default class UploadF extends Vue {
  treeData = [];

  dirPath = '';

  files = null;

  updisbtn = false;

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

  handleChange({ file, fileList }) {
    this.files = file;
  }

  upload(val) {
    console.log(val);
  }

  // 目录树加载
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

  showDrawer() {
    this.$emit('close', false);
  }

  onClose() {
    this.$emit('close', false);
  }

  onUP() {
    const socket = io('http://127.0.0.1:3000', {
      withCredentials: true
    });
    const stream = ss.createStream(); // writeable
    const file = this.files;
    const blobStream = ss.createBlobReadStream(file);
    let size = 0;
    this.$store.commit('addFile', file);

    ss(socket).emit('file', stream, {
      size: file.size,
      path: this.dirPath,
      filename: file.name
    });

    this.updisbtn = true;

    blobStream.on('data', function(chunk) {
      size += chunk.length;

      socket.emit('process', Math.floor((size / file.size) * 100));
    });

    blobStream.on('end', () => {
      // 流传输完毕，关闭上传窗口。
      // btn节流处理
      this.updisbtn = true;
      this.$emit('close', false);
    });

    blobStream.pipe(stream);
  }
}
</script>

<style scoped lang="less"></style>
