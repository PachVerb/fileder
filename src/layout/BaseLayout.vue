<!--
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-22 01:34:28
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
      <fullscreen ref="fullscreen" @change="fullscreenChange">
        <a-layout-header style="background: #fff; padding: 0">
          <a-row type="flex" justify="end">
            <a-col :span="1">
              <a-button
                :icon="fullscreenicon"
                type="link"
                size="large"
                @click="toggle"
              ></a-button>
            </a-col>
            <a-col :span="1">
              <user-avater></user-avater>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content style="margin: 20px 16px; background: #fff">
          <router-view></router-view>
        </a-layout-content>
      </fullscreen>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout, Row, Col, Icon, Menu, Button } from 'ant-design-vue';
import { userAvater } from '@/components/index';
// import route from '@/router/index.ts';
import fullscreen from 'vue-fullscreen';
Vue.use(fullscreen);
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
    'a-button': Button,
    userAvater
  },
  watch: {}
})
export default class layout extends Vue {
  // * Data
  collapsed = false;
  fullscreen = false;
  fullscreenicon = 'fullscreen';

  defaultMenu = location.pathname;

  // * Method
  hello(): void {
    console.log('Hello World!');
  }

  toggle() {
    (this.$refs.fullscreen as any).toggle(); // recommended
    // this.fullscreen = !this.fullscreen // deprecated
  }

  fullscreenChange(fullscreen: any) {
    this.fullscreen = fullscreen;
    this.fullscreen
      ? (this.fullscreenicon = 'fullscreen-exit')
      : (this.fullscreenicon = 'fullscreen');
  }

  //
  checkview(val: { key: string }): void {
    const { key } = val;
    this.$router.push({ path: key });
  }

  mounted() {
    console.log(this);
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
