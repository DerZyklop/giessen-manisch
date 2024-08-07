import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Gießen Manisch Wörterbuch',
      component: HomeView,
      children: [
        {
          path: '/translation/manisch/:manischId/',
          name: 'manisch to german',
          props: true,
          // component: () => import('../views/ItemView.vue')
          component: HomeView
        },
        {
          path: '/translation/german/:germanId/',
          name: 'german to manisch',
          props: true,
          // component: () => import('../views/ItemView.vue')
          component: HomeView
        },
        {
          path: '/search/:searchText/',
          name: 'Gießen Manisch Wörterbuch – Suche',
          props: true,
          component: HomeView
        },    
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  ]
})

export default router
