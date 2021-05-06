<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Button, Result } from 'ant-design-vue'
@Component({
  name: "sourceNot",
  components: {
    "a-button": Button,
    "a-result": Result
  }
})
export default class NotPage extends Vue {
} 
</script>

<style scoped lang="less">
</style>
