<template>
  <div class="mx-auto w-3/4 my-5 flex justify-between">
    <single-quote v-if="quote" :quote="quote" class="w-full"></single-quote>
    <div v-else class="w-full flex justify-center">
      <loader></loader>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingleQuote from "@/components/SingleQuote.vue";
import Loader from "@/components/Loader.vue";
import { Quote } from "../models/Quote";
import QuoteService from "../services/QuoteService";

@Component({
  components: {
    SingleQuote,
    Loader
  }
})
export default class ViewQuote extends Vue {
  private quote: Quote | null = null;

  mounted() {
    QuoteService.findById(this.$route.params.quoteId).then(res => {
      if (res.success) {
        this.quote = res.data;
      }
    });
  }
}
</script>
