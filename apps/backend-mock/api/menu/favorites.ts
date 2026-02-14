import { eventHandler } from 'h3';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 模拟用户收藏数据
const USER_FAVORITES: Record<string, any[]> = {
  vben: [
    { id: 'iam-users', title: '用户管理', path: '/iam/users', icon: 'lucide:user', moduleCode: 'IAM', level: 3 },
    { id: 'mdm-products', title: '产品管理', path: '/mdm/products', icon: 'lucide:box', moduleCode: 'MDM', level: 3 },
    { id: 'fi-vouchers', title: '凭证处理', path: '/fi/vouchers', icon: 'lucide:file-text', moduleCode: 'FI', level: 3 },
    { id: 'scm-inventory', title: '库存概览', path: '/scm/inventory', icon: 'lucide:package-search', moduleCode: 'SCM', level: 3 },
  ],
};

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const favorites = USER_FAVORITES[userinfo.username] || [];
  return useResponseSuccess(favorites);
});
