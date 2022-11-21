<template>
    <header>
      <nav>
        <div class="brading">
          <router-link class="branding-link text--primary" :to="{name: 'home'}">
           <span class="text--secondary">Cocktail Recipes</span>
          </router-link>
        </div>
      </nav>
    </header>
  </template>

<script lang="ts" setup>

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
    padding: 0 2rem;
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

  @media only screen and (max-width: 600px) {
        .branding-link { font-size: 1.4rem;}
        nav { padding: 0 1.2rem }
    }
</style>