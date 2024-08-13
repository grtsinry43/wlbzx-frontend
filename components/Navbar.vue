<script setup lang="ts">

</script>

<template>
  <div class="nav bg-opacity-30 bg-[#FFFFFF] dark:bg-[#161616] dark:bg-opacity-30">
    <UContainer class="nav-inner flex items-center">
      <span class="title flex-1">欢迎来到网络部招新 (｡･ω･｡)ﾉ♡ </span>
      <ColorScheme class="theme-option">
        <USelectMenu v-model="$colorMode.preference" :options="['system', 'light', 'dark']"/>
      </ColorScheme>
    </UContainer>
  </div>
</template>

<style scoped>
.theme-option {
  width: 6em;
}

.nav {
  width: 100%;
  position: fixed;
  border: none;
  outline: none;
  height: 5em;
  backdrop-filter: blur(3px);
}

.nav-inner {
  height: 100%;
}

</style>
