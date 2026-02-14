/**
 * 工作台 API
 */
import type { MenuItem } from './menu';

import { requestClient } from '#/api/request';

export interface WorkspaceModule {
  /** 模块代码 */
  code: string;
  /** 模块名称 */
  name: string;
  /** 模块图标 */
  icon: string;
  /** 模块颜色 */
  color: string;
  /** 模块描述 */
  description?: string;
  /** 快捷菜单 */
  quickMenus: MenuItem[];
  /** 统计数据 */
  stats?: {
    label: string;
    value: number | string;
    trend?: 'up' | 'down';
    trendValue?: string;
  }[];
}

export interface WorkspaceConfig {
  /** 用户 ID */
  userId: string;
  /** 布局配置 */
  layout: {
    /** 显示模块 */
    modules: string[];
    /** 每行显示数量 */
    columns: number;
  };
  /** 自定义配置 */
  customization?: Record<string, any>;
}

/**
 * 获取工作台模块列表
 */
export async function getWorkspaceModules() {
  return requestClient.get<WorkspaceModule[]>('/workspace/modules');
}

/**
 * 获取工作台配置
 */
export async function getWorkspaceConfig() {
  return requestClient.get<WorkspaceConfig>('/workspace/config');
}

/**
 * 保存工作台配置
 */
export async function saveWorkspaceConfig(config: Partial<WorkspaceConfig>) {
  return requestClient.post('/workspace/config', config);
}
