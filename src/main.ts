import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";

import "@vuikit/theme";

Vue.use(Vuikit);
Vue.use(VuikitIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
