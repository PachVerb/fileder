<template>
  <a-dropdown>
     <a-badge dot><a-avatar shape="square" icon="user"/></a-badge>
    <a-menu slot="overlay" @click="onHandle">
      <a-menu-item key="setting">
        <a href="javascript:;">设置</a>
      </a-menu-item>
      <a-menu-item key="logout">
        <a href="javascript:;">注销</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import { Badge, Menu, Avatar, Dropdown, message } from 'ant-design-vue'
import Component from 'vue-class-component'
import api from '@/api/api'
import { MenuItem } from 'ant-design-vue/types/menu/menu-item'
const { Item } = Menu
@Component({
  name: 'Avater',
  components: {
    "a-dropdown": Dropdown,
    'a-menu': Menu,
    "a-menu-item": Item,
    "a-badge": Badge,
    "a-avatar": Avatar
  }
})
export default class Avater extends Vue {
  // * Data
  avaterurl = 'a'
  // * Methods
  onHandle (val: MenuItem):void {
    if (val.key !== "setting") {
      this.$req.get(api.count.logout).then((res) => {
        message.success(res.data.msg)
        window.localStorage.clear()
        this.$router.push({ path: '/login' })
      }).catch((err: ErrorEvent) => {
        message.warning(err.message)
      })
    } else {
      this.$req(api.count.getinfo).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
