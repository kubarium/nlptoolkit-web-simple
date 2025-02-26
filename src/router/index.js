import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  linkActiveClass: 'uk-active',
  linkExactActiveClass: 'uk-active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'catch-all',
      component: Home,
    },
    {
      path: '/TurkishFrameNet',
      name: 'TurkishFrameNet',
      component: () => import('../views/TurkishFrameNet.vue'),
    },
    {
      path: '/TurkishPropBank',
      name: 'TurkishPropBank',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TurkishPropBank.vue'),
    },
  ],
})

router.afterEach((to, from) => {
  const component = to.matched[0]?.components?.default

  if (component && component.metaInfo) {
    to.meta = component.metaInfo
  }

})

export default router
