<script setup lang="ts">
import {ref} from 'vue';
import {useRoute} from 'vue-router';

const toast = useToast();

const links = [{
  label: '首页',
  to: '/'
}, {
  label: '第一部分',
  to: '/task1',
}, {
  label: '第二部分',
  to: '/task2'
}, {
  label: '第三部分',
  to: '/task3'
}];

const genKeyResp = ref("");
const genTokenResp = ref("");
const key = ref("");
const keyInput = ref("");
const uuid = ref("");
const token = ref("");
const tokenInput = ref("");

const generateKeyHandle = async function () {
  const resp = await $fetch("/api/api/auth/gen_key");
  genKeyResp.value = JSON.stringify(resp);
};

const generateTokenHandle = async function () {
  if (!key.value || !uuid.value) {
    toast.add({
      id: 'task2_error',
      title: '额，出错了',
      description: '请填写完整信息',
      icon: 'i-formkit:close',
      timeout: 0,
      actions: [{
        label: '好的',
        click: () => {
          console.log(222)
        }
      }]
    });
    return;
  }
  const resp = await $fetch("/api/auth/get_token", {
    method: "POST",
    params: {
      key: key.value,
      uuid: uuid.value
    }
  });
  genTokenResp.value = JSON.stringify(resp);
};

const clickVerifyHandle = async function () {
  console.log(keyInput.value, tokenInput.value)
  const resp = await $fetch("/api/auth/verify_token", {
    method: "POST",
    headers: {
      'type': 'web'
    },
    params: {
      key: keyInput.value,
      token: tokenInput.value
    }
  });
  console.log(resp)
  if (resp.code == 0) {
    toast.add({
      id: 'task2_finished',
      title: '成功',
      description: '成功完成了这个任务',
      icon: 'i-formkit:check',
      timeout: 0,
      actions: [{
        label: '好的',
        click: () => {
          console.log(222)
        }
      }]
    });
  } else {
    toast.add({
      id: 'task2_finished',
      title: '额。。再接再厉',
      description: '验证失败',
      icon: 'i-formkit:check',
      timeout: 0,
      actions: [{
        label: '好的',
        click: () => {
          console.log(222)
        }
      }]
    });
  }
}
const route = useRoute();
</script>

<template>
  <UCard class="task-container mt-6 mb-6 bg-opacity-80 dark:bg-opacity-80">
    <UBreadcrumb :links="links" class="mb-6">
      <template #default="{ link, index }">
        <UBadge :color="route.path === link.to ? 'primary' : 'gray'" class="rounded-full truncate">
          {{ index + 1 }}. {{ link.label }}
        </UBadge>
      </template>
    </UBreadcrumb>
    <p class="title font-bold">第二部分</p>
    <div class="desc">
      <p>在我们平时使用网页的时候，应该是只用登录一次就可以访问接下来的内容</p>
      <p>由于HTTP无法保留状态，因此我们使用了jwt进行验证，接下来请查阅相关资料完成任务</p>
    </div>
    <div class="main-container flex mt-6">
      <div class="auto flex-1">
        <UButton class="m-2" @click="generateKeyHandle">生成key</UButton>
        <UTextarea v-model="genKeyResp" placeholder="得到的内容将会显示在这里哦"
                   :rows="3"
                   disabled class="m-2"></UTextarea>
        <UDivider class="m-6"/>
        <UInput placeholder="输入你的UUID" v-model="uuid" class="m-2"></UInput>
        <UInput placeholder="输入你的key" v-model="key" class="m-2"></UInput>
        <UButton class="m-2" @click="generateTokenHandle">生成Token</UButton>
        <UTextarea v-model="genTokenResp" placeholder="得到的内容将会显示在这里哦"
                   :rows="7"
                   disabled class="m-2"></UTextarea>
      </div>
      <UDivider label="OR" orientation="vertical"/>
      <div class="task flex-1 p-6">
        <p>看下你所生成的token能否正常解析👀</p>
        <b>POST</b> https://wlbzx.grtsinry43.com/api/auth/verify_token
        <p>你可以在下面快速验证哇：</p>
        <div class="task-actions w-100 justify-center items-center mt-6">
          <UInput placeholder="输入你的key" v-model="keyInput" class="flex m-2"></UInput>
          <UInput placeholder="输入你的token" v-model="tokenInput" class="flex m-2"></UInput>
          <UButton class="m-2" @click="clickVerifyHandle">验证</UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.title {
  font-size: 1.5em;
  padding: 0.5em 0;
}

.task-container {
  backdrop-filter: blur(20px);
}

.desc {
  line-break: auto;
}

.tip {
  border-radius: 3px;
  padding: 10px;
  background: rgba(47, 135, 255, 0.4);
}

.icon {
  width: 1.5em;
  font-size: 2em;
}

.task-actions {
  width: 100%
}
</style>
