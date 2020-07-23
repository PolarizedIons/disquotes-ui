<template>
  <div>
    <div class="mx-auto w-3/4 my-5 flex justify-between">
      <quote-list :guildId="guildId" :moderationMode="true"></quote-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuoteList from "@/components/QuoteList.vue";

@Component({
  components: {
    QuoteList
  }
})
export default class ModerationDashboard extends Vue {
  get guildId(): string | null {
    return this.$route.params.guildId || null;
  }
}
</script>
