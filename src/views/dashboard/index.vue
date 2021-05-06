<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-04-30 21:00:15
 * @Description: 
-->
<template>
  <a-card>
    <a-row>
      <a-col :md="24" :lg="24">
        <a-carousel>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :md="6" :lg="6">
        <a-card title="Default size card" style="width: 300px">
          <a slot="extra" href="#">more</a>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :md="6" :lg="6">
        <a-card title="Default size card" style="width: 300px">
          <a slot="extra" href="#">more</a>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :md="6" :lg="6">
        <a-card title="Default size card" style="width: 300px">
        <a slot="extra" href="#">more</a>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :md="6" :lg="6">
        <a-card title="Default size card" style="width: 300px">
          <a slot="extra" href="#">more</a>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Card, Row, Col, Carousel } from 'ant-design-vue'
@Component({
  name: "home",
  components: {
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-carousel': Carousel
  }
})
export default class Home extends Vue {
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
