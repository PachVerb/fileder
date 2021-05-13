<!--
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-14 01:10:09
 * @Description: 
-->
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider class="sider-cus-style" v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        :defaultSelectedKeys="[defaultMenu]"
        theme="dark"
        mode="inline"
        @click="checkview"
      >
        <a-menu-item key="/home">
          <a-icon type="bar-chart" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/file">
          <a-icon type="folder" />
          <span>文件中心</span>
        </a-menu-item>
        <a-menu-item key="/transfer">
          <a-icon type="swap" />
          <span>传输</span>
        </a-menu-item>
        <a-menu-item key="/trash">
          <a-icon type="delete" />
          <span>回收栈</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="2" push="22">
            <user-avater></user-avater>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content style="margin: 20px 16px; background: #fff">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout, Row, Col, Icon, Menu } from 'ant-design-vue';
import { userAvater } from '@/components/index';
// import route from '@/router/index.ts';

const { Header, Content, Sider } = Layout;
const { Item, SubMenu } = Menu;
@Component({
  name: 'BaseLayout',
  components: {
    'a-layout': Layout,
    'a-layout-header': Header,
    'a-layout-content': Content,
    'a-layout-sider': Sider,
    'a-row': Row,
    'a-col': Col,
    'a-icon': Icon,
    'a-menu': Menu,
    'a-menu-item': Item,
    'a-sub-menu': SubMenu,
    userAvater
  },
  watch: {}
})
export default class layout extends Vue {
  // * Data
  collapsed = false;

  defaultMenu = location.pathname;

  // * Method
  hello(): void {
    console.log('Hello World!');
  }

  //
  checkview(val: { key: string }): void {
    const { key } = val;
    this.$router.push({ path: key });
  }

  // * Hooks
  //   mounted(): void {}
}
</script>
<style lang="less" scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.sider-cus-style {
  text-align: left;
}
</style>
