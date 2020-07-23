<template>
  <div class="mx-auto w-3/4 my-5 flex justify-center">
    <router-link
      v-for="guild of guilds"
      :key="guild.id"
      :to="{ name: 'guild-dashboard', params: { guildId: guild.id } }"
    >
      <guild-badge
        :guild="guild"
        class="transition-transform duration-100 transform hover:scale-105"
      ></guild-badge>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GuildBadge from "@/components/GuildBadge.vue";
import { Guild } from "@/models/Guild";
import { guildModule } from "@/store";

@Component({
  components: {
    GuildBadge
  }
})
export default class Dashboard extends Vue {
  get guilds(): Guild[] {
    return guildModule.guilds || [];
  }
}
</script>
