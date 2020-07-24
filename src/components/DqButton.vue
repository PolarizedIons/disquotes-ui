<template>
  <div
    class="text-lg text-center px-6 py-3 cursor-pointer my-1 w-48"
    :class="`bg-${bgColor} hover:bg-${bgHoverColor}`"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DqButton extends Vue {
  @Prop({ default: "teal-800" }) bgColor!: string;
  @Prop({ default: "teal-700" }) bgHoverColor!: string;
}
</script>
