import Vue from "vue";
import axios from "axios";
let url = "http://192.168.0.106:3100";
axios.defaults.baseURL = url;
Vue.prototype.axios = axios;
