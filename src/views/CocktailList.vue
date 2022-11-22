
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
  'cuban peach',
  'dark rum',
  'gin',
  'peach schnapps',
  'tequila',
  'vodka',
  'whiskey',
  'white rum',
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

.loading-container { text-align: center;}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>