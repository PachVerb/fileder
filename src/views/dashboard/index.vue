<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-28 00:20:07
 * @Description: 
-->
<template>
  <a-card>
    <a-row>
      <a-col :md="12" :lg="6">
        <a-statistic title="传输统计">
          <template slot="formatter">
            <strong>63555</strong>
          </template>
          <template slot="prefix">
            <a-button type="link" icon="vertical-align-top"> </a-button
          ></template>
        </a-statistic>
        <a-statistic>
          <template slot="formatter">
            <strong>63555</strong>
          </template>
          <template slot="prefix">
            <a-button type="link" icon="vertical-align-bottom"></a-button>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :lg="18">
        <commit-bar :chartData="data" :height="150" />
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <a-row type="flex" align="middle">
      <a-col :span="6">
        <h3>文件占比分析</h3>
        <pie :chartData="pieData" :width="100" :height="100"></pie>
      </a-col>
      <a-col :span="18">
        <h3>资源明细</h3>
        <a-table :columns="columns" :data-source="dataSource">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions <a-icon type="down" />
            </a>
          </span>
        </a-table>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  Card,
  Row,
  Col,
  Carousel,
  Statistic,
  Icon,
  Button,
  Divider,
  Table,
  Tag
} from 'ant-design-vue';
import { commitBar, Pie } from '@/components/index';
const randomColor = require('randomcolor');
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

@Component({
  name: 'home',
  components: {
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-carousel': Carousel,
    'a-statistic': Statistic,
    'a-icon': Icon,
    'a-button': Button,
    'a-divider': Divider,
    'a-table': Table,
    'a-tag': Tag,
    Pie,
    commitBar
  }
})
export default class Home extends Vue {
  data = {
    // 图标数据
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
        label: 'download',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      },
      {
        label: 'upload',
        backgroundColor: '#f90',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
  };

  pieData = {
    labels: ['javascript', 'css', 'Vuejs', 'Less', 'Shell'],
    datasets: [
      {
        label: 'total',
        data: [10, 10, 30, 25, 25],
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor()
        ]
      }
    ]
  };

  dataSource = data;

  columns = columns;
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
