<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { MenuItem } from '#/api/core/menu';
import type { WorkspaceModule } from '#/api/core/workspace';

import {
  addFavorite,
  getFavoriteMenus,
  getRecentMenus,
  recordMenuVisit,
  removeFavorite,
} from '#/api/core/menu';
import { getWorkspaceModules } from '#/api/core/workspace';

interface ModuleCardProps {
  module: WorkspaceModule;
}

const router = useRouter();
const modules = ref<WorkspaceModule[]>([]);
const favoriteMenus = ref<MenuItem[]>([]);
const recentMenus = ref<MenuItem[]>([]);
const loading = ref(true);

// 加载数据
onMounted(async () => {
  try {
    const [modulesData, favoritesData, recentData] = await Promise.all([
      getWorkspaceModules(),
      getFavoriteMenus(),
      getRecentMenus(8),
    ]);
    modules.value = modulesData;
    favoriteMenus.value = favoritesData;
    recentMenus.value = recentData;
  } catch (error) {
    console.error('Failed to load workspace data:', error);
  } finally {
    loading.value = false;
  }
});

// 导航到菜单
async function navigateToMenu(menu: MenuItem) {
  if (menu.path) {
    await recordMenuVisit(menu.id);
    router.push(menu.path);
  }
}

// 切换收藏
async function toggleFavorite(menu: MenuItem) {
  const isFavorite = favoriteMenus.value.some((m) => m.id === menu.id);
  if (isFavorite) {
    await removeFavorite(menu.id);
    favoriteMenus.value = favoriteMenus.value.filter((m) => m.id !== menu.id);
  } else {
    await addFavorite(menu.id);
    favoriteMenus.value.push(menu);
  }
}

// 检查是否收藏
function isFavorite(menuId: string) {
  return favoriteMenus.value.some((m) => m.id === menuId);
}
</script>

<template>
  <div class="workspace-container p-6">
    <!-- 收藏和最近访问 -->
    <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- 收藏的菜单 -->
      <div class="rounded-lg border bg-card p-6">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            <span class="i-lucide:star mr-2 text-yellow-500"></span>
            收藏的功能
          </h3>
        </div>
        <div v-if="favoriteMenus.length > 0" class="grid grid-cols-2 gap-3">
          <div
            v-for="menu in favoriteMenus"
            :key="menu.id"
            class="group flex cursor-pointer items-center rounded-md border p-3 transition-all hover:border-primary hover:shadow-sm"
            @click="navigateToMenu(menu)"
          >
            <span :class="menu.icon" class="mr-3 text-xl text-primary"></span>
            <div class="flex-1 overflow-hidden">
              <div class="truncate text-sm font-medium">{{ menu.title }}</div>
              <div
                v-if="menu.moduleCode"
                class="truncate text-xs text-muted-foreground"
              >
                {{ menu.moduleCode }}
              </div>
            </div>
            <span
              class="i-lucide:star-off ml-2 opacity-0 transition-opacity group-hover:opacity-100"
              @click.stop="toggleFavorite(menu)"
            ></span>
          </div>
        </div>
        <div v-else class="py-8 text-center text-muted-foreground">
          暂无收藏，点击模块卡片中的星标添加收藏
        </div>
      </div>

      <!-- 最近访问 -->
      <div class="rounded-lg border bg-card p-6">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            <span class="i-lucide:history mr-2"></span>
            最近访问
          </h3>
        </div>
        <div v-if="recentMenus.length > 0" class="space-y-2">
          <div
            v-for="menu in recentMenus"
            :key="menu.id"
            class="flex cursor-pointer items-center rounded-md p-2 transition-colors hover:bg-accent"
            @click="navigateToMenu(menu)"
          >
            <span :class="menu.icon" class="mr-3 text-lg"></span>
            <div class="flex-1 overflow-hidden">
              <div class="truncate text-sm">{{ menu.title }}</div>
            </div>
            <span class="i-lucide:chevron-right text-muted-foreground"></span>
          </div>
        </div>
        <div v-else class="py-8 text-center text-muted-foreground">
          暂无访问记录
        </div>
      </div>
    </div>

    <!-- 模块卡片 -->
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-semibold">功能模块</h3>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="module in modules"
        :key="module.code"
        class="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
      >
        <!-- 模块头部 -->
        <div class="mb-4 flex items-start justify-between">
          <div class="flex items-center">
            <div
              :style="{ backgroundColor: module.color }"
              class="flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <span :class="module.icon" class="text-2xl text-white"></span>
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-semibold">{{ module.name }}</h4>
              <p class="text-xs text-muted-foreground">{{ module.code }}</p>
            </div>
          </div>
        </div>

        <!-- 模块描述 -->
        <p v-if="module.description" class="mb-4 text-sm text-muted-foreground">
          {{ module.description }}
        </p>

        <!-- 统计数据 -->
        <div
          v-if="module.stats && module.stats.length > 0"
          class="mb-4 grid grid-cols-2 gap-3"
        >
          <div
            v-for="(stat, index) in module.stats"
            :key="index"
            class="rounded-md bg-accent/50 p-3"
          >
            <div class="text-xs text-muted-foreground">{{ stat.label }}</div>
            <div class="mt-1 flex items-baseline">
              <span class="text-lg font-semibold">{{ stat.value }}</span>
              <span
                v-if="stat.trend"
                :class="{
                  'text-green-500': stat.trend === 'up',
                  'text-red-500': stat.trend === 'down',
                }"
                class="ml-2 text-xs"
              >
                {{ stat.trendValue }}
              </span>
            </div>
          </div>
        </div>

        <!-- 快捷菜单 -->
        <div v-if="module.quickMenus && module.quickMenus.length > 0">
          <div class="mb-2 text-xs font-medium text-muted-foreground">
            快捷入口
          </div>
          <div class="space-y-1">
            <div
              v-for="menu in module.quickMenus"
              :key="menu.id"
              class="flex cursor-pointer items-center rounded-md p-2 transition-colors hover:bg-accent"
              @click="navigateToMenu(menu)"
            >
              <span :class="menu.icon" class="mr-2 text-sm"></span>
              <span class="flex-1 truncate text-sm">{{ menu.title }}</span>
              <span
                :class="{
                  'i-lucide:star-off': !isFavorite(menu.id),
                  'i-lucide:star': isFavorite(menu.id),
                  'text-yellow-500': isFavorite(menu.id),
                }"
                class="opacity-0 transition-opacity group-hover:opacity-100"
                @click.stop="toggleFavorite(menu)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workspace-container {
  min-height: calc(100vh - 120px);
}
</style>
