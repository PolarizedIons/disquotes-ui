<template>
  <div class="w-full">
    <single-quote
      v-for="quote of quotes"
      :key="quote.id"
      :quote="quote"
      :moderationMode="moderationMode"
    ></single-quote>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SingleQuote from "./SingleQuote.vue";
import { Quote } from "@/models/Quote";
import QuoteService from "@/services/QuoteService";

@Component({
  components: {
    SingleQuote
  }
})
export default class QuoteList extends Vue {
  @Prop() guildId!: string;
  @Prop() moderationMode!: boolean;

  quotes: Quote[] = [];

  mounted() {
    const request = this.moderationMode
      ? QuoteService.findUnmoderatedQuotes
      : QuoteService.findQuotes;

    request(this.guildId || undefined, 1, 25).then(res => {
      if (!res.success) {
        // TODO
        return;
      }

      this.quotes = res.data.items;
    });
  }
}
</script>
