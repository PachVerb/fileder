<!--
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-04 23:35:14
 * @Description: 
-->
<template>
  <a-dropdown>
    <a-badge  v-if="info">
      <a-avatar :src="info.avater" shape="square"></a-avatar>
    </a-badge>
     <a-badge dot v-else><a-avatar shape="square" icon="user"/></a-badge>
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
  avaterurl = this.$store.state.Login.info.avater

  info = this.$store.state.Login.info
  
  $req = Vue.prototype.$req

  // * Methods
  onHandle (val: MenuItem):void {
    if (val.key !== "setting") {
      this.$req.get(api.count.logout).then(() => {
        // message.success(res.data.msg)
        window.localStorage.clear()
        this.$router.push({ path: '/login' })
      }).catch((err: ErrorEvent) => {
        message.warning(err.message)
      })
    } else {
      this.$req(api.count.getinfo).then((res: { data: { info: null } }) => {
        this.info = res.data.info
      })
    }
  }

  mounted ():void {
    console.log(this.$store.state)
  }
}
</script>

<style scoped lang="less">

</style>
