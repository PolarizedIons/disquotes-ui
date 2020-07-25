<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import { meModule, guildModule } from "@/store";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  private refresh() {
    meModule.refreshTokensAndMe().then(() => {
      guildModule.fetchGuilds();
    });
  }

  created() {
    const savedUser = localStorage.getItem("saved_user");
    meModule.setMe(savedUser ? JSON.parse(savedUser) : null);
    setTimeout(() => {
      this.refresh();
    }, 100);
    setInterval(() => {
      this.refresh;
    }, 5 * 60 * 1000);
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Raleway:wght@400;500&display=swap");

html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;

  font-family: "Raleway", sans-serif !important;
  font-weight: 400 !important;

  background: theme("colors.gray.900");
  color: theme("colors.gray.300");
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500 !important;
}

.quote a {
  color: theme("colors.blue.700") !important;
}
.quote a:hover {
  color: theme("colors.blue.600") !important;
}
</style>
