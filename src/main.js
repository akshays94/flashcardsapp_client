import Vue from "vue";
import App from "./App.vue";
import { Dialog, Toast } from "buefy";
import "./index.css";
import "buefy/dist/buefy.css";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Dialog);
Vue.use(Toast);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
