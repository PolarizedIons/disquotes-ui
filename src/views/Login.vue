<template>
  <div
    @click="startLogin"
    class="w-3/4 mx-auto justify-center align-middle mt-20 cursor-pointer text-center hover:underline"
  >
    <h1 v-if="!isLoading && !isRefreshing" class="text-4xl">
      Login with Discord!
    </h1>
    <loader v-else class=""></loader>
    <img src="@/assets/img/wumpus.png" class="w-64 mx-auto" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SecurityService from "../services/SecurityService";
import { meModule } from "../store";
import Loader from "@/components/Loader.vue";

@Component({
  components: {
    Loader
  }
})
export default class Login extends Vue {
  isLoading = false;

  get isRefreshing() {
    return meModule.isRefreshing;
  }

  get me() {
    return meModule.me;
  }

  get accessTokenParam(): string | null {
    return this.$route.query.token as string | null;
  }

  get refreshTokenParam(): string | null {
    return this.$route.query.refresh as string | null;
  }

  startLogin() {
    this.isLoading = true;
    SecurityService.startLogin();
  }

  @Watch("me")
  meChanged() {
    const afterLogin = localStorage.getItem("after_login") || "guilds";
    localStorage.removeItem("after_login");
    this.$router.replace({ name: afterLogin });
  }

  mounted() {
    if (this.accessTokenParam && this.refreshTokenParam) {
      meModule.setIsLoggingIn(true);
      this.isLoading = true;
      SecurityService.setTokens(
        this.accessTokenParam,
        this.refreshTokenParam
      ).then(user => {
        meModule.setMe(user);
        meModule.setIsLoggingIn(false);
        this.meChanged();
      });
    }
  }
}
</script>
