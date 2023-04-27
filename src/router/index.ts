import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Gießen Manisch Wörterbuch',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/translation/:id/',
      name: 'translation',
      props: true,
      // component: () => import('../views/ItemView.vue')
      component: HomeView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  ]
})

export default router
