/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-14 23:59:59
 * @Description:
 */
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    prototype: Record<string | unknow>;
  }
}
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {}
}
