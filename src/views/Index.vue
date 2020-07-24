<template>
  <div class="text-center p-4">
    <loader></loader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { meModule } from "@/store";
import Loader from "@/components/Loader.vue";

@Component({
  components: {
    Loader
  }
})
export default class Index extends Vue {
  mounted() {
    const page = meModule.isLoggedIn ? "guilds" : "login";
    this.$router.replace({ name: page });
  }
}
</script>
