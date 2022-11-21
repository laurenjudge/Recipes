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
            <div class="cocktail-content" v-if="state.currentCocktail[0].ingredients">
                <h3>Ingredients:</h3>
                    <div class="flex items-center">
                        Serves:
                        <label class="custom-select">
                            <select v-model="state.numberOfServes">
                                <option
                                    v-for="count in 8"
                                    :value="count"
                                >
                                    {{ count }} {{count === 1 ? 'glass' : 'glasses'}}
                                </option>
                            </select>
                        </label>

                        <label class="custom-select ml-2" style="display: none;">
                            <select v-model="state.metricOrImperial">
                                <option value="metric">
                                    Metric
                                </option>
                                <option value="imperial">
                                    Imperial
                                </option>
                            </select>
                        </label>
                    </div>
                <ul>
                    <li v-for="ingredient in state.formattedIngredients">
                        {{ingredient}}
                    </li>
                </ul>
            </div>
            <div class="cocktail-content" v-if="state.currentCocktail[0].instructions">
                <h3>Instructions:</h3>
                <ol>
                    <li v-for="instruction in state.currentCocktail[0].instructions">
                        {{instruction}}
                    </li>
                </ol>
            </div>
            <div class="btn-group">
                <button v-if="store.state.user.isLoggedIn" class="btn btn--danger" @click="onDelete">Delete</button>
                <button v-if="store.state.user.isLoggedIn" class="btn btn--primary" @click="editCocktail">Edit</button>
            </div>
        </div>
    </div>
  </template>
  
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';
import { ICocktailItem } from '@/types';
import Loading from '@/components/Loading.vue';

const route = useRoute ()
const router = useRouter()

const state = reactive({
    isLoading: true,
    currentCocktail: [] as ICocktailItem[],
    numberOfServes: 2,
    formattedIngredients: [] as string[],
    metricOrImperial: 'metric'
})

const mapIngredients = () => {
    const ingredients = state.currentCocktail[0].ingredients
        ingredients.forEach((e) =>{
        const mappedIngredients = ingredients.map((e) => {
            const findIngredientAmount = e.match(/((?<=\[)(.*)(?=\]))/g) // numbers that should be calculated are escaped like: []
            const FindIngredientUnits = e.match(/((?<=\\)(.*)(?=\\))/g) // measurments such as oz are escaped like: \oz\

            if (findIngredientAmount) {
                const convertAmount = parseFloat(findIngredientAmount) * state.numberOfServes
                const formattedAmount = e.replace(/((?<=\[)(.*)(?=\]))/g, convertAmount).replace("[", '').replace("]", '')
                return formattedAmount
            } else {
                return e
            }
        })
        state.formattedIngredients = mappedIngredients
    })
}

onMounted(async () => {
    await store.dispatch('getCocktails')
    state.currentCocktail = await store.state.cocktails.filter((cocktail: ICocktailItem) => {
        return cocktail.id === route.params.id;
    })
    mapIngredients()
    state.isLoading = false
})

watch(() => state.numberOfServes, () => {
    mapIngredients()
});

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
.main-heading { text-align: left; }
.cocktail-content {
    font-size: 1rem;
    h3 {
        font-weight: 400;
        font-size: 1.3rem;
        color: rgba(0,0,0,.6);
    }
}
.ml-2 { margin-left: 2rem; }
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

// Select styles
.custom-select 
{
    margin: 0 0.4rem;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 0 1em rgba(white,0.2), inset 0 0 1px rgba(white,0.8);
    /* Styling the select background */
    background-color: #e0e8ef;

    select 
    {
        width: auto;
        margin: 0;
        padding: 0.5rem 1.7rem 0.5rem 1.2rem;
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 0;
        background-color: transparent;
        /* Styling the select text color */
        color: rgba(0,0,0,.87);

        /* removes the native down arrow */
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 0.01px;
        text-overflow: '';
      
        &::-ms-expand 
        {
            display: none;
        }
      
    }

    &:after 
    {
        position: absolute;
        top: 0.9rem;
        right: 0.55rem;
        /* Styling the down arrow */
        width: 0;
        height: 0;
        padding: 0;
        content: '';
        border-left: .25em solid transparent;
        border-right: .25em solid transparent;
        border-top: .375em solid darken(#e0e8ef,25%);
        pointer-events: none;
    }
}

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