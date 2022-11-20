import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CocktailList from '../views/CocktailList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CocktailList
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/cocktail-recipe/:id',
    name: 'cocktail-details',
    component: () => import(/* webpackChunkName: "cocktail-details" */ '../views/CocktailDetailsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
