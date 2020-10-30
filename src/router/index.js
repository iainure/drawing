import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
