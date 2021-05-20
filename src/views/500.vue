<!--
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-17 19:59:21
 * @Description: 
-->
<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click="$router.push({ name: 'Home' })">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Result, Button } from 'ant-design-vue';
@Component({
  name: 'server',
  components: {
    'a-result': Result,
    'a-button': Button
  }
})
export default class ServerError extends Vue {}
</script>

<style scoped lang="less"></style>
