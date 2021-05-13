<!--
 * @Author: wangshan
 * @Date: 2021-05-14 01:23:22
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-14 01:23:38
 * @Description: 
-->

<template>
  <a-card>
    <h1>Trash</h1>
  </a-card>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Card } from 'ant-design-vue';
@Component({
  name: 'Trash',
  components: {
    'a-card': Card
  }
})
export default class Tran extends Vue {}
</script>

<style scoped lang="less"></style>
