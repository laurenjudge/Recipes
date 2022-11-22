
<template>
   <div class="search-bar-container container">
      <Multiselect
        v-model="multiselectSearchValue"
        mode="tags"
        placeholder="Search recipes"
        :searchable="true"
        :options="multiselectSearchOptions"
        :createTag="true"
        @change="handleSearchChange"
      />
    </div>
    <div class="container main-content-area">
      <div class="loading-container" v-if="isLoading">
        <div class="lds-dual-ring"></div>
      </div>
      <CocktailListItem
        :cocktail="cocktail"
        v-for="(cocktail, index) in cocktails" :key="index"
      />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import store from '@/store';
import CocktailListItem from '@/components/CocktailListItem.vue';
import Multiselect from '@vueform/multiselect'

const cocktails = computed(() => store.state.cocktails)

const isLoading = computed(() => store.state.cocktailsIsLoading)

const multiselectSearchValue = null
const multiselectSearchOptions = [
  'dark rum',
  'gin',
  'peach schnapps',
  'tequila',
  'vodka',
  'whiskey',
  'white rum',
  'simple syrup',
  'oranges',
  'lime',
  'peaches',
  'strawberries',
]

const handleSearchChange = (selectedTags: string[]) =>{
  store.dispatch('searchCocktailsByTag', selectedTags)
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
$primary: #42b883;
$secondary: #35495e;
$tertiary: #425b76;
$accent: #a1b5d8;
$background--dark: #394c61;
$tertiary--light: #95A3B2;
$danger: #de0000;
$danger--light: #ca4b4b;
$white: #fff;
.search-bar-container {
  padding-bottom: 2rem;

  :deep(.multiselect-tags-search) {
    height: 100%;
    margin: 0;
  }
  :deep(.multiselect) {
    max-width: 600px;
  }
}
</style>