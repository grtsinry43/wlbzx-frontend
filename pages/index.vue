<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';

const words = ['大佬云集', '经验丰富', '活泼可爱'];
const currentWord = ref('');
let wordIndex = 0;
let charIndex = 0;

const updateWord = () => {
  currentWord.value = '';  // Clear the current word
  charIndex = 0;  // Reset character index
  displayNextChar();
};

const displayNextChar = () => {
  if (charIndex < words[wordIndex].length) {
    currentWord.value += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(displayNextChar, 150);  // Adjust delay between characters
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(updateWord, 1000);  // Adjust delay between words
  }
};

onMounted(() => {
  updateWord();  // Start the first word
});

onUnmounted(() => {
  // If necessary, clear any pending timeouts
});
</script>

<template>
  <div class="home-container">
    <div class="title tracking-wider">欢迎来到网络部招新😏</div>
    <div class="desc">这里是 <span class="word">{{ currentWord }}</span> 的信息技术中心</div>
    <div class="action-container flex justify-center">
      <UButton class="mr-6" to="/task1">开始叭 ( •̀ ω •́ )✧</UButton>
      <UButton color="white">了解我们</UButton>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding-top: 4em;
}

.title {
  font-size: 4em;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.desc {
  text-align: center;
  font-size: 2em;
  font-weight: 300;
  transition: all 0.5s;
}

.word {
  display: inline-block;
  font-weight: bold;
  animation: jump 0.5s ease-in-out;
}

@keyframes jump {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.5;
  }
}

.action-container {
  padding-top: 2em;
}
</style>
