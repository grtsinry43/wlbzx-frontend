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

const regResp = ref("得到的响应将会显示在这里哦");
const uuidInput = ref("");

const clickRegHandle = async function () {
  const resp = await $fetch("/api/user", {
    method: "POST",
    headers: {
      join: "yunlugu2024",
      type: "web"
    }
  });
  console.log(resp)
  regResp.value = JSON.stringify(resp);
};
useHead({
  title: '任务一｜grtsinry43的招新小网站(｡･ω･｡)ﾉ♡',
})
const clickVerifyHandle = async function () {
  console.log(uuidInput.value)
  const resp = await $fetch("/api/user/verify-reg", {
    params: {
      uuid: uuidInput.value
    }
  });
  console.log(resp)
  if (resp.code == 0) {
    toast.add({
      id: 'task1_finished',
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
      id: 'task1_finished',
      title: '额。。再接再厉',
      description: '找不到注册的用户哇',
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
    <div class="tip flex">
      <div class="icon flex justify-center items-center">
        <UIcon name="i-iwwa:information"></UIcon>
      </div>
      <div class="tip-inner">
        <p>以下的每个问题都可以用两种方式解决，一个是网页上给大家写好的，点击下就可以完成的</p>
        <p>另一种是大家用不限语言/工具完成，完成之后可以验证是否成功的</p>
        <p>每当你用第二种完成时会<b>覆盖</b>第一种的完成状态哦，当你成功将三个都用自己的方式完成之后，作业的第二部分就结束啦
        </p>
        <p><b>那么开始叭🎉</b></p>
      </div>
    </div>
    <p class="title font-bold">第一部分</p>
    <div class="desc">
      <p>众所周知，在后端设计中，权限管理和认证是很重要的，用户自己当然只能访问自己的数据，总不能看到别人的东西哇</p>
      <p>因此我们第一部分就与这有关，我这里呢有一个接口，是用来用户注册的，想要注册成功，需要你带上 Header
        <b>join</b> <b>yunlugu2024</b></p>
      不限语言或工具，尝试调用这个接口获取一个uuid，然后..<b>保存好这个uuid，下面两个部分都要用到哦👀</b>
    </div>
    <div class="main-container flex mt-6">
      <div class="auto flex-1">
        <UButton class="m-2" @click="clickRegHandle">注册用户</UButton>
        <UTextarea v-model="regResp" placeholder="得到的响应将会显示在这里哦"
                   :rows="10"
                   disabled class="m-2"></UTextarea>
      </div>
      <UDivider label="OR" orientation="vertical"/>
      <div class="task flex-1 p-6">
        <p>请请求以下接口：</p>
        <b>POST</b> https://wlbzx.grtsinry43.com/api/user
        <p>当接口成功返回UUID时，你可以在下面验证哇：</p>
        <div class="task-actions flex w-100 justify-center items-center mt-6">
          <UInput placeholder="输入你得到的UUID" v-model="uuidInput" class="flex-1"></UInput>
          <UButton class="ml-4 h-7" @click="clickVerifyHandle">验证</UButton>
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
