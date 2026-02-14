import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/menu/all');
}

// ==================== 动态工作台菜单系统 ====================

export interface MenuItem {
  /** 菜单 ID */
  id: string;
  /** 父级 ID */
  parentId?: string;
  /** 菜单名称 */
  name: string;
  /** 菜单标题 */
  title: string;
  /** 菜单图标 */
  icon?: string;
  /** 路由路径 */
  path?: string;
  /** 组件路径 */
  component?: string;
  /** 菜单层级 (1-5) */
  level: number;
  /** 排序 */
  order?: number;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 权限标识 */
  permission?: string;
  /** 模块代码 (IAM, MDM, FI...) */
  moduleCode?: string;
  /** 徽章 */
  badge?: string | number;
  /** 子菜单 */
  children?: MenuItem[];
  /** 扩展元数据 */
  meta?: Record<string, any>;
}

export interface MenuSearchItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  moduleCode?: string;
  breadcrumb: string[];
}

/**
 * 获取用户菜单树
 */
export async function getMenuTree() {
  return requestClient.get<MenuItem[]>('/menu/tree');
}

/**
 * 获取扁平化菜单列表（用于搜索）
 */
export async function getMenuList() {
  return requestClient.get<MenuSearchItem[]>('/menu/list');
}

/**
 * 获取用户收藏的菜单
 */
export async function getFavoriteMenus() {
  return requestClient.get<MenuItem[]>('/menu/favorites');
}

/**
 * 添加菜单收藏
 */
export async function addFavorite(menuId: string) {
  return requestClient.post('/menu/favorites', { menuId });
}

/**
 * 移除菜单收藏
 */
export async function removeFavorite(menuId: string) {
  return requestClient.delete(`/menu/favorites/${menuId}`);
}

/**
 * 获取最近访问的菜单
 */
export async function getRecentMenus(limit = 10) {
  return requestClient.get<MenuItem[]>('/menu/recent', { params: { limit } });
}

/**
 * 记录菜单访问
 */
export async function recordMenuVisit(menuId: string) {
  return requestClient.post('/menu/visit', { menuId });
}

/**
 * 搜索菜单
 */
export async function searchMenus(keyword: string) {
  return requestClient.get<MenuSearchItem[]>('/menu/search', {
    params: { keyword },
  });
}
