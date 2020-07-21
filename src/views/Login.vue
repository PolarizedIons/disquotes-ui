<template>
  <div>
    <h1 v-if="!isLoading" @click="startLogin">Start Login</h1>
    <h1 v-else>Logging you in...</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SecurityService from "../services/SecurityService";

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
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          this.$root.me = user;
          this.$router.push({ name: "dashboard" });
        }
      );
    }
  }
}
</script>
