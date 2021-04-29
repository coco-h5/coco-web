import Index from '@/pages/index/index';
import Edit from '@/pages/edit/index';
import Dashboard from '@/pages/dashboard/index';
import Intro from '@/pages/intro/index';

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: Index
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/',
    component: Intro
  },
  {
    path: '/:pathMatch(.*)*',
    component: Intro
  },
]

const router = createRouter({
  routes, // short for `routes: routes`
  history: createWebHashHistory(),
});

export default router;
