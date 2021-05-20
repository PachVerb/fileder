<!--
 * @Author: wangshan
 * @Date: 2021-05-14 01:05:03
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-21 01:43:21
 * @Description: 
-->
<template>
  <a-card>
    <a-row type="flex" justify="start">
      <a-col :span="2">
        <a-button type="primary" icon="delete">删除记录</a-button>
      </a-col>
      <a-col :span="2">
        <a-button type="danger" icon="close">取消</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-list item-layout="horizontal" :data-source="List">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <template slot="description">
                <a-progress :percent="70" status="exception" />
              </template>

              <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
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
import ss from 'socket.io-stream';
import {
  Card,
  Button,
  Space,
  Row,
  Col,
  List,
  Avatar,
  Divider,
  Progress
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
    'a-progress': Progress
  }
})
export default class Tran extends Vue {
  List = [
    {
      title: 'Ant Design Title 1'
    }
  ];

  mounted() {
    const socket = io('http://127.0.0.1:3000', {
      withCredentials: true
    });
    socket.on('process', data => {
      console.log(data);
    });
  }
}
</script>

<style scoped lang="less"></style>
