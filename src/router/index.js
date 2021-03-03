import Index from '@/pages/index/index';
import Edit from '@/pages/edit/index';
import Dashboard from '@/pages/dashboard/index';

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
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
    path: '/:pathMatch(.*)*',
    component: Index
  },
]

const router = createRouter({
  routes, // short for `routes: routes`
  history: createWebHashHistory(),
});

export default router;
