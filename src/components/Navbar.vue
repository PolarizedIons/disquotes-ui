<template>
  <nav class="bg-gray-800 flex items-center">
    <div class="flex-1"></div>
    <div class="flex-1 flex items-center justify-center">
      <img src="@/assets/img/logo.png" class="h-16 m-3" />
      <h1 class="text-4xl">Disquotes</h1>
    </div>
    <ul class="flex-1 flex justify-end h-24">
      <li class="h-full">
        <a
          class="inline-block h-full px-3 hover:bg-gray-700 flex items-center"
          href="#"
          >Add the bot!</a
        >
      </li>
      <li class="h-full">
        <router-link
          class="inline-block h-full px-3 hover:bg-gray-700 flex items-center"
          :to="{ name: 'login' }"
          >Login</router-link
        >
      </li>
      <li class="h-full">
        <router-link
          class="inline-block h-full px-3 hover:bg-gray-700 flex items-center"
          :to="{ name: 'dashboard' }"
          >Dashboard</router-link
        >
      </li>
      <li class="h-full">
        <router-link
          class="inline-block h-full px-3 hover:bg-gray-700 flex items-center"
          :to="{ name: 'unmoderated' }"
          >Unmoderated Quotes</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {}
</script>
