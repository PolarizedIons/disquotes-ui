<template>
  <span>Loading...</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { meModule } from "@/store";

@Component
export default class Index extends Vue {
  mounted() {
    const page = meModule.isLoggedIn ? "dashboard" : "login";
    this.$router.replace({ name: page });
  }
}
</script>
