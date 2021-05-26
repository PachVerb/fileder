<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-27 00:34:14
 * @Description: 
-->
<template>
  <a-card>
    <a-row>
      <a-col :md="24" :lg="24">
        <commit-bar :chartData="data" />
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Card, Row, Col, Carousel } from 'ant-design-vue';
import { commitBar } from '@/components/index';
@Component({
  name: 'home',
  components: {
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-carousel': Carousel,
    commitBar
  }
})
export default class Home extends Vue {
  data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
  };
}
</script>
<style lang="less" scoped>
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
</style>
