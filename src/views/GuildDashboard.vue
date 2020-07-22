<template>
  <div class="mx-auto w-3/4 my-5 flex justify-between">
    <quote-list v-if="guild" :guildId="guild.id" class="w-10/12"></quote-list>
    <guild-badge v-if="guild" :guild="guild"></guild-badge>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Guild } from "@/models/Guild";
import QuoteList from "@/components/QuoteList.vue";
import GuildBadge from "@/components/GuildBadge.vue";
import { guildModule } from '@/store';

@Component({
  components: {
    QuoteList,
    GuildBadge
  }
})
export default class GuildDashboard extends Vue {
  get guild(): Guild | null {
    const id = this.$route.params.guildId;
    return guildModule.guilds?.find(guild => guild.id === id) || null;
  }
}
</script>
