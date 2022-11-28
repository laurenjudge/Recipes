<template>
    <div class="loading-container" v-if="state.isLoading" style="margin-top: 30%;">
        <div class="lds-dual-ring"></div>
    </div>
    <div class="card container" v-else-if="state.currentFoodRecipe">
        <div class="row header-container">
            <div class="img-container">
                <div class="img-container-inner">
                    <img class="img" :src="state.currentFoodRecipe.image" :alt="'image of ' + state.currentFoodRecipe.name">
                </div>
            </div>
            <h1 class="main-heading">
                {{state.currentFoodRecipe.name}}
                <div class="flex flex-wrap description" v-if="state.currentFoodRecipe.tags && state.currentFoodRecipe.tags?.length > 0">
                    <p v-for="tag, i in state.currentFoodRecipe.tags">
                        {{ tag }} <span v-if="i + 1 < state.currentFoodRecipe.tags.length" class="pill-span">|</span>
                    </p>
                </div>
            </h1>
        </div>
        <div class="cocktail-wrapper-card">
            <div class="cocktail-content" v-if="state.currentFoodRecipe.ingredients">
                <h3 class="text--underline">
                    Ingredients:
                </h3>
                <div class="flex items-center number-of-servings" v-if="state.currentFoodRecipe.numberOfServings">
                    {{ state.currentFoodRecipe.numberOfServings }}
                </div>
                <ul>
                    <li v-for="ingredient in state.currentFoodRecipe.ingredients" class="ingredients-item">
                        {{ingredient}}
                    </li>
                </ul>
            </div>
            <div class="cocktail-content" v-if="state.currentFoodRecipe.instructions">
                <h3 class="text--underline cocktail-content--instructions-heading">
                    Instructions:
                </h3>
                <ol>
                    <li v-for="instruction in state.currentFoodRecipe.instructions" class="instructions-item">
                        {{instruction}}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import store from '@/store';
import { IRecipeItem } from '@/types';

const route = useRoute()

const state = reactive({
    isLoading: true,
    currentFoodRecipe: {} as IRecipeItem,
})

onMounted(async () => {
    await store.dispatch('getFoodRecipeByID', route.params.id)
    state.currentFoodRecipe = store.state.currentFoodRecipe
    state.isLoading = false
})
</script>
  
<style lang="scss" scoped>
ul,
ol {
    padding-left: 1rem;
}

ul li {
    margin-bottom: 0.3rem;
}

.container { background-color: #fff; }
.cocktail-wrapper-card {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 0.5rem;
}
.main-heading { text-align: left; }
.cocktail-content {
    font-size: 1rem;
    h3 {
        font-weight: 600;
        font-size: 1.3rem;
        color: rgba(0, 0, 0, 0.8);
    }
    &--instructions-heading {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
}
.ml-2 { margin-left: 2rem; }
.description {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
    margin-top: 0.5rem;
}
.pill-span {
  padding: 0 0.3rem;
}
.cocktail-details {
    margin-bottom: 1rem;
}
.btn-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.btn--danger {
    margin-right: 0.8rem;
}
.header-container {
    margin-bottom: 1rem;
}
.img-container {
	position: relative;
	padding-bottom: 0;
	overflow: hidden;
	height: 150px;
    width: 150px;
    margin-right: 1.5rem;
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
.instructions-item { margin-bottom: 0.8rem;}
.number-of-servings { margin: 0.3rem 0 0.8rem;}
@media only screen and (max-width: 600px) {
    .cocktail-content h3 { font-size: 1.2rem;}
    .description { font-size: 0.8rem; }
    .img-container {
        width: 100%;
        height: 210px;
        margin-right: 0;
    }
    .img-container-inner { padding-bottom: 90%; }
}
</style>