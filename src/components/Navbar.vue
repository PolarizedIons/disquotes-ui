<template>
  <nav class="bg-gray-800 flex items-center shadow-md">
    <div class="flex-1"></div>
    <div class="flex-1 ">
      <router-link
        :to="{ name: 'index' }"
        class="flex items-center justify-center"
      >
        <img src="@/assets/img/logo.png" class="h-16 m-3" />
        <h1 class="text-4xl">Disquotes</h1>
      </router-link>
    </div>
    <div class="flex-1 flex justify-end h-24 items-center">
      <ul class="h-full flex text-lg">
        <li class="h-full">
          <a
            class="h-full px-4 hover:bg-teal-700 bg-teal-800 flex items-center"
            :href="inviteUrl"
            >Add the bot!</a
          >
        </li>
        <template v-if="me">
          <li class="h-full">
            <router-link
              class=" h-full px-4 hover:bg-gray-700 flex items-center"
              :to="{ name: 'guilds' }"
              >Guilds</router-link
            >
          </li>
          <li class="h-full">
            <router-link
              v-if="hasModerationQueue"
              class=" h-full px-4 hover:bg-gray-700 flex items-center"
              :to="{ name: 'moderation-queue' }"
              >Moderation Queue</router-link
            >
          </li>
          <li class="h-full">
            <router-link
              class=" h-full px-4 hover:bg-red-800 flex items-center"
              :to="{ name: 'logout' }"
              >Logout</router-link
            >
          </li>
        </template>
      </ul>
      <img
        v-if="me"
        :src="me.profileUrl"
        class="h-16 mx-3 rounded-full border-gray-500 border-solid border-4"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { meModule, guildModule } from "../store";

@Component
export default class Navbar extends Vue {
  get me() {
    return meModule.me;
  }

  get hasModerationQueue() {
    return guildModule.hasModerationQueue;
  }

  get inviteUrl() {
    const botId = process.env.VUE_APP_BOT_ID;
    return botId
      ? `https://discordapp.com/oauth2/authorize?client_id=${botId}&scope=bot`
      : "#";
  }
}
</script>
