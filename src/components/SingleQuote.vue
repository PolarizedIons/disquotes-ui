<template>
  <div>
    <div class="flex justify-between items-end">
      <div>
        <h3 class="text-3xl underline inline">{{quote.title}}</h3>
        <span class="text-sm text-gray-400"> by </span> 
        <span class="text-lg">{{quote.userId}}</span>
        <span class="text-sm text-gray-400"> on </span> 
        <span class="text-lg">{{quote.createdAt}}</span>
      </div>
      <h2 class="text-6xl rounded-full bg-gray-700 px-4 mb-3">#{{quote.quoteNumber}}</h2>
    </div>
    <pre class="whitespace-pre-wrap">{{quote.text}}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {Quote} from "@/models/Quote";

@Component
export default class SingleQuote extends Vue {
  @Prop() quote!: Quote;
}
</script>
