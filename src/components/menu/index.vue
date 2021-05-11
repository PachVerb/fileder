<!--
 * @Author: wangshan
 * @Date: 2021-05-07 22:36:49
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-11 20:52:59
 * @Description: o
-->
<template>
  <my-icon
    :type="type"
    :size="size"
    :style="{
      fontSize: size + 'px'
    }"
  ></my-icon>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'ant-design-vue';
import Component from 'vue-class-component';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2533322_fzedc2d4jb8.js' // 在 iconfont.cn 上生成
});
@Component({
  name: 'Menu',
  components: {
    MyIcon
  },
  props: {
    type: String,
    size: Number
  }
})
export default class BeIocn extends Vue {}
</script>

<style scoped lang="less"></style>
