<template>
  <div>
      <span class="text-2xl"><span class="text-3xl">#{{quote.quoteNumber}}</span>{{quote.title}}</span>
      <div>{{quote.text}}</div>
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
