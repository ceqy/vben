import { eventHandler, getRouterParam } from 'h3';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const menuId = getRouterParam(event, 'id');
  console.log('Remove favorite:', menuId, 'for user:', userinfo.username);

  return useResponseSuccess({ success: true });
});
