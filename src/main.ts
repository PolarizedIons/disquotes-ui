import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';

import "@/assets/css/tailwind.css";
import SecurityService from "./services/SecurityService";
import { User } from "./models/User";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
  // methods: {
  //   initialMe() {
  //     const savedUser = localStorage.getItem("saved_user");
  //     this.me = savedUser ? JSON.parse(savedUser) : null;
  //   },
  //   refreshMe() {
  //     SecurityService.refreshLogin().then(me => {
  //       this.me = me;
  //       localStorage.setItem("saved_user", JSON.stringify(me));
  //     });
  //   }
  // },
  // created() {
  //   this.initialMe();
  //   setTimeout(() => {
  //     this.refreshMe();
  //   }, 100);
  //   setInterval(() => this.refreshMe(), 5 * 60 * 1000);
  // }
}).$mount("#app");
