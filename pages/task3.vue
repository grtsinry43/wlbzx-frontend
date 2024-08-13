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
const simpleResp = ref("{\n" +
    "    \"code\": 0,\n" +
    "    \"msg\": \"\",\n" +
    "    \"data\": {\n" +
    "        \"count\": 1,\n" +
    "        \"time\": \"2024-08-14 22:06:23.482654\"\n" +
    "    }\n" +
    "}");

const simpleAns = ref(JSON.stringify({
  count: 1,
  time: "2024-08-14 22:06:23.482654",
  server_time: "2024-08-14 22:23:49.982027",
  local_time: "2024-08-14 14:23:49.985",
  delay_time: "0:00:00.000014"
}));

const clickRegHandle = async function () {
  const resp = await $fetch("/api/api/user", {
    method: "POST",
    headers: {
      join: "yunlugu2024",
      type: "web"
    }
  });
  console.log(resp)
  regResp.value = JSON.stringify(resp);
};

const clickVerifyHandle = async function () {
  console.log(uuidInput.value)
  const resp = await $fetch("/api/api/user/verify-reg", {
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
        <p>这个部分我们会到招新的时候看大家的代码咯🎉</p>
        <p class="text-114514">悄悄说一下，这个问题是上届学长出的，但我觉得很有价值，于是简单升级了下</p>
      </div>
    </div>
    <p class="title font-bold">第三部分</p>
    <div class="desc">
      <p>我准备了一个小接口，<span class="text-114514">悄悄</span>访问一下就能得到以下数据</p>
      <UTextarea v-model="simpleResp" placeholder="这个是拿来看的 为什么要把它们都删了😡"
                 :rows="8" class="m-2 code-container"
      ></UTextarea>
      <p>现在我想知道网络传输过程中的延时，你要做的就是拿到响应中的时间字符串，然后计算出延时</p>
      不限语言或工具，尝试调用这个接口，得到类似以下内容
      <UTextarea v-model="simpleAns" placeholder="这个是拿来看的 为什么要把它们都删了😡"
                 :rows="8" class="m-2 code-container-2"
      ></UTextarea>
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
  width: 2em;
  font-size: 1.5em;
}

.task-actions {
  width: 100%
}

.text-114514 {
  color: #ccc;
  text-decoration: line-through;
}

.code-container {
  width: 20em;
}

.code-container-2 {
  width: 40em;
}
</style>
