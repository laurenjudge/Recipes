import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CocktailList from '../views/CocktailList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CocktailList
  },
  {
    path: '/food-recipes',
    name: 'food-recipes',
    component: () => import(/* webpackChunkName: "food-recipes" */ '../views/FoodRecipeList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/food-recipe/:id',
    name: 'food-recipe-details',
    component: () => import(/* webpackChunkName: "food-recipe-details" */ '../views/FoodRecipeDetailsPage.vue')
  },
  {
    path: '/cocktail-recipe/:id',
    name: 'cocktail-details',
    component: () => import(/* webpackChunkName: "cocktail-details" */ '../views/CocktailDetailsPage.vue')
  },
  {
    path: '/cocktails/edit/:id',
    name: 'edit-recipe',
    component: () => import(/* webpackChunkName: "edit-recipe" */ '../views/AddOrEditRecipe.vue')
  },
  {
    path: '/create-recipe',
    name: 'create-recipe',
    component: () => import(/* webpackChunkName: "create-recipe" */ '../views/AddOrEditRecipe.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
