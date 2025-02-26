import { createRouter, createWebHistory } from 'vue-router'
import TurkishFramenet from '../views/TurkishFramenet.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TurkishFramenet,
      meta: { language: "Turkish", toolkit: "FrameNet" }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from) => {

})

export default router
