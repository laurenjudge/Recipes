<template>
    <Loading v-if="state.isLoading"/>
    <div class="main-page main-page--dark card" v-else-if="state.currentCocktail.length > 0">
        <div class="row header-container">
            <div class="img-container">
                <div class="img-container-inner">
                    <img class="img" :src="state.currentCocktail[0].image" :alt="'image of ' + state.currentCocktail[0].name">
                </div>
            </div>
            <h1 class="main-heading">
                {{state.currentCocktail[0].name}}
                <p v-if="state.currentCocktail[0].description" class="description">
                    {{ state.currentCocktail[0].description }}
                </p>
            </h1>
        </div>
        <div class="cocktail-wrapper card">
          <div class="cocktail-content">
            <span>Ingredients:</span>
            <p class="cocktail-details" v-if="state.currentCocktail[0].ingredients">
              {{ state.currentCocktail[0].ingredients }} 
            </p>
            <span>Instructions:</span>
            <p class="cocktail-details" v-if="state.currentCocktail[0].instructions">
              {{ state.currentCocktail[0].instructions }} 
            </p>
          </div>
          <div class="btn-group">
            <button v-if="store.state.user.isLoggedIn" class="btn btn--danger" @click="onDelete">Delete</button>
            <button v-if="store.state.user.isLoggedIn" class="btn btn--primary" @click="editCocktail">Edit</button>
          </div>
        </div>
    </div>
  </template>
  
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';
import { ICocktailItem } from '@/types';
import Loading from '@/components/Loading.vue';

const route = useRoute ()
const router = useRouter()

const state = reactive({
    isLoading: true,
    currentCocktail: [] as ICocktailItem[]
})

onMounted(async () => {
    await store.dispatch('getCocktails')
    state.currentCocktail = await store.state.cocktails.filter((cocktail: ICocktailItem) => {
        return cocktail.id === route.params.id;
    })
    state.isLoading = false
})


const onDelete = () => {
    // state.isLoading = true
    // store.dispatch("deletecocktail", state.currentCocktail[0].id);
    // router.push({name:"home"});
    // state.isLoading = false
}

const editCocktail = () => {
    // router.push({ name:"Editcocktail", params: { id: state.currentCocktail[0].id } });
}
</script>
  
<style lang="scss" scoped>
.cocktail-wrapper {
    &.card {background: #fff;}
}
.cocktail-content {
    font-size: 1.2rem;
    text-align: center;
    span {
    font-weight: bold;
    display: block;
    }
}
.description {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
    margin-top: 0.5rem;
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
</style>