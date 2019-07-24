import Vue from "vue";
import axios from "axios";
let url = "http://localhost:3100";
// Vue.prototype.HOME = HOME;
axios.defaults.baseURL = url;
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
Vue.prototype.axios = axios;
