<template>
  <div class="mx-auto w-3/4 my-5">
    <h2 class="text-5xl text-right">Moderation Queue</h2>
    <h3 class="text-2xl text-right" v-if="guild">{{ guild.name }}</h3>
    <quote-list
      :guildId="guildId"
      :moderationMode="true"
      :showGuild="!guild"
    ></quote-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuoteList from "@/components/QuoteList.vue";
import { Guild } from "../models/Guild";
import { guildModule } from "../store";

@Component({
  components: {
    QuoteList
  }
})
export default class ModerationDashboard extends Vue {
  get guildId(): string | null {
    return this.$route.params.guildId || null;
  }

  get guild(): Guild | null {
    if (!this.guildId) {
      return null;
    }

    return guildModule.guilds?.find(guild => guild.id === this.guildId) || null;
  }
}
</script>
