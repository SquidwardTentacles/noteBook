<template>
  <div id="app"
       class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  margin-top: 45px;
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
    &.j-end {
      justify-content: flex-end;
    }
    &.j-start {
      justify-content: flex-start;
    }
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.app {
  a {
    text-decoration: none;
  }
  p,
  h1,
  h2,
  h3 {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  ul {
    margin: 0;
  }
  .width {
    max-width: 1400px;
    min-width: 1200px;
    margin: 0 auto;
  }
}
</style>
