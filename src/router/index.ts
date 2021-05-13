/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-14 01:24:12
 * @Description:
 */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import BaseLayout from '@/layout/BaseLayout.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/login',
    component: BaseLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/filesource/index.vue')
      },
      {
        path: '/transfer',
        name: 'Trans',
        component: () => import('@/views/transfer/index.vue')
      },
      {
        path: '/trash',
        name: 'Trash',
        component: () => import('@/views/trash/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/views/500.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
