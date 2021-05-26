<!--
 * @Author: wangshan
 * @Date: 2021-05-14 01:05:03
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-26 23:09:50
 * @Description: 
-->
<template>
  <a-card>
    <a-row type="flex" justify="start">
      <a-col :span="2">
        <a-button type="primary" icon="delete">删除记录</a-button>
      </a-col>
      <!-- <a-col :span="2">
        <a-button type="danger" icon="close">取消</a-button>
      </a-col> -->
    </a-row>
    <a-divider />
    <a-row>
      <a-col :span="24">
        <a-list item-layout="horizontal" :data-source="List">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <template slot="description">
                <a-progress
                  :percent="item.upState === 1 ? pro : 100"
                  :showInfo="true"
                  :status="item.upState === 1 ? 'active' : 'success'"
                />
              </template>

              <span slot="title">{{ item.name }}</span>

              <div slot="avatar">
                <a-button type="link" icon="file-add" size="large"></a-button>
              </div>
            </a-list-item-meta>
            <div slot="extra">
              <a-space>
                <a-button
                  type="link"
                  size="large"
                  icon="delete"
                  @click="dele(item)"
                />
              </a-space>
            </div>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import io from 'socket.io-client';
import {
  Card,
  Button,
  Space,
  Row,
  Col,
  List,
  Avatar,
  Divider,
  Progress,
  Icon
} from 'ant-design-vue';
const { Item } = List;
const { Meta } = Item;
@Component({
  name: 'Transfer',
  components: {
    'a-card': Card,
    'a-button': Button,
    'a-space': Space,
    'a-row': Row,
    'a-col': Col,
    'a-list': List,
    'a-list-item': Item,
    'a-list-item-meta': Meta,
    'a-avatar': Avatar,
    'a-divider': Divider,
    'a-progress': Progress,
    'a-icon': Icon
  },
  inject: ['reload']
})
export default class Tran extends Vue {
  List = [];

  pro = 0;

  dele(item) {
    this.$store.commit('clearFile', item);
    this.reload();
  }

  created() {
    this.List = [...this.$store.state.file.fdir];
  }

  mounted() {
    const socket = io('http://127.0.0.1:3000', {
      withCredentials: true
    });
    socket.on('process', pro => {
      this.pro = pro;
      if (pro === 100) {
        this.$store.commit('updateState');
      }
    });
  }
}
</script>

<style scoped lang="less"></style>
