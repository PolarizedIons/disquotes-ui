<template>
  <router-link
    :to="{ name: 'guild-dashboard', params: { guildId: guild.id } }"
    class="rounded-md bg-blue-900 w-48 m-3"
  >
    <img :src="guild.iconUrl" class="rounded-t-md w-48" />
    <h3 class="text-xl p-3">{{ guild.name }}</h3>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Guild } from "../models/Guild";

@Component
export default class Dashboard extends Vue {
  @Prop() guild!: Guild;
}
</script>
