<template>
  <div
    class="text-lg text-center px-6 py-3 my-1 w-48"
    :class="[
      `bg-${bgColor} hover:bg-${bgHoverColor}`,
      busy ? 'cursor-not-allowed' : 'cursor-pointer'
    ]"
    @click="$emit('click', $event)"
  >
    <slot v-if="!busy"></slot>
    <small-loader v-else></small-loader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SmallLoader from "@/components/SmallLoader.vue";

@Component({
  components: {
    SmallLoader
  }
})
export default class DqButton extends Vue {
  @Prop({ default: "teal-800" }) bgColor!: string;
  @Prop({ default: "teal-700" }) bgHoverColor!: string;
  @Prop({ default: false }) busy!: boolean;
}
</script>
