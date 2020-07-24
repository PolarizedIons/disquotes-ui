<template>
<div class="loader-ellipsis"><div></div><div></div><div></div><div></div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SmallLoader extends Vue {
  
}
</script>

<style scoped>
.loader-ellipsis {
  --scale: 0.5;
  display: inline-block;
  position: relative;
  width: calc(80px * var(--scale));
  /* height: calc(80px * var(--scale)); */
  transform: translateY(-25px);
}
.loader-ellipsis div {
  position: absolute;
  top: calc(33px * var(--scale));
  width: calc(13px * var(--scale));
  height: calc(13px * var(--scale));
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-ellipsis div:nth-child(1) {
  left: calc(8px * var(--scale));
  animation: loader-ellipsis1 0.6s infinite;
}
.loader-ellipsis div:nth-child(2) {
  left: calc(8px * var(--scale));
  animation: loader-ellipsis2 0.6s infinite;
}
.loader-ellipsis div:nth-child(3) {
  left: calc(32px * var(--scale));
  animation: loader-ellipsis2 0.6s infinite;
}
.loader-ellipsis div:nth-child(4) {
  left: calc(56px * var(--scale));
  animation: loader-ellipsis3 0.6s infinite;
}
@keyframes loader-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(24px * var(--scale)), 0);
  }
}

</style>
