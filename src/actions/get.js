import CookieUtil from '../utils/cookie-util'
import Cookies from 'js-cookie'

/**
 * 获取 cookie
 * 目前还没有办法根据参数获取指定 domain/path 下的 cookie
 */
export default function getCookie (key) {
  CookieUtil.hasCookieSchema()
  const name = CookieUtil.cookieSchema[key]?.name
  if (name === undefined) {
    console.error('cookie-util: 未找到 cookie 配置 - ' + key)
    return
  }
  return Cookies.get(name)
}
