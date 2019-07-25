import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import elementUi from "element-ui";
import store from "./assets/js/store";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/js/axios";
Vue.use(elementUi);

router.beforeEach((to, from, next) => {
  if (!window.sessionStorage.getItem("username") && to.path !== "/") {
    next({ path: "/" });
  } else {
    next();
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
