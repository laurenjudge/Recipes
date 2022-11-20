import { createStore } from 'vuex'
import { ICocktailItem } from '@/types'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from '@/firebase.config'
import { collection, getDocs } from "firebase/firestore";

export default createStore({
  state: {
    cocktails: [] as ICocktailItem[],
    user: {
      isLoggedIn: false,
      userToken: null
    },
    cocktailsLoaded: false
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
    }
  },
  actions: {
    async logIn(context, { email, password }){
      // const response = await auth.signInWithEmailAndPassword(email, password)
      // if (response) {
      //     context.commit('SET_USER', response.user)
      // } else {
      //     throw new Error('login failed')
      // }
      // const getAuth = auth;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          console.log(userCredential.user)
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
      // const db = await cocktailsDB;
      const colRef = collection(database, 'cocktails');
      const results = await getDocs(colRef);

      console.log(results)
      results.forEach((doc) => {
        // Prevent duplicates
        if(!state.cocktails.some((cocktail) => cocktail.id === doc.id)) {
          const data = {
            name: doc.data().name, 
            id: doc.id, 
            description: doc.data().description, 
            ingredients: doc.data().ingredients, 
            instructions: doc.data().instructions, 
            tags: doc.data().tags
          }
          state.cocktails.push(data);
        }
      });
      state.cocktailsLoaded = true;
    },
  },
  modules: {
  }
})
