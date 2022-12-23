<template>
    <router-link
        class="food-recipe-list-item card"
        :to="{name:'food-recipe-details', params: { id: props.foodRecipe.id }}"
    >
        <div class="inner">
        <div class="img-container">
            <div class="img-container-inner">
                <img class="img" :src="props.foodRecipe.image" :alt="'image of ' + props.foodRecipe.name">
            </div>
        </div>
        <div class="food-recipe-item-text">
            <h2 v-if="props.foodRecipe.name">
            {{ props.foodRecipe.name }}
            </h2>
            <div class="flex flex-wrap" v-if="props.foodRecipe.tags && props.foodRecipe.tags?.length > 0">
            <p v-for="tag, i in props.foodRecipe.tags">
                {{ tag }} <span v-if="i + 1 < props.foodRecipe.tags.length" class="pill-span">|</span>
            </p>
            </div>
        </div>
        </div>
    </router-link>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue'
import { IRecipeItem } from '@/types';

const props = withDefaults(
defineProps<{
    foodRecipe: IRecipeItem
}>(),
{}
)

</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 0.2rem;
}
.food-recipe-list-item {
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