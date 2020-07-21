<template>
  <span>Loading...</span>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import SecurityMixin from "@/mixins/SecurityMixin.vue";

@Component
export default class Index extends Mixins(SecurityMixin) {
  mounted() {
    const page = this.isLoggedIn ? "dashboard" : "login";
    this.$router.replace({ name: page });
  }
}
</script>
