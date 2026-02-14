import type { RouteRecordRaw } from 'vue-router';

// ERP 模块路由
const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:shield-check',
      order: 1,
      title: 'IAM (身份与访问)',
    },
    name: 'IAM',
    path: '/iam',
    children: [
      {
        name: 'IAMUsers',
        path: '/iam/users',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:user',
          title: '用户管理',
        },
      },
      {
        name: 'IAMGroups',
        path: '/iam/groups',
        component: () => import('#/views/iam/users.vue'), // 复用示例页面
        meta: {
          icon: 'lucide:users-round',
          title: '用户组',
        },
      },
      {
        name: 'IAMRBAC',
        path: '/iam/rbac',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:shield',
          title: '角色权限',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:database',
      order: 2,
      title: 'MDM (主数据)',
    },
    name: 'MDM',
    path: '/mdm',
    children: [
      {
        name: 'MDMProducts',
        path: '/mdm/products',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:box',
          title: '产品管理',
        },
      },
      {
        name: 'MDMVendors',
        path: '/mdm/vendors',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:truck',
          title: '供应商',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:wallet',
      order: 3,
      title: 'FI (财务管理)',
    },
    name: 'FI',
    path: '/fi',
    children: [
      {
        name: 'FIVouchers',
        path: '/fi/vouchers',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: '凭证处理',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:building',
      order: 3,
      title: 'ORG (企业组织)',
    },
    name: 'ORG',
    path: '/org',
    children: [
      {
        name: 'ORGCompany',
        path: '/org/company',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:building',
          title: '公司代码',
        },
      },
      {
        name: 'ORGPlant',
        path: '/org/plant',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:factory',
          title: '工厂定义',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:wallet',
      order: 4,
      title: 'FI (财务管理)',
    },
    name: 'FI',
    path: '/fi',
    children: [
      {
        name: 'FIVouchers',
        path: '/fi/vouchers',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: '凭证处理',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:truck',
      order: 5,
      title: 'SCM (供应链)',
    },
    name: 'SCM',
    path: '/scm',
    children: [
      {
        name: 'SCMInventory',
        path: '/scm/inventory',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:package-search',
          title: '库存概览',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:factory',
      order: 6,
      title: 'MFG (生产制造)',
    },
    name: 'MFG',
    path: '/mfg',
    children: [
      {
        name: 'MFGOrders',
        path: '/mfg/orders',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:clipboard-list',
          title: '生产订单',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:shopping-cart',
      order: 7,
      title: 'SD (销售分销)',
    },
    name: 'SD',
    path: '/sd',
    children: [
      {
        name: 'SDOrders',
        path: '/sd/orders',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:file-plus',
          title: '销售订单',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:briefcase',
      order: 8,
      title: 'PM (项目管理)',
    },
    name: 'PM',
    path: '/pm',
    children: [
      {
        name: 'PMInvestment',
        path: '/pm/investment',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:trending-up',
          title: '投资概览',
        },
      },
      {
        name: 'PMProgress',
        path: '/pm/progress',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:activity',
          title: '进度跟踪',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:lightbulb',
      order: 9,
      title: 'RD (研发管理)',
    },
    name: 'RD',
    path: '/rd',
    children: [
      {
        name: 'RDECR',
        path: '/rd/ecr',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:git-pull-request',
          title: '变更管理',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:package',
      order: 10,
      title: 'AM (资产管理)',
    },
    name: 'AM',
    path: '/am',
    children: [
      {
        name: 'AMHistory',
        path: '/am/history',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:history',
          title: '资产全生命周期',
        },
      },
      {
        name: 'AMPM',
        path: '/am/pm',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:shield-check',
          title: '预防性维护',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:headphones',
      order: 11,
      title: 'CS (客户服务)',
    },
    name: 'CS',
    path: '/cs',
    children: [
      {
        name: 'CSField',
        path: '/cs/field',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:map-pin',
          title: '现场服务',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:settings',
      order: 12,
      title: 'SYS (系统管理)',
    },
    name: 'SYS',
    path: '/sys',
    children: [
      {
        name: 'SYSParams',
        path: '/sys/params',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:settings-2',
          title: '全局参数',
        },
      },
      {
        name: 'SYSNotification',
        path: '/sys/notification',
        component: () => import('#/views/iam/users.vue'),
        meta: {
          icon: 'lucide:bell',
          title: '通知中心配置',
        },
      },
    ],
  },
];

export default routes;
