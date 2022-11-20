import { createStore } from 'vuex'
import { ICocktailItem } from '@/types'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase.config'


export default createStore({
  state: {
    cocktails: [{
      name: "this is a test",
      id: 1,
      description: "This is a description",
      ingredients: [
        {
          ingredientName: "Rum",
          measurement: 1,
          otherMeasurementUnit: "shot"
        }
      ],
      instructions: [
        {
          step: 1,
          instruction: "put the shot of rum into the thing"
        },
        {
          step: 2,
          instruction: "put the shot of rum into the thing"
        },
        {
          step: 3,
          instruction: "put the shot of rum into the thing"
        }
      ]
    }] as ICocktailItem[],
    user: {
      isLoggedIn: false,
      userToken: null
    }
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
    SET_USER(state, userToken) {
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
        .then((userCredential) => {
          // Signed in 
          console.log(userCredential)
          context.commit('SET_USER', userCredential.user)
          // const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    // async logOut(context){
    //   await signOut(auth)
    //   context.commit('SET_USER', null)
    // },
    // async fetchUser(context ,user) {
    //   context.commit("SET_LOGGED_IN", user !== null);
    //   if (user) {
    //     context.commit("SET_USER", {
    //       displayName: user.displayName,
    //       email: user.email
    //     });
    //   } else {
    //     context.commit("SET_USER", null);
    //   }
    // }
  },
  modules: {
  }
})
