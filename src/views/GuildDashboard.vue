<template>
  <div class="mx-auto w-3/4 my-5 flex justify-between">
    <quote-list
      v-if="!isLoading && guild"
      :guildId="guild.id"
      class="w-10/12"
    ></quote-list>
    <div v-else class="w-10/12 flex justify-center">
      <loader></loader>
    </div>
    <div class="w-2/12">
      <div class="sticky top-0 pt-1">
        <template v-if="!isLoading">
          <guild-badge v-if="guild" :guild="guild"></guild-badge>
          <router-link
            v-if="guild && guild.isOwner"
            :to="{ name: 'moderation-queue', params: { guildId: guild.id } }"
          >
            <dq-button
              class="mx-3"
              bgColor="purple-800"
              bgHoverColor="purple-700"
              >Moderate</dq-button
            >
          </router-link>
          <router-link
            v-if="guild"
            :to="{ name: 'new-quote', params: { guildId: guild.id } }"
          >
            <dq-button class="mx-3" bgColor="green-800" bgHoverColor="green-700"
              >Submit new Quote!</dq-button
            >
          </router-link>
        </template>
        <div v-else class="w-full flex justify-center">
          <loader></loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Guild } from "@/models/Guild";
import QuoteList from "@/components/QuoteList.vue";
import GuildBadge from "@/components/GuildBadge.vue";
import DqButton from "@/components/DqButton.vue";
import { guildModule } from "@/store";
import Loader from "@/components/Loader.vue";

@Component({
  components: {
    QuoteList,
    GuildBadge,
    DqButton,
    Loader
  }
})
export default class GuildDashboard extends Vue {
  get isLoading() {
    return guildModule.loading;
  }

  get guild(): Guild | null {
    const id = this.$route.params.guildId;
    return guildModule.guilds?.find(guild => guild.id === id) || null;
  }
}
</script>
