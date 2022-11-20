<template>
    <header>
      <nav class="container">
        <div class="brading">
          <router-link class="branding-link text--primary" :to="{name: 'home'}">
           <span class="text--secondary">Cocktail Recipes</span>
          </router-link>
        </div>
        <div class="nav-links">
          <ul>
            <!-- <router-link class="nav-link" :to="{name: 'Contacts'}">All Contacts</router-link>
            <router-link class="nav-link" :to="{name: 'NewContact'}">Add Contact</router-link>
            <router-link class="nav-link" :to="{name: 'Login'}" v-if="!isLoggedIn">Login/Signup</router-link>
            <p class="nav-link" @click="signOut" v-if="isLoggedIn">Sign Out</p> -->
          </ul>
        </div>
      </nav>
    </header>
  </template>
  
  <script lang="ts" setup>
//   import firebase from "firebase/app";
//   import "firebase/auth";
//   export default {
//     name: 'navigation',
//     components: {
//     },
//     data() {
//       return {
//       }
//     },
//     computed: {
//       isLoggedIn() {
//         return this.$store.state.isLoggedIn;
//       }
//     },
//     methods: {
//       signOut() {
//         firebase.auth().signOut();
//         this.$router.push({name:"Login"});
//       }
//     }
//   }
  </script>
  
  <style lang="scss" scoped>
  header {
    background-color: #fff;
    padding: 1rem 0;
    box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
    margin-bottom: 2rem;
  }
  nav {
    display: flex; 
    align-items: center;
    justify-content: space-between;
  }
    
  .nav-link {
    color: #555;
    margin: 0 0.5rem;
    padding: 0.2rem 0;
    display: inline-block;
    border-bottom: 2px solid transparent;
    &:hover, &:active {
      border-bottom-color:#01c16c;
      cursor: pointer;
    }
  }
  .branding-link {
    font-size: 1.8rem;
    font-weight: 500;
  }
  </style>