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
    }, {
      path: '/:pathMatch(.*)*',
      name: 'catch-all',
      component: Home,
    }, {
      path: '/TurkishFrameNet',
      name: 'TurkishFrameNet',
      component: () => import('../views/TurkishFrameNet.vue'),
    }, {
      path: '/TurkishPropBank',
      name: 'TurkishPropBank',
      component: () => import('../views/TurkishPropBank.vue'),
    }, {
      path: '/TurkishWordNet',
      name: 'TurkishWordNet',
      component: () => import('../views/TurkishWordNet.vue'),
    }, {
      path: '/TurkishSentiNet',
      name: 'TurkishSentiNet',
      component: () => import('../views/TurkishSentiNet.vue'),
    }, {
      path: '/TurkishDictionary',
      name: 'TurkishDictionary',
      component: () => import('../views/TurkishDictionary.vue'),
    },
  ],
})

router.afterEach((to, from) => {
  const component = to.matched[0]?.components?.default

  if (component && component.meta) {
    to.meta = component.meta
  }

})

export default router
