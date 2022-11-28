
<template>
<div class="container main-content-area">
        <div class="loading-container" v-if="isLoading">
            <div class="lds-dual-ring"></div>
        </div>
        <FoodRecipeListItem
            :foodRecipe="foodRecipe"
            v-for="(foodRecipe, index) in foodRecipes" :key="index"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import store from '@/store';
import FoodRecipeListItem from '@/components/FoodRecipeListItem.vue';

const foodRecipes = computed(() => store.state.allFoodRecipes)

const isLoading = computed(() => store.state.foodRecipesAreLoading)

onMounted(() => {
  store.dispatch("getFoodRecipes")
})

</script>
