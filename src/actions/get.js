import CookieManagerLocal from '../utils/cookie-manager-local'
import Cookies from 'js-cookie'
import get from 'lodash/get'

/**
 * 获取 cookie
 */
export default function getCookie (key) {
  CookieManagerLocal.hasCookieSchema()
  const name = get(CookieManagerLocal.cookieSchema[key], 'name')
  if (name === undefined) {
    console.error('cookie-manager-local: 未找到 cookie 配置 - ' + key)
    return
  }
  return Cookies.get(name)
}
