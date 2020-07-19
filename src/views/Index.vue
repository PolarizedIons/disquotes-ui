<template>
  <span>Loading...</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SecurityService from "../services/SecurityService";

@Component
export default class Index extends Vue {
  mounted() {
    const page = SecurityService.isLoggedIn ? "dashboard" : "login";
    this.$router.replace({ name: page });
  }
}
</script>
