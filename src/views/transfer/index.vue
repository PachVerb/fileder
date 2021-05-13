<!--
 * @Author: wangshan
 * @Date: 2021-05-14 01:05:03
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-14 01:07:25
 * @Description: 
-->
<template>
  <a-card>
    <h1>Transfer</h1>
  </a-card>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Card } from 'ant-design-vue';
@Component({
  name: 'Transfer',
  components: {
    'a-card': Card
  }
})
export default class Tran extends Vue {}
</script>

<style scoped lang="less"></style>
