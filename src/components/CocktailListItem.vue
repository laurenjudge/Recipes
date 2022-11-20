<template>
<div class="cocktail-wrapper card">
    <div class="cocktail-content">
      <img class="cocktail-image" :src="props.cocktail.image" :alt="'image of ' + props.cocktail.name">
      <h2 v-if="props.cocktail.name">{{ props.cocktail.name }}</h2>
      <p v-if="props.cocktail.description">{{ props.cocktail.description }} </p>
      <router-link class="primary-link" :to="{name:'cocktail-details', params: { id: props.cocktail.id }}">More details</router-link>
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
.cocktail-image {
  width: 100px;
  height:100px;
}
</style>