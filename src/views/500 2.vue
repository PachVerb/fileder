<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
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
import { Result, Button } from 'ant-design-vue'
@Component({
  name: "server",
  components: {
    'a-result': Result,
    "a-button": Button
  }
})
export default class ServerError extends Vue {
}
</script>

<style scoped lang="less">
</style>
