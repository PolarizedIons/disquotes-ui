<template>
  <div class="mb-6 py-3 px-4 shadow-2xl">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-3xl underline inline ">
          <router-link
            v-if="quote.approved"
            class="cursor-pointer"
            :to="{
              name: 'view-quote',
              params: { guildId: quote.guildId, quoteId: quote.id }
            }"
            tag="h2"
            >{{ quote.title }}</router-link
          >
          <h2 v-else>{{ quote.title }}</h2>
        </div>
        <span class="text-lg">
          {{ quote.user.username }}#{{ quote.user.discriminator }}
        </span>
        <img
          :src="quote.user.profileUrl"
          class="inline w-12 h-12 rounded-full ml-3 mr-1"
        />
        <span class="text-sm text-gray-400"> on </span>
        <span class="text-lg">{{ formatDate(quote.createdAt) }}</span>
      </div>
      <span v-if="quote.approved" class="text-6xl mb-3"
        >#{{ quote.quoteNumber }}</span
      >
    </div>
    <div v-if="isOwner" class="flex justify-end">
      <dq-button
        v-if="moderationMode"
        bgColor="green-800"
        bgHoverColor="green-700"
        class="mr-3"
        @click="approveQuote()"
        >Approve</dq-button
      >
      <dq-button bgColor="red-800" bgHoverColor="red-700" @click="deleteQuote()">Delete</dq-button>
    </div>
    <pre class="whitespace-pre-wrap mt-2">{{ quote.text }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Quote } from "@/models/Quote";
import DqButton from "@/components/DqButton.vue";
import { guildModule } from "../store";
import QuoteService from '../services/QuoteService';

@Component({
  components: {
    DqButton
  }
})
export default class SingleQuote extends Vue {
  @Prop() quote!: Quote;
  @Prop({ default: false }) moderationMode!: boolean;

  get isOwner(): boolean {
    return !!guildModule.guilds?.find(guild => guild.id === this.quote.guildId)
      ?.isOwner;
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }

  approveQuote() {
    QuoteService.approveQuote(this.quote.id)
    .then((res) => {
      if (res.success) {
        this.$emit('remove-item');
      }
    })
  }

  deleteQuote() {
    QuoteService.deleteQuote(this.quote.id)
    .then((res) => {
      if (res.success) {
        this.$emit('remove-item');
      }
    })
  }
}
</script>
