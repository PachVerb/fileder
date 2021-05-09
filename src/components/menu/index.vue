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
import { Icon } from 'ant-design-vue';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2533322_fzedc2d4jb8.js' // 在 iconfont.cn 上生成
});

export default {
  name: 'BMenu',
  components: {
    MyIcon
  },
  props: {
    type: String,
    size: Number
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less"></style>
