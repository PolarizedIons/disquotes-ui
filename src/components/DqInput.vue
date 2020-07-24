<template>
  <div
    class="my-3 w-8/12"
  >
    <span v-if="caption" class="text-lg text-white">{{caption}}</span>
    <input :type="type" :class="`border-b-2 border-${color} focus:border-${focusColor} bg-transparent text-white w-full shadow-lg`" :disabled="disabled" v-model.trim="internal"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class DqButton extends Vue {
  @Prop({ default: "teal-800" }) color!: string;
  @Prop({ default: "teal-700" }) focusColor!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: 'text' }) type!: string;
  @Prop({ default: '' }) caption!: string;
  @Prop({ default: '' }) value!: string;

  internal = '';

  @Watch('value')
  onValueChanged() {
    this.internal = this.value;
  }

  @Watch('internal')
  onInternalChanged() {
    this.$emit("input", this.internal);
  }
}
</script>
