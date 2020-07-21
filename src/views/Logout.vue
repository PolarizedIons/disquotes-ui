<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SecurityService from "../services/SecurityService";

@Component
export default class Logout extends Vue {
  mounted() {
    SecurityService.logout();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$root.me = null;
    this.$router.replace({ name: "index" });
  }
}
</script>
