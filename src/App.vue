<template>
  <div class="background-filter">
    <Navigation/>
    <div class="main-content-area">
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
$primary: #42b883;
$secondary: #35495e;
$tertiary: #425b76;
$accent: #a1b5d8;
$background--dark: #394c61;
$tertiary--light: #95A3B2;
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
  color: rgba(0,0,0,.87);
}
#app {
  background-image: url("./assets/images/background-image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
.background-filter {
  min-height: 100vh;
  background-color: #34343466;
}
a {
  text-decoration: none;
  color: inherit;
}
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
  max-width: 600px;
  width: 90%;
  margin: 2rem auto 0 auto;
}
.main-content-area {
  padding-bottom: 2rem;
}
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.row { display: flex; }
.text--primary { color: $primary; }
.text--secondary { color: $secondary; }
.text--white { color: $white; }
.text--underline { text-decoration: underline; }
.card {
  padding: 1rem;
  border-radius: 8px;
  background: #ffffffcc;
  backdrop-filter: blur(2px);
  -webkit-box-shadow: 5px 5px 15px 5px rgb(0 0 0 / 25%);
  box-shadow: 5px 5px 15px 5px rgb(0 0 0 / 25%);
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
@media only screen and (max-width: 600px) {
    .main-heading { font-size: 1.8rem; }
    body { font-size: 0.9rem; }
    .row { flex-direction: column; }
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

label.custom-select {
  position: relative;
  display: inline-block;
}

.custom-select select {
  display: inline-block;
  border: 2px solid $tertiary--light;
  padding: 4px 3px 3px 5px;
  margin: 0;
  font: inherit;
  outline:none; /* remove focus ring from Webkit */
  line-height: 1.2;
  background: #f8f8f8;
  
  -webkit-appearance:none; /* remove the strong OSX influence from Webkit */
  
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin-left: 0.3rem;
}

/* for Webkit's CSS-only solution */
@media screen and (-webkit-min-device-pixel-ratio:0) { 
  .custom-select select {
      padding-right:30px;    
  }
}

/* Select arrow styling */
.custom-select:after {
    content: "▼";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 60%;
    line-height: 30px;
    padding: 0 7px;
    background: $tertiary--light;
    color: white;
    
    pointer-events:none;
    
    -webkit-border-radius: 0 6px 6px 0;
    -moz-border-radius: 0 6px 6px 0;
    border-radius: 0 6px 6px 0;
}

.no-pointer-events .custom-select:after {
    content: none;
}
</style>