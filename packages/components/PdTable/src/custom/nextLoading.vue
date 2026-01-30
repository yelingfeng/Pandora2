<template>
  <div class="next-loading">
    <div class="next-loading-masker"></div>
    <div class="next-loading-tip">
      <span class="next-loading-fusion-reactor">
        <span class="next-loading-dot"></span>
        <span class="next-loading-dot"></span>
        <span class="next-loading-dot"></span>
        <span class="next-loading-dot"></span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NextLoading',
  components: {},
  props: {},
}
</script>
<style lang="css" scope>
.next-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow: hidden;
}

.next-loading.next-open {
  pointer-events: none;
}

.next-loading.next-open .next-loading-component {
  opacity: 0.7;
  filter: blur(1px);
  position: relative;
  pointer-events: none;
}

.next-loading-masker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.15);
}

.next-loading-inline {
  display: inline-block;
}

.next-loading-tip {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);
  text-align: center;
}

.next-loading-tip-fullscreen {
  top: inherit;
  left: inherit;
  transform: inherit;
}

.next-loading-tip-placeholder {
  display: none;
}

.next-loading-right-tip .next-loading-indicator {
  display: inline-block;
}

.next-loading-right-tip .next-loading-tip-content {
  position: absolute;
  display: block;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.next-loading-right-tip .next-loading-tip-placeholder {
  display: inline-block;
  visibility: hidden;
  margin-left: 1em;
}

.next-loading-fusion-reactor {
  display: inline-block;
  width: 48px;
  width: var(--loading-large-size, 48px);
  height: 48px;
  height: var(--loading-large-size, 48px);
  position: relative;
  margin: 0;
  animation-duration: 5.6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: nextVectorRoute;
  will-change: transform;
}

.next-loading-fusion-reactor .next-loading-dot {
  position: absolute;
  margin: auto;
  width: 12px;
  width: var(--loading-large-dot-size, 12px);
  height: 12px;
  height: var(--loading-large-dot-size, 12px);
  border-radius: 50%;
  background: #0064c8;
  background: var(--loading-dot-color, #0064c8);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1.4s;
  will-change: transform, opacity;
}

.next-loading-fusion-reactor .next-loading-dot:first-child {
  top: 0;
  bottom: 0;
  left: 0;
  animation-name: nextVectorDotsX;
}

.next-loading-fusion-reactor .next-loading-dot:nth-child(2) {
  left: 0;
  right: 0;
  top: 0;
  opacity: 0.8;
  animation-name: nextVectorDotsY;
}

.next-loading-fusion-reactor .next-loading-dot:nth-child(3) {
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0.6;
  animation-name: nextVectorDotsXR;
}

.next-loading-fusion-reactor .next-loading-dot:nth-child(4) {
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  animation-name: nextVectorDotsYR;
}

.next-loading-medium-fusion-reactor {
  width: 32px;
  width: var(--loading-medium-size, 32px);
  height: 32px;
  height: var(--loading-medium-size, 32px);
}

.next-loading-medium-fusion-reactor .next-loading-dot {
  width: 8px;
  width: var(--loading-medium-dot-size, 8px);
  height: 8px;
  height: var(--loading-medium-dot-size, 8px);
}

.next-loading-medium-fusion-reactor .next-loading-dot:first-child {
  animation-name: nextVectorDotsX-medium;
}

.next-loading-medium-fusion-reactor .next-loading-dot:nth-child(2) {
  animation-name: nextVectorDotsY-medium;
}

.next-loading-medium-fusion-reactor .next-loading-dot:nth-child(3) {
  animation-name: nextVectorDotsXR-medium;
}

.next-loading-medium-fusion-reactor .next-loading-dot:nth-child(4) {
  animation-name: nextVectorDotsYR-medium;
}

@keyframes nextVectorRoute {
  0% {
    transform: rotate(0deg);
  }

  5% {
    transform: rotate(90deg);
  }

  25% {
    transform: rotate(90deg);
  }

  30% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  55% {
    transform: rotate(270deg);
  }

  75% {
    transform: rotate(270deg);
  }

  80% {
    transform: rotate(1turn);
  }

  to {
    transform: rotate(1turn);
  }
}

@keyframes nextVectorDotsYR {
  25% {
    bottom: 0;
  }

  45%,
  50% {
    bottom: 16.8px;
    bottom: calc(var(--loading-large-size, 48px) / 2 - var(--loading-large-dot-size, 12px) * 1.2 / 2);
    height: 14.4px;
    height: calc(var(--loading-large-dot-size, 12px) * 1.2);
    width: 14.4px;
    width: calc(var(--loading-large-dot-size, 12px) * 1.2);
  }

  90% {
    bottom: 0;
    height: 12px;
    height: var(--loading-large-dot-size, 12px);
    width: 12px;
    width: var(--loading-large-dot-size, 12px);
  }
}

@keyframes nextVectorDotsY {
  25% {
    top: 0;
  }

  45%,
  50% {
    top: 16.8px;
    top: calc(var(--loading-large-size, 48px) / 2 - var(--loading-large-dot-size, 12px) * 1.2 / 2);
    height: 14.4px;
    height: calc(var(--loading-large-dot-size, 12px) * 1.2);
    width: 14.4px;
    width: calc(var(--loading-large-dot-size, 12px) * 1.2);
  }

  90% {
    top: 0;
    height: 12px;
    height: var(--loading-large-dot-size, 12px);
    width: 12px;
    width: var(--loading-large-dot-size, 12px);
  }
}

@keyframes nextVectorDotsX {
  25% {
    left: 0;
  }

  45%,
  50% {
    left: 16.8px;
    left: calc(var(--loading-large-size, 48px) / 2 - var(--loading-large-dot-size, 12px) * 1.2 / 2);
    width: 14.4px;
    width: calc(var(--loading-large-dot-size, 12px) * 1.2);
    height: 14.4px;
    height: calc(var(--loading-large-dot-size, 12px) * 1.2);
  }

  90% {
    left: 0;
    height: 12px;
    height: var(--loading-large-dot-size, 12px);
    width: 12px;
    width: var(--loading-large-dot-size, 12px);
  }
}

@keyframes nextVectorDotsXR {
  25% {
    right: 0;
  }

  45%,
  50% {
    right: 16.8px;
    right: calc(var(--loading-large-size, 48px) / 2 - var(--loading-large-dot-size, 12px) * 1.2 / 2);
    width: 14.4px;
    width: calc(var(--loading-large-dot-size, 12px) * 1.2);
    height: 14.4px;
    height: calc(var(--loading-large-dot-size, 12px) * 1.2);
  }

  90% {
    right: 0;
    height: 12px;
    height: var(--loading-large-dot-size, 12px);
    width: 12px;
    width: var(--loading-large-dot-size, 12px);
  }
}

@keyframes nextVectorDotsYR-medium {
  25% {
    bottom: 0;
  }

  45%,
  50% {
    bottom: 11.2px;
    bottom: calc(var(--loading-medium-size, 32px) / 2 - var(--loading-medium-dot-size, 8px) * 1.2 / 2);
    height: 9.6px;
    height: calc(var(--loading-medium-dot-size, 8px) * 1.2);
    width: 9.6px;
    width: calc(var(--loading-medium-dot-size, 8px) * 1.2);
  }

  90% {
    bottom: 0;
    height: 8px;
    height: var(--loading-medium-dot-size, 8px);
    width: 8px;
    width: var(--loading-medium-dot-size, 8px);
  }
}

@keyframes nextVectorDotsY-medium {
  25% {
    top: 0;
  }

  45%,
  50% {
    top: 11.2px;
    top: calc(var(--loading-medium-size, 32px) / 2 - var(--loading-medium-dot-size, 8px) * 1.2 / 2);
    height: 9.6px;
    height: calc(var(--loading-medium-dot-size, 8px) * 1.2);
    width: 9.6px;
    width: calc(var(--loading-medium-dot-size, 8px) * 1.2);
  }

  90% {
    top: 0;
    height: 8px;
    height: var(--loading-medium-dot-size, 8px);
    width: 8px;
    width: var(--loading-medium-dot-size, 8px);
  }
}

@keyframes nextVectorDotsX-medium {
  25% {
    left: 0;
  }

  45%,
  50% {
    left: 11.2px;
    left: calc(var(--loading-medium-size, 32px) / 2 - var(--loading-medium-dot-size, 8px) * 1.2 / 2);
    width: 9.6px;
    width: calc(var(--loading-medium-dot-size, 8px) * 1.2);
    height: 9.6px;
    height: calc(var(--loading-medium-dot-size, 8px) * 1.2);
  }

  90% {
    left: 0;
    height: 8px;
    height: var(--loading-medium-dot-size, 8px);
    width: 8px;
    width: var(--loading-medium-dot-size, 8px);
  }
}

@keyframes nextVectorDotsXR-medium {
  25% {
    right: 0;
  }

  45%,
  50% {
    right: 11.2px;
    right: calc(var(--loading-medium-size, 32px) / 2 - var(--loading-medium-dot-size, 8px) * 1.2 / 2);
    width: 9.6px;
    width: calc(var(--loading-medium-dot-size, 8px) * 1.2);
    height: 9.6px;
    height: calc(var(--loading-medium-dot-size, 8px) * 1.2);
  }

  90% {
    right: 0;
    height: 8px;
    height: var(--loading-medium-dot-size, 8px);
    width: 8px;
    width: var(--loading-medium-dot-size, 8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .next-loading-fusion-reactor {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }

  .next-loading-fusion-reactor .next-loading-dot {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
</style>
