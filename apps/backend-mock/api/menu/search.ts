import { eventHandler, getQuery } from 'h3';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 扁平化菜单列表
const MENU_LIST = [
  { id: 'iam-users', title: '用户管理', path: '/iam/users', icon: 'lucide:user', moduleCode: 'IAM', breadcrumb: ['IAM', '身份管理', '用户管理'] },
  { id: 'iam-groups', title: '用户组', path: '/iam/groups', icon: 'lucide:users-round', moduleCode: 'IAM', breadcrumb: ['IAM', '身份管理', '用户组'] },
  { id: 'iam-rbac', title: '角色权限', path: '/iam/rbac', icon: 'lucide:shield', moduleCode: 'IAM', breadcrumb: ['IAM', '访问控制', '角色权限'] },
  { id: 'iam-policy', title: '策略管理', path: '/iam/policy', icon: 'lucide:file-lock', moduleCode: 'IAM', breadcrumb: ['IAM', '访问控制', '策略管理'] },
  { id: 'iam-tenants', title: '租户列表', path: '/iam/tenants', icon: 'lucide:building-2', moduleCode: 'IAM', breadcrumb: ['IAM', '租户管理', '租户列���'] },
  { id: 'mdm-products', title: '产品管理', path: '/mdm/products', icon: 'lucide:box', moduleCode: 'MDM', breadcrumb: ['MDM', '物料主数据', '产品管理'] },
  { id: 'mdm-vendors', title: '供应商', path: '/mdm/vendors', icon: 'lucide:truck', moduleCode: 'MDM', breadcrumb: ['MDM', '业务伙伴', '供应商'] },
  { id: 'mdm-customers', title: '客户', path: '/mdm/customers', icon: 'lucide:user-check', moduleCode: 'MDM', breadcrumb: ['MDM', '业务伙伴', '客户'] },
  { id: 'fi-vouchers', title: '凭证处理', path: '/fi/vouchers', icon: 'lucide:file-text', moduleCode: 'FI', breadcrumb: ['FI', '总账', '凭证处理'] },
  { id: 'fi-coa', title: '会计科目表', path: '/fi/coa', icon: 'lucide:list', moduleCode: 'FI', breadcrumb: ['FI', '总账', '会计科目表'] },
  { id: 'fi-ap', title: '应付账款', path: '/fi/ap', icon: 'lucide:arrow-down-circle', moduleCode: 'FI', breadcrumb: ['FI', '应付应收', '应付账款'] },
  { id: 'fi-ar', title: '应收账款', path: '/fi/ar', icon: 'lucide:arrow-up-circle', moduleCode: 'FI', breadcrumb: ['FI', '应付应收', '应收账款'] },
  { id: 'scm-inventory', title: '库存概览', path: '/scm/inventory', icon: 'lucide:package-search', moduleCode: 'SCM', breadcrumb: ['SCM', '库存管理', '库存概览'] },
  { id: 'scm-movements', title: '货物移动', path: '/scm/movements', icon: 'lucide:move', moduleCode: 'SCM', breadcrumb: ['SCM', '库存管理', '货物移动'] },
  { id: 'mfg-orders', title: '生产订单', path: '/mfg/orders', icon: 'lucide:clipboard-list', moduleCode: 'MFG', breadcrumb: ['MFG', '生产计划', '生产订单'] },
  { id: 'sd-orders', title: '销售订单', path: '/sd/orders', icon: 'lucide:file-plus', moduleCode: 'SD', breadcrumb: ['SD', '销售处理', '销售订单'] },
  { id: 'org-company', title: '公司代码', path: '/org/company', icon: 'lucide:building', moduleCode: 'ORG', breadcrumb: ['ORG', '组织架构', '公司代码'] },
  { id: 'org-plant', title: '工厂定义', path: '/org/plant', icon: 'lucide:factory', moduleCode: 'ORG', breadcrumb: ['ORG', '组织架构', '工厂定义'] },
  { id: 'pm-investment', title: '投资概览', path: '/pm/investment', icon: 'lucide:trending-up', moduleCode: 'PM', breadcrumb: ['PM', '项目组合', '投资概览'] },
  { id: 'pm-progress', title: '进度跟踪', path: '/pm/progress', icon: 'lucide:activity', moduleCode: 'PM', breadcrumb: ['PM', '项目执行', '进度跟踪'] },
  { id: 'rd-ecr', title: '变更管理', path: '/rd/ecr', icon: 'lucide:git-pull-request', moduleCode: 'RD', breadcrumb: ['RD', '产品生命周期', '变更管理'] },
  { id: 'am-history', title: '资产全生命周期', path: '/am/history', icon: 'lucide:history', moduleCode: 'AM', breadcrumb: ['AM', '资产台账', '资产全生命周期'] },
  { id: 'am-pm', title: '预防性维护', path: '/am/pm', icon: 'lucide:shield-check', moduleCode: 'AM', breadcrumb: ['AM', '维护管理', '预防性维护'] },
  { id: 'cs-field', title: '现场服务', path: '/cs/field', icon: 'lucide:map-pin', moduleCode: 'CS', breadcrumb: ['CS', '服务支持', '现场服务'] },
  { id: 'sys-params', title: '全局参数', path: '/sys/params', icon: 'lucide:settings-2', moduleCode: 'SYS', breadcrumb: ['SYS', '核心设置', '全局参数'] },
  { id: 'sys-notification', title: '通知中心配置', path: '/sys/notification', icon: 'lucide:bell', moduleCode: 'SYS', breadcrumb: ['SYS', '核心设置', '通知中心配置'] },
];

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const query = getQuery(event);
  const keyword = (query.keyword as string || '').toLowerCase();

  if (!keyword) {
    return useResponseSuccess([]);
  }

  // 搜索匹配
  const results = MENU_LIST.filter((menu) => {
    return (
      menu.title.toLowerCase().includes(keyword) ||
      menu.moduleCode.toLowerCase().includes(keyword) ||
      menu.breadcrumb.some((crumb) => crumb.toLowerCase().includes(keyword))
    );
  });

  return useResponseSuccess(results);
});
