<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .flexbox {
    display: flex;
    justify-content: space-around;
    align-items: center;

    &.between {
      justify-content: space-between;
    }
    &.a-start {
      align-items: flex-start;
    }
    &.j-center {
      justify-content: center;
    }
  }
}
</style>
