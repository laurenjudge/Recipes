<template>
  <router-link
    class="cocktail-list-item card"
    :to="{name:'cocktail-details', params: { id: props.cocktail.id }}"
  >
    <div class="inner">
      <div class="img-container">
        <div class="img-container-inner">
            <img class="img" :src="props.cocktail.image" :alt="'image of ' + props.cocktail.name">
        </div>
      </div>
      <div class="cocktail-item-text">
        <h2 v-if="props.cocktail.name">
          {{ props.cocktail.name }}
        </h2>
        <div class="flex flex-wrap" v-if="props.cocktail.tags && props.cocktail.tags?.length > 0">
          <p v-for="tag, i in props.cocktail.tags">
            {{ tag }} <span v-if="i + 1 < props.cocktail.tags.length" class="pill-span">|</span>
          </p>
        </div>
      </div>
    </div>
  </router-link>
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
.cocktail-list-item {
  margin: 1rem 0;  
  // background-color: #fff;
  display: block;
}
.inner {
  display: flex;
}
.img-container {
	position: relative;
	padding-bottom: 0;
	overflow: hidden;
  width: 100px;
  margin-right: 0.9rem;
  border-radius: 5px;
}
.img-container-inner {
	padding-bottom: 100%; //set as you like
	width: 100%;
  position: relative;
}
.img {
	object-fit: cover;
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	overflow: hidden;
}

.cocktail-item-text {
  width: 80%;
  h2 {
    font-size: 1.3rem;
  }
  p {
    color: rgba(0,0,0,.6);
    font-size: 0.9rem;
  }
}
.pill-span {
  padding: 0 0.3rem;
}
</style>