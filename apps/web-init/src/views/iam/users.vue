<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const message = ref('IAM 用户管理页面');
const stats = ref({
  totalUsers: 1234,
  activeUsers: 892,
  newUsers: 45,
  blockedUsers: 12,
});

onMounted(() => {
  console.log('IAM Users page mounted');
});
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ message }}</h1>
      <p class="mt-2 text-muted-foreground">
        管理系统用户、权限和访问控制
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">总用户数</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.totalUsers }}</p>
          </div>
          <span class="i-lucide:users text-4xl text-primary"></span>
        </div>
      </div>
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">活跃用户</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.activeUsers }}</p>
          </div>
          <span class="i-lucide:user-check text-4xl text-green-500"></span>
        </div>
      </div>
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">新增用户</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.newUsers }}</p>
          </div>
          <span class="i-lucide:user-plus text-4xl text-blue-500"></span>
        </div>
      </div>
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">禁用用户</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.blockedUsers }}</p>
          </div>
          <span class="i-lucide:user-x text-4xl text-red-500"></span>
        </div>
      </div>
    </div>

    <!-- 功能区域 -->
    <div class="rounded-lg border bg-card p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">用户列表</h2>
        <button
          class="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          <span class="i-lucide:plus mr-2"></span>
          添加用户
        </button>
      </div>
      <div class="text-center text-muted-foreground py-12">
        <span class="i-lucide:users text-6xl mb-4"></span>
        <p>这是一个示例页面，展示 ERP 菜单系统的功能</p>
        <p class="mt-2 text-sm">
          使用 <kbd class="rounded border bg-muted px-2 py-1 font-mono">⌘K</kbd> 打开菜单搜索
        </p>
      </div>
    </div>
  </div>
</template>
