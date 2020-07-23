<template>
  <div
    @click="startLogin"
    class="w-3/4 mx-auto justify-center align-middle mt-20 cursor-pointer hover:underline"
  >
    <h1 v-if="!isLoading" class="text-4xl text-center">Login with Discord!</h1>
    <img src="@/assets/img/wumpus.png" class="w-64 mx-auto" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SecurityService from "../services/SecurityService";
import { meModule } from "../store";

@Component
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
      this.isLoading = true;
      SecurityService.setTokens(this.accessToken, this.refreshToken).then(
        user => {
          meModule.setMe(user);
          this.$router.push({ name: "dashboard" });
        }
      );
    }
  }
}
</script>
