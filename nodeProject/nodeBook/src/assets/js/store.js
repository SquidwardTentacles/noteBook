import Vue from "vue";
import Vuex from "vuex"; //引入 vuex
// import store from "./store"; //注册store

Vue.use(Vuex); //使用 vuex
let setItemL = (name, data) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};
let getitemL = name => {
  return JSON.parse(sessionStorage.getItem(name));
};
export default new Vuex.Store({
  state: {
    // 初始化状态
    username: 0,
    // 用户访问次数
    count: 0,
    // 注册总人数
    totalUser: 0
  },
  getters: {
    getusername(state) {
      let username = getitemL("username");
      state.username = username;
      return state.username;
    },
    getCount(state) {
      let count = getitemL("count");
      state.count = count;
      return state.count;
    },
    getTotalUser(state) {
      let totalUser = getitemL("totalUser");
      state.totalUser = totalUser;
      return state.totalUser;
    }
  },
  mutations: {
    usernameFunc(state, data) {
      state.username = data;
      setItemL("username", state.username);
    },
    countChange(state, data) {
      state.count = data;
      setItemL("count", state.count);
    },
    changeTotal(state, data) {
      state.totalUser = data;
      setItemL("totalUser", state.totalUser);
    }
  },
  actions: {}
});
