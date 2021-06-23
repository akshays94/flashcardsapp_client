import Vue from "vue";
import App from "./App.vue";
import { Dialog, Toast, Sidebar, Input, Field, Table, Tag, Modal } from "buefy";
import "./index.css";
import "animate.css";
import "buefy/dist/buefy.css";
import router from "./router";
import store from "./store";
import titleMixin from "./titleMixin";

Vue.config.productionTip = false;

Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Sidebar);
Vue.use(Field);
Vue.use(Input);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Modal);

Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
