<template>
  <div class="mx-auto w-3/4 my-5">
    <h2 class="text-center text-3xl">{{ guild.name }}</h2>
    <quote-list :guildId="guild.id"></quote-list>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import SecurityMixin from "@/mixins/SecurityMixin.vue";
import { Guild } from "@/models/Guild";
import QuoteList from '@/components/QuoteList.vue'

@Component({
    components: {
        QuoteList
    }
})
export default class GuildDashboard extends Mixins(SecurityMixin) {
  get guild(): Guild | null {
    const id = this.$route.params.guildId;
    return this.$me?.guilds?.find(guild => guild.id === id) || null;
  }
}
</script>
