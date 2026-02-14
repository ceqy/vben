import { eventHandler, getQuery } from 'h3';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 模拟最近访问数据
const RECENT_MENUS: Record<string, any[]> = {
  vben: [
    { id: 'sd-orders', title: '销售订单', path: '/sd/orders', icon: 'lucide:file-plus', moduleCode: 'SD', level: 3 },
    { id: 'scm-inventory', title: '库存概览', path: '/scm/inventory', icon: 'lucide:package-search', moduleCode: 'SCM', level: 3 },
    { id: 'iam-users', title: '用户管理', path: '/iam/users', icon: 'lucide:user', moduleCode: 'IAM', level: 3 },
    { id: 'mdm-products', title: '产品管理', path: '/mdm/products', icon: 'lucide:box', moduleCode: 'MDM', level: 3 },
    { id: 'fi-vouchers', title: '凭证处理', path: '/fi/vouchers', icon: 'lucide:file-text', moduleCode: 'FI', level: 3 },
    { id: 'mfg-orders', title: '生产订单', path: '/mfg/orders', icon: 'lucide:clipboard-list', moduleCode: 'MFG', level: 3 },
  ],
};

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const query = getQuery(event);
  const limit = Number.parseInt(query.limit as string) || 10;

  const recentMenus = (RECENT_MENUS[userinfo.username] || []).slice(0, limit);
  return useResponseSuccess(recentMenus);
});
