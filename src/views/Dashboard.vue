<template>
  <div class="mx-auto w-3/4 my-5 flex justify-center">
    <guild-badge
      v-for="guild of $me.guilds"
      :key="guild.id"
      :guild="guild"
    >
    </guild-badge>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import SecurityMixin from '../mixins/SecurityMixin.vue';
import GuildBadge from '@/components/GuildBadge.vue'

@Component({
  components: {
    GuildBadge
  }
})
export default class Dashboard extends Mixins(SecurityMixin) {}
</script>
