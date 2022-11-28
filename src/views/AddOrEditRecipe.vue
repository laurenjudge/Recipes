<template>
    <!-- copied over recipe details page for now. Update later -->
    <div class="loading-container" v-if="state.isLoading" style="margin-top: 30%;">
        <div class="lds-dual-ring"></div>
    </div>
    <div class="card container" v-else-if="state.currentCocktail">
        <div class="row header-container">
            <div class="img-container">
                <div class="img-container-inner">
                    <img class="img" :src="state.currentCocktail.image" :alt="'image of ' + state.currentCocktail.name">
                </div>
            </div>
            <h1 class="main-heading">
                {{state.currentCocktail.name}}
                <div class="flex flex-wrap description" v-if="state.currentCocktail.tags && state.currentCocktail.tags?.length > 0">
                    <p v-for="tag, i in state.currentCocktail.tags">
                        {{ tag }} <span v-if="i + 1 < state.currentCocktail.tags.length" class="pill-span">|</span>
                    </p>
                </div>
            </h1>
        </div>
        <div class="cocktail-wrapper-card">
            <div class="cocktail-content" v-if="state.currentCocktail.ingredients">
                <h3 class="text--underline">
                    Ingredients:
                </h3>
                <div class="flex items-center dropdown-menu-row">
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
                    <li v-for="ingredient in state.formattedIngredients" class="ingredients-item">
                        {{ingredient}}
                    </li>
                </ul>
            </div>
            <div class="cocktail-content" v-if="state.currentCocktail.instructions">
                <h3 class="text--underline cocktail-content--instructions-heading">
                    Instructions:
                </h3>
                <ol>
                    <li v-for="instruction in state.currentCocktail.instructions" class="instructions-item">
                        {{instruction}}
                    </li>
                </ol>
            </div>
            <!-- <div class="btn-group">
                <button v-if="store.state.user.isLoggedIn" class="btn btn--danger" @click="onDelete">Delete</button>
                <button v-if="store.state.user.isLoggedIn" class="btn btn--primary" @click="editCocktail">Edit</button>
            </div> -->
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';
import { IRecipeItem } from '@/types';

const route = useRoute()
const router = useRouter()

const state = reactive({
    isLoading: true,
    currentCocktail: {} as IRecipeItem,
    numberOfServes: 2,
    formattedIngredients: [] as string[],
    metricOrImperial: 'metric'
})

const mapIngredients = () => {
    const ingredients = state.currentCocktail.ingredients
        ingredients.forEach((e) =>{
        const mappedIngredients = ingredients.map((e) => {
            const findIngredientAmount: RegExpMatchArray | null = e.match(/((?<=\[)(.*)(?=\]))/g) // numbers that should be calculated are escaped like: []
            //Todo: convert recipes from imperial to metric
            const FindIngredientUnits = e.match(/((?<=\\)(.*)(?=\\))/g) // measurments such as oz are escaped like: \oz\

            if (findIngredientAmount) {
                const ingredientAmount: number = parseFloat(findIngredientAmount[0]);
                const convertAmount = ingredientAmount * state.numberOfServes
                // Only keep decimal places if number is not a whole number
                const roundConvertedAmount: string = convertAmount % 1 === 0 ? convertAmount.toString() : convertAmount.toFixed(1)
                const formattedAmount = e.replace(/((?<=\[)(.*)(?=\]))/g, roundConvertedAmount).replace("[", '').replace("]", '')
                return formattedAmount
            } else {
                return e
            }
        })
        state.formattedIngredients = mappedIngredients
    })
}

onMounted(async () => {
    await store.dispatch('getCocktailById', route.params.id)
    state.currentCocktail = store.state.currentCocktail
    state.numberOfServes = store.state.currentCocktail.originalNumberOfServes ? store.state.currentCocktail.originalNumberOfServes : 2
    mapIngredients()
    state.isLoading = false
})

watch(() => state.numberOfServes, () => {
    mapIngredients()
});

const onDelete = () => {
    // state.isLoading = true
    // store.dispatch("deletecocktail", state.currentCocktail.id);
    // router.push({name:"home"});
    // state.isLoading = false
}

const editCocktail = () => {
    // router.push({ name:"Editcocktail", params: { id: state.currentCocktail.id } });
}
</script>
  
<style lang="scss" scoped>
ul,
ol {
    padding-left: 1rem;
}
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

.dropdown-menu-row { margin: 0.5rem 0; }
.instructions-item { margin-bottom: 0.8rem;}
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