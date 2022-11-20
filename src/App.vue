<template>
  <div id="app">
    <Navigation/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import store from '@/store';
import { onMounted } from 'vue'
import Navigation from './components/Navigation.vue';

onMounted(() => {
  store.dispatch("getCocktails")
  // firebase.auth().onAuthStateChanged((user) => {
  //   this.$store.commit("updateIsLoggedIn", user);
  //   if(user) {
  //     this.$store.dispatch("getUser");
  //   }
  // })
})
</script>

<style lang="scss">
$primary: #2196f3;
$secondary: #35495E;
$background--dark: #394c61;
$danger: #de0000;
$danger--light: #ca4b4b;
$white: #fff;
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.3;
}
#app {
  background-image: url("./assets/images/background-image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
a { text-decoration: none; }
.primary-link {
  margin-top: 0.5rem;
  display: inline-block;
  color: $primary;
  border-bottom: 2px solid transparent;
  &:active, &:hover, &:focus {
    color: $primary;
    border-bottom: 2px solid $primary;
  }
}
.container {
  max-width: 90%;
  margin: 0 auto;
}
.row { display: flex; }
.text--primary { color: $primary; }
.text--secondary { color: $secondary; }
.card {
  padding: 1rem;
  box-shadow: 0px 2px 1px -1px rgba(0 ,0, 0, 0.2), 
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}
.main-page {
  margin: 0 auto;
  background: $white;
  &--dark.main-page { 
    background: $background--dark;
    .main-heading {
      color: $white;
    }
  }
}
.main-heading {
  margin: 0.5rem 0 1.5rem;
  text-align: center;
}
.btn {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0,.14), 0px 1px 5px 0px rgba(0, 0, 0, .12);
  border: none;
  padding: 0.8rem 1rem;
  align-self: flex-end;
  border-radius: 3px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  &--primary { 
    background-color: $primary; 
  }
  &--danger { 
    background-color: $danger--light; 
  }
}
.form {
  width: 80%;
  margin: 0 auto;
  &__link {
    text-align: center;
    font-weight: bold;
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
  &__error {
    text-align: center;
    padding: 0 8px;
    color: $danger;
    margin: 1rem 0;
  }
}
input {
    width:100%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 0;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
    &:focus{
    border-color: $primary;
    box-shadow:0 0 1px 0 $primary;
  }
}
  
</style>