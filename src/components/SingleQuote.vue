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
          class="inline w-12 h-12 rounded-full mx-2"
        />
        <span class="text-sm text-gray-400"> on </span>
        <span class="text-lg">{{ formatDate(quote.createdAt) }}</span>
        <template v-if="showGuild && guild">
          <span class="text-sm text-gray-400"> in </span>
          <span class="text-lg">{{ guild.name }}</span>
        </template>
      </div>
      <div class="flex">
        <template v-if="isModerator && moderationMode">
          <dq-button
            bgColor="green-800"
            bgHoverColor="green-700"
            class="mr-3"
            @click="approveQuote()"
            :busy="isApproving"
            >Approve</dq-button
          >
          <dq-button
            bgColor="red-800"
            bgHoverColor="red-700"
            @click="deleteQuote()"
            :busy="isDeleting"
            >Delete</dq-button
          ></template
        >
        <span v-if="quote.approved" class="text-6xl mb-3"
          >#{{ quote.quoteNumber }}</span
        >
      </div>
    </div>
    <div
      class="break-words whitespace-pre-line mt-2 quote"
      v-html="markdownIt(quote.text)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Quote } from "@/models/Quote";
import DqButton from "@/components/DqButton.vue";
import { guildModule } from "../store";
import QuoteService from "../services/QuoteService";
import { Guild } from "../models/Guild";
import MarkdownIt from "@/MarkdownIt";

@Component({
  components: {
    DqButton
  }
})
export default class SingleQuote extends Vue {
  @Prop() quote!: Quote;
  @Prop({ default: false }) moderationMode!: boolean;
  @Prop({ default: false }) showGuild!: boolean;

  markdownIt = MarkdownIt;

  isDeleting = false;
  isApproving = false;

  get guild(): Guild | null {
    return (
      guildModule.guilds?.find(guild => guild.id === this.quote.guildId) || null
    );
  }

  get isModerator(): boolean {
    return !!this.guild?.isModerator;
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }

  approveQuote() {
    this.isApproving = true;
    QuoteService.approveQuote(this.quote.id).then(res => {
      this.isApproving = false;
      if (res.success) {
        this.$emit("remove-item");
      }
    });
  }

  deleteQuote() {
    this.isDeleting = true;
    QuoteService.deleteQuote(this.quote.id).then(res => {
      this.isDeleting = false;
      if (res.success) {
        this.$emit("remove-item");
      }
    });
  }
}
</script>

<style scoped>
.quote {
  font-family: "Anonymous Pro", monospace !important;
  font-size: 1.2rem !important;
}
</style>
