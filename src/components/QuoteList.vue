<template>
  <div class="w-full">
    <template v-if="!isLoading">
      <single-quote
        v-for="(quote, i) of quotes"
        :key="quote.id"
        :quote="quote"
        :moderationMode="moderationMode"
        @remove-item="removeQuote(i)"
      ></single-quote>
      <h3 v-if="quotes.length === 0" class="text-center text-3xl italic">
        Looks like there's nothing here!
      </h3>
    </template>
    <div v-else class="w-full flex justify-center">
      <loader></loader>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SingleQuote from "./SingleQuote.vue";
import Loader from "./Loader.vue";
import { Quote } from "@/models/Quote";
import QuoteService from "@/services/QuoteService";

@Component({
  components: {
    SingleQuote,
    Loader
  }
})
export default class QuoteList extends Vue {
  @Prop() guildId!: string;
  @Prop() moderationMode!: boolean;

  isLoading = true;
  quotes: Quote[] = [];

  removeQuote(index: number) {
    this.quotes.splice(index, 1);
  }

  mounted() {
    this.isLoading = true;
    const request = this.moderationMode
      ? QuoteService.findUnmoderatedQuotes
      : QuoteService.findQuotes;

    request(this.guildId || undefined, 1, 25).then(res => {
      if (!res.success) {
        // TODO
        return;
      }

      this.quotes = res.data.items;
      this.isLoading = false; 
    });
  }
}
</script>