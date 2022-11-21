
<template>
    <div>
      <CocktailListItem :cocktail="cocktail" v-for="(cocktail, index) in cocktails" :key="index" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import store from '@/store';
import CocktailListItem from '@/components/CocktailListItem.vue';

const cocktails = computed(() => store.state.cocktails)
</script>