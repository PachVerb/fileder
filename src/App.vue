<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-23 22:39:12
 * @Description: 
-->
<template>
  <div id="app">
    <router-view v-if="isRouterShow" />
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  name: 'App',
  provide() {
    return {
      reload: this.reload
    };
  }
})
export default class App extends Vue {
  isRouterShow = true;

  async reload() {
    this.isRouterShow = false;
    await this.$nextTick();
    this.isRouterShow = true;
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
