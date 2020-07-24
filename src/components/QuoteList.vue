<template>
  <div class="w-full">
    <template v-if="!isLoading">
      <single-quote
        v-for="(quote, i) of quotes"
        :key="quote.id"
        :quote="quote"
        :moderationMode="moderationMode"
        :showGuild="showGuild"
        @remove-item="removeQuote(i)"
      ></single-quote>
      <h3 v-if="quotes.length === 0" class="text-center text-3xl italic">
        Looks like there's nothing here!
      </h3>
      <div class="flex justify-center" v-if="hasPreviousPage || hasNextPage">
        <dq-button
          class="mx-3"
          :disabled="!hasPreviousPage"
          @click="pageNumber--"
          >Previous</dq-button
        >
        <dq-button class="mx-3" :disabled="!hasNextPage" @click="pageNumber++"
          >Next</dq-button
        >
      </div>
    </template>
    <div v-else class="w-full flex justify-center">
      <loader></loader>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SingleQuote from "./SingleQuote.vue";
import Loader from "./Loader.vue";
import { Quote } from "@/models/Quote";
import QuoteService from "@/services/QuoteService";
import DqButton from "@/components/DqButton.vue";
import { meModule } from "@/store";

@Component({
  components: {
    SingleQuote,
    Loader,
    DqButton
  }
})
export default class QuoteList extends Vue {
  @Prop() guildId!: string;
  @Prop() moderationMode!: boolean;
  @Prop() showGuild!: boolean;

  isLoading = true;
  quotes: Quote[] = [];
  pageNumber = 1;
  pageSize = 25;
  hasNextPage = false;
  hasPreviousPage = false;

  removeQuote(index: number) {
    this.quotes.splice(index, 1);
  }

  @Watch("pageNumber")
  @Watch("guildId")
  @Watch("me")
  fetchQuotes() {
    this.isLoading = true;
    const request = this.moderationMode
      ? QuoteService.findUnmoderatedQuotes
      : QuoteService.findQuotes;

    request(this.guildId || undefined, this.pageNumber, this.pageSize).then(
      res => {
        if (!res.success) {
          // TODO
          return;
        }

        this.quotes = res.data.items;
        this.hasNextPage = res.data.hasNext;
        this.hasPreviousPage = res.data.hasPrevious;
        this.isLoading = false;
      }
    );
  }

  mounted() {
    if (meModule.me) {
      this.fetchQuotes();
    }
  }
}
</script>
