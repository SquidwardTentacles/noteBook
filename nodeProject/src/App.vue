<template>
  <div id="app">
    <div class="usersessonB" v-show="this.$store.state.username">
      <transition name="fade">
        <div
          @mouseenter="loginOut = 1"
          @mouseleave="loginOut = 0"
          class="user-sesson"
        >
          <p>{{ this.$store.state.username }}</p>
          <p class="log-out" @click="logoOutClick" v-if="loginOut">退出登录</p>
        </div>
      </transition>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginOut: 0
    };
  },
  methods: {
    logoOutClick() {
      window.sessionStorage.clear("username");
      this.$store.commit("usernameFunc", "");
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

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
    &.j-end {
      justify-content: flex-end;
    }
  }
  .usersessonB {
    .user-sesson {
      margin-top: 35px;
    }
    div {
      margin-right: 10px;
      border: 1px solid #409eff;
      background-color: #fff;
      border-radius: 5px;
      position: fixed;
      right: 0;
      top: 2px;
      width: 70px;
      z-index: 1000;
      padding: 10px;
    }
    p {
      margin: 0;
      padding: 0;
      width: auto;
      cursor: pointer;
      color: #409eff;
      border-radius: 5px;
      font-size: 14px;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
}
</style>
