<template>
  <div>
    <div class="flex justify-between items-end">
      <div>
        <router-link
          class="text-3xl underline cursor-pointer"
          :to="{
            name: 'view-quote',
            params: { guildId: quote.guildId, quoteId: quote.id }
          }"
          >{{ quote.title }}</router-link
        >
        <img
          :src="quote.user.profileUrl"
          class="inline w-12 h-12 rounded-full ml-3 mr-1"
        />
        <span class="text-lg">
          {{ quote.user.username }}#{{ quote.user.discriminator }}
        </span>
        <span class="text-sm text-gray-400"> on </span>
        <span class="text-lg">{{ formatDate(quote.createdAt) }}</span>
      </div>
      <span class="text-6xl mb-3">#{{ quote.quoteNumber }}</span>
    </div>
    <div v-if="isOwner" class="flex justify-end">
      <div>Approve</div>
      <div>Delete</div>
    </div>
    <pre class="whitespace-pre-wrap">{{ quote.text }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Quote } from "@/models/Quote";

@Component
export default class SingleQuote extends Vue {
  @Prop() quote!: Quote;
  @Prop({ default: false }) isOwner!: boolean;

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
</script>
