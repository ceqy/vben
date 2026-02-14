# ERP 动态工作台菜单系统

## 📋 概述

这是一个为企业级 ERP 系统设计的**动态工作台模式**菜单系统，支持：

- ✅ **后端动态返回菜单** - 基于用户权限动态生成
- ✅ **菜单搜索 (⌘K)** - 快速查找和跳转功能
- ✅ **收藏功能** - 收藏常用功能模块
- ✅ **最近访问** - 自动记录访问历史
- ✅ **多语言支持** - 国际化菜单标题
- ✅ **权限控制** - 基于 RBAC 的菜单过滤
- ✅ **5 级菜单结构** - 支持复杂的企业级导航

## 🏗️ 架构设计

### 菜单层级结构

```
Level 1: 模块 (IAM, MDM, FI, SCM, MFG, SD, SYS...)
  └─ Level 2: 功能域 (身份管理, 访问控制...)
      └─ Level 3: 具体功能 (用户管理, 角色权限...)
          └─ Level 4: 详情页/子功能
              └─ Level 5: 标签页/内嵌视图
```

### 技术栈

- **前端框架**: Vue 3 + TypeScript
- **UI 组件**: Ant Design Vue
- **路由**: Vue Router
- **状态管理**: Pinia
- **Mock 服务**: Nitro
- **图标**: Lucide Icons

## 📁 文件结构

```
apps/web-init/
├── src/
│   ├── api/core/
│   │   ├── menu.ts          # 菜单 API
│   │   └── workspace.ts     # 工作台 API
│   ├── components/
│   │   └── menu-search.vue  # 菜单搜索组件 (⌘K)
│   ├── views/
│   │   ├── workspace/       # 工作台页面
│   │   │   └── index.vue
│   │   └── iam/             # IAM 模块示例
│   │       └── users.vue
│   ├── router/routes/modules/
│   │   ├── dashboard.ts     # 仪表盘路由
│   │   └── erp.ts          # ERP 模块路由
│   └── layouts/
│       └── basic.vue        # 基础布局（集成搜索）

apps/backend-mock/api/
├── menu/
│   ├── tree.ts              # 菜单树数据
│   ├── list.ts              # 扁平化菜单列表
│   ├── search.ts            # 菜单搜索
│   ├── favorites.ts         # 收藏列表
│   ├── favorites.post.ts    # 添加收藏
│   ├── favorites/[id].delete.ts  # 删除收藏
│   ├── recent.ts            # 最近访问
│   └── visit.post.ts        # 记录访问
└── workspace/
    ├── modules.ts           # 工作台模块
    ├── config.ts            # 工作台配置
    └── config.post.ts       # 保存配置
```

## 🚀 快速开始

### 1. 启动开发服务器

```bash
pnpm --filter @vben/web-init dev
```

访问: http://localhost:5555

### 2. 访问工作台

登录后，首页即为 ERP 工作台，展示所有功能模块卡片。

### 3. 使用菜单搜索

- 按 `⌘K` (Mac) 或 `Ctrl+K` (Windows) 打开搜索
- 输入关键词搜索菜单
- 使用 `↑` `↓` 选择，`Enter` 确认
- 按 `ESC` 关闭搜索

## 🎯 核心功能

### 1. 工作台模块卡片

每个模块卡片包含：
- 模块图标和名称
- 模块描述
- 统计数据（可选）
- 快捷入口菜单
- 收藏功能

### 2. 菜单搜索 (⌘K)

**功能特性**：
- 实时搜索，300ms 防抖
- 高亮匹配关键词
- 显示面包屑导航
- 支持模块代码过滤
- 键盘快捷操作

**使用示例**：
```
搜索 "用户" → 显示所有包含"用户"的菜单
搜索 "IAM" → 显示 IAM 模块下的所有菜单
```

### 3. 收藏功能

- 点击菜单项的星标图标收藏
- 收藏的菜单显示在工作台顶部
- 支持取消收藏

### 4. 最近访问

- 自动记录用户访问的菜单
- 显示最近 8 条访问记录
- 按访问时间倒序排列

## 🔌 API 接口

### 菜单相关

```typescript
// 获取菜单树
GET /api/menu/tree
Response: MenuItem[]

// 搜索菜单
GET /api/menu/search?keyword=用户
Response: MenuSearchItem[]

// 获取收藏
GET /api/menu/favorites
Response: MenuItem[]

// 添加收藏
POST /api/menu/favorites
Body: { menuId: string }

// 删除收藏
DELETE /api/menu/favorites/:id

// 获取最近访问
GET /api/menu/recent?limit=10
Response: MenuItem[]

// 记录访问
POST /api/menu/visit
Body: { menuId: string }
```

### 工作台相关

```typescript
// 获取工作台模块
GET /api/workspace/modules
Response: WorkspaceModule[]

// 获取工作台配置
GET /api/workspace/config
Response: WorkspaceConfig

// 保存工作台配置
POST /api/workspace/config
Body: Partial<WorkspaceConfig>
```

## 📊 数据结构

### MenuItem

```typescript
interface MenuItem {
  id: string;              // 菜单 ID
  parentId?: string;       // 父级 ID
  name: string;            // 菜单名称
  title: string;           // 菜单标题
  icon?: string;           // 图标
  path?: string;           // 路由路径
  level: number;           // 层级 (1-5)
  order?: number;          // 排序
  hidden?: boolean;        // 是否隐藏
  permission?: string;     // 权限标识
  moduleCode?: string;     // 模块代码
  badge?: string | number; // 徽章
  children?: MenuItem[];   // 子菜单
}
```

### WorkspaceModule

```typescript
interface WorkspaceModule {
  code: string;            // 模块代码
  name: string;            // 模块名称
  icon: string;            // 图标
  color: string;           // 颜色
  description?: string;    // 描述
  quickMenus: MenuItem[];  // 快捷菜单
  stats?: {                // 统计数据
    label: string;
    value: number | string;
    trend?: 'up' | 'down';
    trendValue?: string;
  }[];
}
```

## 🎨 自定义配置

### 修改模块颜色

编辑 `apps/backend-mock/api/workspace/modules.ts`:

```typescript
{
  code: 'IAM',
  color: '#3b82f6',  // 修改为你想要的颜色
  // ...
}
```

### 添加新模块

1. 在 `apps/backend-mock/api/menu/tree.ts` 添加菜单数据
2. 在 `apps/backend-mock/api/workspace/modules.ts` 添加模块卡片
3. 创建对应的路由和页面组件

### 自定义快捷键

编辑 `apps/web-init/src/components/menu-search.vue`:

```typescript
// 修改快捷键判断
if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
  // 改为其他按键，如 'p'
}
```

## 🔐 权限控制

菜单系统支持基于 RBAC 的权限控制：

1. 每个菜单项可以设置 `permission` 字段
2. 后端根据用户角色过滤菜单
3. 前端自动隐藏无权限的菜单

示例：
```typescript
{
  id: 'iam-users',
  title: '用户管理',
  permission: 'iam:user:view',  // 需要此权限才能看到
  // ...
}
```

## 🌍 国际化

菜单标题支持多语言：

```typescript
// 在 locales 文件中定义
{
  "menu": {
    "iam": "IAM (Identity & Access)",
    "iam.users": "User Management"
  }
}

// 在菜单数据中使用
{
  title: $t('menu.iam.users')
}
```

## 📝 最佳实践

1. **菜单层级不要超过 5 级** - 保持导航简洁
2. **使用语义化的菜单 ID** - 便于维护和调试
3. **合理使用图标** - 提升视觉识别度
4. **设置合适的排序** - 常用功能放在前面
5. **添加模块描述** - 帮助用户理解功能
6. **提供快捷入口** - 减少点击层级

## 🐛 故障排查

### 菜单搜索不工作

1. 检查 Mock 服务是否启动
2. 查看浏览器控制台是否有错误
3. 确认 API 路���是否正确

### 收藏功能异常

1. 检查用户是否已登录
2. 查看 localStorage 是否被禁用
3. 确认 API 返回数据格式正确

### 工作台模块不显示

1. 检查 Mock 数据是否正确
2. 确认路由配置是否正确
3. 查看组件是否正确导入

## 📚 相关文档

- [Vben Admin 文档](https://doc.vben.pro)
- [Vue Router 文档](https://router.vuejs.org)
- [Ant Design Vue 文档](https://antdv.com)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT
