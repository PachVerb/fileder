/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-04 21:45:35
 * @Description: 
 */
import Vue from 'vue'

declare module "vue/types/vue" {
  interface Vue {
    prototype: Record<string | unknow>
  }
}
