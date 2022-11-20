
<template>
    <div>
      <div class="main-page main-page--dark card">
        <h1 class="main-heading">Cocktails</h1>
        <CocktailListItem :cocktail="cocktail" v-for="(cocktail, index) in cocktails" :key="index" />
      </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import store from '@/store';
import CocktailListItem from '@/components/CocktailListItem.vue';

const cocktails = computed(() => store.state.cocktails)
</script>