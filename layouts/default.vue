<script setup lang="ts">

</script>

<template>
  <div class="app-container">
    <Navbar class="z-20"></Navbar>
    <UContainer class="app-inner home-container">
      <slot></slot>
    </UContainer>
  </div>
</template>

<style>
:root {
  --background-light: url("https://dogeoss.grtsinry43.com/volantis-static/media/wallpaper/minimalist/2020/033.webp");
  --background-dark: url("https://dogeoss.grtsinry43.com/volantis-static/media/wallpaper/minimalist/2020/042.webp");
}

@media (prefers-color-scheme: light) {
  .app-container {
    background: var(--background-light) no-repeat;
  }
}

@media (prefers-color-scheme: dark) {
  .app-container {
    background: var(--background-dark) no-repeat;
  }
}

.app-container {
  background-size: cover;
  height: 100vh;
  overflow-y: auto;
}


.app-inner {
  padding-top: 5em;
}

.card {
  backdrop-filter: blur(10px);
}

</style>
