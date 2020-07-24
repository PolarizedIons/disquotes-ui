<template>
  <div class="loader-circle"><div></div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {}
</script>

<style scoped>
.loader-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.loader-circle > div {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  background: #fff;
  animation: loader-circle 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes loader-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(900deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(1800deg);
  }
}
</style>
