import { createStore } from 'vuex'
import { ICocktailItem } from '@/types'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from '@/firebase.config'
import { collection, getDocs, getFirestore, doc, getDoc, query, where } from "firebase/firestore";

export default createStore({
  state: {
    cocktails: [] as ICocktailItem[],
    allCocktails: [] as ICocktailItem[],
    user: {
      isLoggedIn: false,
      userToken: null
    },
    cocktailsIsLoading: false,
    currentCocktail: {} as ICocktailItem,
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.isLoggedIn = value;
    },
    SET_USERTOKEN(state, userToken) {
      state.user.userToken = userToken;
    },
    UPDATE_COCKTAIL(state, payload) {
      state.cocktails = state.cocktails.filter((cocktail) => {
        return cocktail.id !== payload
      })
    },
    SET_CURRENT_COCKTAIL(state, payload) {
      state.currentCocktail = payload
    }
  },
  actions: {
    async logIn(context, { email, password }){
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          context.commit("SET_LOGGED_IN", userCredential.user !== null)
          context.commit('SET_USERTOKEN', userCredential.user.uid)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    async logOut(context){
      await signOut(auth)
      context.commit('SET_USERTOKEN', null)
    },
    async fetchUser(context ,user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USERTOKEN", user.uid);
      } else {
        context.commit("SET_USER", null);
      }
    },
    async getCocktails({ state }) {
      state.cocktailsIsLoading = true;
      const colRef = collection(database, 'cocktails');
      const results = await getDocs(colRef);

      results.forEach((doc) => {
        // Prevent duplicates
        if(!state.allCocktails.some((cocktail) => cocktail.id === doc.id)) {
          const cocktailImage = doc.data().image && doc.data().image.match(/[^/]+(jpg|png|gif|jpeg)$/) ? doc.data().image : ''
          const data = {
            name: doc.data().name, 
            id: doc.id, 
            image: cocktailImage,
            description: doc.data().description, 
            ingredients: doc.data().ingredients, 
            instructions: doc.data().instructions, 
            tags: doc.data().tags
          }
          state.allCocktails.push(data);
        }
      });
      state.cocktails = state.allCocktails
      state.cocktailsIsLoading = false;
    },
    async searchCocktailsByTag({ state }, tags: string[]) {
      state.cocktailsIsLoading = true;
  
      let matchedCocktails = [] as ICocktailItem[]

      if (tags.length === 0) {
        state.cocktails = state.allCocktails;
        state.cocktailsIsLoading = false;
        return
      }

      state.allCocktails.forEach((e) => {
        const containsAll = tags.every(value => {
          return e.tags?.includes(value);
        });
        if (!containsAll) {
          return
        }
        matchedCocktails.push(e)
      })
      state.cocktails = matchedCocktails;
      state.cocktailsIsLoading = false;

      //When dataset gets bigger, query the database like this:
      // const cocktailsRef = collection(database, 'cocktails');
      // const results = query(cocktailsRef, where('tags', 'array-contains', tags));
      // const querySnapshot = await getDocs(results);
      // querySnapshot.forEach((doc) => {
        //map in here
      // })
    },
    async getCocktailById({ commit }, id) {
      const db = getFirestore();
      const docRef = doc(db, "cocktails", id);
      try {
        const docSnap = await getDoc(docRef);
        commit('SET_CURRENT_COCKTAIL', docSnap.data());
      } catch(error) {
          console.log(error)
      }
    }
  },
  modules: {
  }
})
