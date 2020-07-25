<template>
  <div
    @click="startLogin"
    class="w-3/4 mx-auto justify-center align-middle mt-20 cursor-pointer text-center hover:underline"
  >
    <h1 v-if="!isLoading" class="text-4xl">Login with Discord!</h1>
    <loader v-else class=""></loader>
    <img src="@/assets/img/wumpus.png" class="w-64 mx-auto" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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

  get accessToken(): string | null {
    return this.$route.query.token as string | null;
  }

  get refreshToken(): string | null {
    return this.$route.query.refresh as string | null;
  }

  startLogin() {
    this.isLoading = true;
    SecurityService.startLogin();
  }

  mounted() {
    if (this.accessToken && this.refreshToken) {
      meModule.setIsLoggingIn(true);
      this.isLoading = true;
      SecurityService.setTokens(this.accessToken, this.refreshToken).then(
        user => {
          meModule.setMe(user);
          meModule.setIsLoggingIn(false);
          this.$router.push({ name: "guilds" });
        }
      );
    }
  }
}
</script>
