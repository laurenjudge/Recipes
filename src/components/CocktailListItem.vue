<template>
<div class="cocktail-wrapper card">
    <div class="cocktail-content">
    <h2 v-if="props.cocktail.name">{{ props.cocktail.name }}</h2>
    <!-- <p v-if="cocktail.cocktailAddress">Address: {{ cocktail.cocktailAddress }} </p>
    <p v-if="cocktail.cocktailPhone">Phone Number: {{ cocktail.cocktailPhone }} </p> -->
    <!-- <router-link class="primary-link" :to="{name:'ViewCocktail', params: { id: props.cocktail.id }}">More details</router-link> -->
    </div>
</div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { ICocktailItem } from '@/types';

const props = withDefaults(
  defineProps<{
    cocktail: ICocktailItem
  }>(),
  {}
)

</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 0.2rem;
}
.cocktail-wrapper {
    margin: 1rem 0;  
    background-color: #fff;
}
</style>