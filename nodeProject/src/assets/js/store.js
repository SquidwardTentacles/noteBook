import Vue from "vue";
import Vuex from "vuex"; //引入 vuex
import store from "./store"; //注册store

Vue.use(Vuex); //使用 vuex

export default new Vuex.Store({
  state: {
    // 初始化状态
    username: 0,
    // 用户访问次数
    count: 0,
    // 注册总人数
    totalUser: 0
  },
  mutations: {
    usernameFunc(state, data) {
      state.username = data;
    },
    countChange(state, data) {
      state.count = data;
    },
    changeTotal(state, data) {
      state.totalUser = data;
    }
  },
  actions: {}
});
