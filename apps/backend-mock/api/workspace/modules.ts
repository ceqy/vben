import { eventHandler } from 'h3';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 工作台模块数据 - 完整的 11 个 ERP 模块
const WORKSPACE_MODULES = [
  {
    code: 'IAM',
    name: 'IAM (身份与访问)',
    icon: 'lucide:shield-check',
    color: '#3b82f6',
    description: '管理用户、角色、权限和租户',
    quickMenus: [
      { id: 'iam-users', title: '用户管理', path: '/iam/users', icon: 'lucide:user', moduleCode: 'IAM', level: 3 },
      { id: 'iam-rbac', title: '角色权限', path: '/iam/rbac', icon: 'lucide:shield', moduleCode: 'IAM', level: 3 },
      { id: 'iam-tenants', title: '租户列表', path: '/iam/tenants', icon: 'lucide:building-2', moduleCode: 'IAM', level: 3 },
    ],
    stats: [
      { label: '总用户数', value: '1,234', trend: 'up', trendValue: '+12%' },
      { label: '活跃租户', value: '89', trend: 'up', trendValue: '+5%' },
    ],
  },
  {
    code: 'MDM',
    name: 'MDM (主数据)',
    icon: 'lucide:database',
    color: '#8b5cf6',
    description: '管理物料、产品、供应商和客户主数据',
    quickMenus: [
      { id: 'mdm-products', title: '产品管理', path: '/mdm/products', icon: 'lucide:box', moduleCode: 'MDM', level: 3 },
      { id: 'mdm-vendors', title: '供应商', path: '/mdm/vendors', icon: 'lucide:truck', moduleCode: 'MDM', level: 3 },
      { id: 'mdm-customers', title: '客户', path: '/mdm/customers', icon: 'lucide:user-check', moduleCode: 'MDM', level: 3 },
    ],
    stats: [
      { label: '产品数量', value: '5,678', trend: 'up', trendValue: '+23' },
      { label: '供应商', value: '234', trend: 'up', trendValue: '+8' },
    ],
  },
  {
    code: 'ORG',
    name: 'ORG (企业组织)',
    icon: 'lucide:building-2',
    color: '#06b6d4',
    description: '组织架构、公司代码、工厂定义',
    quickMenus: [
      { id: 'org-company', title: '公司代码', path: '/org/company', icon: 'lucide:building', moduleCode: 'ORG', level: 3 },
      { id: 'org-plant', title: '工厂定义', path: '/org/plant', icon: 'lucide:factory', moduleCode: 'ORG', level: 3 },
    ],
    stats: [
      { label: '公司数量', value: '12', trend: 'up', trendValue: '+1' },
      { label: '工厂数量', value: '45', trend: 'up', trendValue: '+3' },
    ],
  },
  {
    code: 'FI',
    name: 'FI (财务管理)',
    icon: 'lucide:wallet',
    color: '#10b981',
    description: '总账、应付应收、成本控制',
    quickMenus: [
      { id: 'fi-vouchers', title: '凭证处理', path: '/fi/vouchers', icon: 'lucide:file-text', moduleCode: 'FI', level: 3 },
      { id: 'fi-ap', title: '应付账款', path: '/fi/ap', icon: 'lucide:arrow-down-circle', moduleCode: 'FI', level: 3 },
      { id: 'fi-ar', title: '应收账款', path: '/fi/ar', icon: 'lucide:arrow-up-circle', moduleCode: 'FI', level: 3 },
    ],
    stats: [
      { label: '本月凭证', value: '892', trend: 'up', trendValue: '+15%' },
      { label: '待审核', value: '23', trend: 'down', trendValue: '-5' },
    ],
  },
  {
    code: 'SCM',
    name: 'SCM (供应链)',
    icon: 'lucide:truck',
    color: '#f59e0b',
    description: '库存、需求计划、运输管理',
    quickMenus: [
      { id: 'scm-inventory', title: '库存概览', path: '/scm/inventory', icon: 'lucide:package-search', moduleCode: 'SCM', level: 3 },
      { id: 'scm-movements', title: '货物移动', path: '/scm/movements', icon: 'lucide:move', moduleCode: 'SCM', level: 3 },
    ],
    stats: [
      { label: '库存总值', value: '¥2.3M', trend: 'up', trendValue: '+8%' },
      { label: '待入库', value: '156', trend: 'up', trendValue: '+12' },
    ],
  },
  {
    code: 'MFG',
    name: 'MFG (生产制造)',
    icon: 'lucide:factory',
    color: '#ef4444',
    description: '生产计划、车间执行、质量管理',
    quickMenus: [
      { id: 'mfg-orders', title: '生产订单', path: '/mfg/orders', icon: 'lucide:clipboard-list', moduleCode: 'MFG', level: 3 },
    ],
    stats: [
      { label: '进行中订单', value: '45', trend: 'up', trendValue: '+3' },
      { label: '产能利用率', value: '87%', trend: 'up', trendValue: '+2%' },
    ],
  },
  {
    code: 'SD',
    name: 'SD (销售分销)',
    icon: 'lucide:shopping-cart',
    color: '#ec4899',
    description: '销售订单、价格管理、销售分析',
    quickMenus: [
      { id: 'sd-orders', title: '销售订单', path: '/sd/orders', icon: 'lucide:file-plus', moduleCode: 'SD', level: 3 },
    ],
    stats: [
      { label: '本月订单', value: '234', trend: 'up', trendValue: '+18%' },
      { label: '销售额', value: '¥1.8M', trend: 'up', trendValue: '+25%' },
    ],
  },
  {
    code: 'PM',
    name: 'PM (项目管理)',
    icon: 'lucide:folder-kanban',
    color: '#14b8a6',
    description: '项目组���、项目执行、合同管理',
    quickMenus: [
      { id: 'pm-investment', title: '投资概览', path: '/pm/investment', icon: 'lucide:trending-up', moduleCode: 'PM', level: 3 },
      { id: 'pm-progress', title: '进度跟踪', path: '/pm/progress', icon: 'lucide:activity', moduleCode: 'PM', level: 3 },
    ],
    stats: [
      { label: '进行中项目', value: '28', trend: 'up', trendValue: '+4' },
      { label: '总投资额', value: '¥5.2M', trend: 'up', trendValue: '+12%' },
    ],
  },
  {
    code: 'RD',
    name: 'RD (研发管理)',
    icon: 'lucide:flask',
    color: '#a855f7',
    description: '产品生命周期、变更管理、研发项目',
    quickMenus: [
      { id: 'rd-ecr', title: '变更管理', path: '/rd/ecr', icon: 'lucide:git-pull-request', moduleCode: 'RD', level: 3 },
    ],
    stats: [
      { label: '进行中变更', value: '15', trend: 'up', trendValue: '+3' },
      { label: '研发项目', value: '8', trend: 'up', trendValue: '+1' },
    ],
  },
  {
    code: 'AM',
    name: 'AM (资产管理)',
    icon: 'lucide:hard-drive',
    color: '#6366f1',
    description: '资产台账、维护管理、设备健康',
    quickMenus: [
      { id: 'am-history', title: '资产全生命周期', path: '/am/history', icon: 'lucide:history', moduleCode: 'AM', level: 3 },
      { id: 'am-pm', title: '预防性维护', path: '/am/pm', icon: 'lucide:shield-check', moduleCode: 'AM', level: 3 },
    ],
    stats: [
      { label: '资产总数', value: '1,567', trend: 'up', trendValue: '+23' },
      { label: '维护计划', value: '89', trend: 'up', trendValue: '+5' },
    ],
  },
  {
    code: 'CS',
    name: 'CS (客户服务)',
    icon: 'lucide:headphones',
    color: '#f97316',
    description: '服务支持、现场服务、渠道集成',
    quickMenus: [
      { id: 'cs-field', title: '现场服务', path: '/cs/field', icon: 'lucide:map-pin', moduleCode: 'CS', level: 3 },
    ],
    stats: [
      { label: '服务工单', value: '156', trend: 'up', trendValue: '+12' },
      { label: '客户满意度', value: '95%', trend: 'up', trendValue: '+2%' },
    ],
  },
  {
    code: 'SYS',
    name: 'SYS (系统管理)',
    icon: 'lucide:settings',
    color: '#64748b',
    description: '系统配置、参数设置、通知中心',
    quickMenus: [
      { id: 'sys-params', title: '全局参数', path: '/sys/params', icon: 'lucide:settings-2', moduleCode: 'SYS', level: 3 },
      { id: 'sys-notification', title: '通知中心配置', path: '/sys/notification', icon: 'lucide:bell', moduleCode: 'SYS', level: 3 },
    ],
    stats: [
      { label: '系统健康', value: '99.9%', trend: 'up', trendValue: '' },
      { label: '在线用户', value: '156', trend: 'up', trendValue: '+12' },
    ],
  },
];

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  return useResponseSuccess(WORKSPACE_MODULES);
});
