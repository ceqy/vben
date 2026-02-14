<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import type { MenuSearchItem } from '#/api/core/menu';

import { recordMenuVisit, searchMenus } from '#/api/core/menu';

const router = useRouter();
const visible = ref(false);
const keyword = ref('');
const searchResults = ref<MenuSearchItem[]>([]);
const selectedIndex = ref(0);
const loading = ref(false);

// 搜索菜单
const debouncedSearch = (() => {
  let timer: ReturnType<typeof setTimeout>;
  return async (value: string) => {
    clearTimeout(timer);
    if (!value.trim()) {
      searchResults.value = [];
      return;
    }
    timer = setTimeout(async () => {
      loading.value = true;
      try {
        searchResults.value = await searchMenus(value);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        loading.value = false;
      }
    }, 300);
  };
})();

watch(keyword, (value) => {
  selectedIndex.value = 0;
  debouncedSearch(value);
});

// 快捷键处理
function handleKeydown(e: KeyboardEvent) {
  // Cmd+K 或 Ctrl+K 打开搜索
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    visible.value = !visible.value;
    return;
  }

  if (!visible.value) return;

  // ESC 关闭
  if (e.key === 'Escape') {
    visible.value = false;
    return;
  }

  // 上下键选择
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex.value = Math.min(
      selectedIndex.value + 1,
      searchResults.value.length - 1,
    );
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  }

  // Enter 确认
  if (e.key === 'Enter' && searchResults.value[selectedIndex.value]) {
    selectMenu(searchResults.value[selectedIndex.value]);
  }
}

// 选择菜单
async function selectMenu(menu: MenuSearchItem) {
  visible.value = false;
  keyword.value = '';
  await recordMenuVisit(menu.id);
  router.push(menu.path);
}

// 高亮关键词
function highlightKeyword(text: string) {
  if (!keyword.value) return text;
  const regex = new RegExp(`(${keyword.value})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// 点击遮罩关闭
function handleMaskClick() {
  visible.value = false;
}
</script>

<template>
  <!-- 搜索触发按钮 -->
  <div
    class="flex cursor-pointer items-center rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
    @click="visible = true"
  >
    <span class="i-lucide:search mr-2"></span>
    <span>搜索菜单...</span>
    <kbd
      class="ml-auto rounded border bg-muted px-2 py-0.5 text-xs font-mono"
    >
      ⌘K
    </kbd>
  </div>

  <!-- 搜索弹窗 -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh]"
        @click="handleMaskClick"
      >
        <div
          class="w-full max-w-2xl rounded-lg border bg-background shadow-2xl"
          @click.stop
        >
          <!-- 搜索输入框 -->
          <div class="flex items-center border-b px-4 py-3">
            <span class="i-lucide:search mr-3 text-xl text-muted-foreground"></span>
            <input
              v-model="keyword"
              autofocus
              class="flex-1 bg-transparent text-base outline-none"
              placeholder="搜索功能模块、菜单..."
              type="text"
            />
            <kbd
              class="ml-2 rounded border bg-muted px-2 py-1 text-xs font-mono"
            >
              ESC
            </kbd>
          </div>

          <!-- 搜索结果 -->
          <div class="max-h-[60vh] overflow-y-auto">
            <div v-if="loading" class="py-12 text-center text-muted-foreground">
              <span class="i-lucide:loader-2 animate-spin text-2xl"></span>
              <div class="mt-2">搜索中...</div>
            </div>

            <div
              v-else-if="searchResults.length > 0"
              class="divide-y"
            >
              <div
                v-for="(item, index) in searchResults"
                :key="item.id"
                :class="{
                  'bg-accent': index === selectedIndex,
                }"
                class="flex cursor-pointer items-center px-4 py-3 transition-colors hover:bg-accent"
                @click="selectMenu(item)"
                @mouseenter="selectedIndex = index"
              >
                <span
                  v-if="item.icon"
                  :class="item.icon"
                  class="mr-3 text-xl"
                ></span>
                <div class="flex-1 overflow-hidden">
                  <div
                    class="truncate font-medium"
                    v-html="highlightKeyword(item.title)"
                  ></div>
                  <div class="mt-1 flex items-center text-xs text-muted-foreground">
                    <span
                      v-for="(crumb, idx) in item.breadcrumb"
                      :key="idx"
                      class="flex items-center"
                    >
                      <span v-if="idx > 0" class="i-lucide:chevron-right mx-1"></span>
                      <span>{{ crumb }}</span>
                    </span>
                  </div>
                </div>
                <span
                  v-if="item.moduleCode"
                  class="ml-2 rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {{ item.moduleCode }}
                </span>
              </div>
            </div>

            <div
              v-else-if="keyword && !loading"
              class="py-12 text-center text-muted-foreground"
            >
              <span class="i-lucide:search-x text-4xl"></span>
              <div class="mt-2">未找到相关功能</div>
            </div>

            <div v-else class="px-4 py-8">
              <div class="mb-4 text-sm font-medium">快捷键</div>
              <div class="space-y-2 text-sm text-muted-foreground">
                <div class="flex items-center justify-between">
                  <span>打开/关闭搜索</span>
                  <kbd class="rounded border bg-muted px-2 py-1 font-mono">⌘K</kbd>
                </div>
                <div class="flex items-center justify-between">
                  <span>上下选择</span>
                  <div class="space-x-1">
                    <kbd class="rounded border bg-muted px-2 py-1 font-mono">↑</kbd>
                    <kbd class="rounded border bg-muted px-2 py-1 font-mono">↓</kbd>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span>确认选择</span>
                  <kbd class="rounded border bg-muted px-2 py-1 font-mono">Enter</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

mark {
  background-color: rgb(254 240 138);
  padding: 0 2px;
  border-radius: 2px;
}
</style>
