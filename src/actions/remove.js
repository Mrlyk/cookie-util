import CookieUtil from '../utils/cookie-util'
import Cookies from 'js-cookie'
import { convertDomain } from '../utils/domain-utils'

/**
 * 删除单个 cookie，删除时要用原 set 时的 path 和 domain
 * @param {string} key
 */
function removeCookie (key, options = {}) {
  const name = CookieUtil.cookieSchema[key]?.name
  if (name === undefined) {
    console.error('cookie-util: 未找到 cookie 配置 - ' + key)
    return
  }
  options = Object.assign({}, CookieUtil.cookieSchema[key], options)
  options.domain = convertDomain(options.domain)
  Cookies.remove(name, options)
}

/**
 * 清除所有 cookieSchema 中定义的 cookie
 */
function cleanCookie () {
  Object.keys(CookieUtil.cookieSchema).forEach((key) => {
    removeCookie(key, CookieUtil.cookieSchema[key])
  })
}

export { removeCookie, cleanCookie }
