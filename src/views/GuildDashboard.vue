<template>
  <div class="mx-auto w-3/4 my-5 flex justify-between">
    <quote-list v-if="guild" :guildId="guild.id" class="w-10/12"></quote-list>
    <div>
      <guild-badge v-if="guild" :guild="guild"></guild-badge>
      <router-link v-if="guild.isOwner" :to="{name: 'moderation-queue', params: { guildId: guild.id }}">
        <dq-button class="mx-3">Moderate</dq-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Guild } from "@/models/Guild";
import QuoteList from "@/components/QuoteList.vue";
import GuildBadge from "@/components/GuildBadge.vue";
import DqButton from '@/components/DqButton.vue';
import { guildModule, meModule } from '@/store';

@Component({
  components: {
    QuoteList,
    GuildBadge,
    DqButton
  }
})
export default class GuildDashboard extends Vue {
  get guild(): Guild | null {
    const id = this.$route.params.guildId;
    return guildModule.guilds?.find(guild => guild.id === id) || null;
  }
}
</script>
