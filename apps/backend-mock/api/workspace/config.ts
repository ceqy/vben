import { eventHandler } from 'h3';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 用户工作台配置
const USER_WORKSPACE_CONFIG: Record<string, any> = {
  vben: {
    userId: 'vben',
    layout: {
      modules: ['IAM', 'MDM', 'FI', 'SCM', 'MFG', 'SD', 'SYS'],
      columns: 3,
    },
    customization: {},
  },
};

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const config = USER_WORKSPACE_CONFIG[userinfo.username] || {
    userId: userinfo.username,
    layout: {
      modules: ['IAM', 'MDM', 'FI', 'SCM', 'MFG', 'SD', 'SYS'],
      columns: 3,
    },
  };

  return useResponseSuccess(config);
});
