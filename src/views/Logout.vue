<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SecurityService from "../services/SecurityService";
import { meModule } from '../store';

@Component
export default class Logout extends Vue {
  mounted() {
    SecurityService.logout();
    meModule.setMe(null);
    this.$router.replace({ name: "index" });
  }
}
</script>
