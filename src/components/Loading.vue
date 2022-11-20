<template>
    <div class="loading">
        <span></span>
    </div>  
</template>

<style lang="scss" scoped>
.loading {
    z-index: 200;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes spin {
    to {
        transform: rotate(360deg);
    }
    }
    span {
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    border: 3px solid transparent;
    border-bottom-color: #fff;
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
    }
}
</style>