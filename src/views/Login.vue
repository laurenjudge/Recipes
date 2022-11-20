<template>
  <div class="card main-page">
    <Loading v-if="state.isLoading"/>
    <form action="" class="form">
      <h1 class="main-heading">Login</h1>
      <div class="form__inputs">
        <input class="form__text-input" type="text" placeholder="Email" v-model="email">
        <input class="form__text-input" type="password" placeholder="Password" v-model="password">
        <p v-show="error !== ''" class="form__error">{{ error }}</p>
        <button @click.prevent="Login" class="btn btn--primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Loading from "@/components/Loading.vue";

const state = reactive({
  isLoading: false
})

const email = ref('')
const password = ref('')
const error = ref('')

const store = useStore()
const router = useRouter()

const Login = async () => {
  state.isLoading = true
  try {
    await store.dispatch('logIn', {
      email: email.value,
      password: password.value
    })
    router.push('/')
    state.isLoading = false
  }
  catch (err: any) {
    error.value = err.message
    state.isLoading = false
  }
}
//Old method:
// const signin = async () => {
//     state.isLoading = true;
//     if(email !== "" && password !== "") {
//       firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(()=> {
//           router.push({name:"Contacts"});
//           error.value = "";
//           console.log(firebase.auth().currentUser.uid)
//         }).catch((err) => {
//           error.value = err.message;
//           state.isLoading = false;
//         })
//     } else {
//       state.isLoading = false;
//       error.value = "Please fill in all fields"
//     }
//   }

// import Loading from "../components/Loading";
// import firebase from "firebase/app";
// import database from "../firebase/firebaseConfig";
// import "firebase/auth";
// export default {
//   name: "Login",
//   data() {
//     return {
//       email: "",
//       password: "",
//       isLoading: false,
//       errorMessage: ""
//     }
//   },
//   components: { 
//     Loading
//   },
//   methods: {
//     async signin() {
//       this.isLoading = true;
//       if(this.email !== "" && this.password !== "") {
//         firebase.auth().signInWithEmailAndPassword(this.email, this.password)
//           .then(()=> {
//             this.$router.push({name:"Contacts"});
//             this.errorMessage = "";
//             console.log(firebase.auth().currentUser.uid)
//           }).catch((err) => {
//             this.errorMessage = err.message;
//             this.isLoading = false;
//           })
//       } else {
//         this.isLoading = false;
//         this.errorMessage = "Please fill in all fields"
//       }
//     }
//   }
// }
</script>

<style lang="scss" scoped>
  .btn { margin-top: 1.5rem; }
</style>