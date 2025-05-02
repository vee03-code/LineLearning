// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import the "pages" (components) we want to route to
import LineCodeVisualizer from '@/components/LineCodeVisualizer.vue'
import NrzPage from '@/components/NrzPage.vue'
import RzPage from '@/components/RzPage.vue'
import AmiPage from '@/components/AmiPage.vue'
import ManchesterPage from '@/components/ManchesterPage.vue'
import DiffManchesterPage from '@/components/DiffManchesterPage.vue'
import NotFound  from '@/components/NotFound.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: LineCodeVisualizer
  },
  {
    path: '/nrz',
    name: 'NRZ',
    component: NrzPage
  },
  {
    path: '/rz',
    name: 'RZ',
    component: RzPage
  },
  {
    path: '/ami',
    name: 'AMI',
    component: AmiPage
  },
  {
    path: '/manchester',
    name: 'Manchester',
    component: ManchesterPage
  },
  {
    path: '/differential-manchester',
    name: 'DiffManchester',
    component: DiffManchesterPage
  },
  {
    path: '/:pathMatch(.*)*',      // matches ANY route not listed above
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
