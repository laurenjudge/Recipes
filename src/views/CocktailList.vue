
<template>
   <div class="search-bar-container">
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
import { computed, onMounted } from 'vue'
import store from '@/store';
import CocktailListItem from '@/components/CocktailListItem.vue';
import Multiselect from '@vueform/multiselect'

const cocktails = computed(() => store.state.cocktails)

const isLoading = computed(() => store.state.cocktailsIsLoading)

onMounted(() => {
  store.dispatch('resetCocktailSearchState')
})

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
  padding-top: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  // backdrop-filter: blur(2px); //messes up stacking order (figure out later)
  box-shadow: 5px 5px 15px 5px rgb(0 0 0 / 25%);

  :deep(.multiselect) {
    border-color: $tertiary
  }
  :deep(.multiselect-caret) {
    background-color: $tertiary;
  }
  :deep(.multiselect-tag) {
    background-color: $accent;
  }
  :deep(.multiselect-caret, .multiselect-clear-icon) {
    background-color: $tertiary--light;
  }
  :deep(.multiselect-tags-search) {
    height: 100%;
    margin: 0;
  }
  :deep(.multiselect.is-active) {
    box-shadow: 0px 0px 5px 0px #95A3B2;
  }
  :deep(.multiselect) {
    max-width: 600px;
    width: 90%;
  }
}
</style>