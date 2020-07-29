<template>
  <div class="w-48 m-3">
    <img :src="guild.iconUrl" class="rounded-t-lg w-48" />
    <h3 class="text-xl p-3 bg-blue-900 rounded-b-lg">{{ guild.name }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Guild } from "../models/Guild";

@Component
export default class GuildBadge extends Vue {
  @Prop() guild!: Guild;
}
</script>
