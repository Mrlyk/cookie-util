import CookieManagerLocal from '../utils/cookie-manager-local'
import Cookies from 'js-cookie'
import get from 'lodash/get'
import merge from 'lodash/merge'
import keys from 'lodash/keys'
import { convertDomain } from '../utils/domain-utils'

/**
 * 删除单个 cookie，删除时要用原 set 时的 path 和 domain
 * @param {string} key
 */
function removeCookie (key, options) {
  CookieManagerLocal.hasCookieSchema()
  const name = get(CookieManagerLocal.cookieSchema[key], 'name')
  if (name === undefined) {
    console.error('cookie-manager-local: 未找到 cookie 配置 - ' + key)
    return
  }
  options = merge({}, CookieManagerLocal.cookieSchema[key], options)
  options.domain = convertDomain(options.domain)
  Cookies.remove(name, options)
}

/**
 * 清除所有 cookieSchema 中定义的 cookie
 */
function cleanCookie () {
  CookieManagerLocal.hasCookieSchema()
  keys(CookieManagerLocal.cookieSchema).forEach(key => {
    removeCookie(key, CookieManagerLocal.cookieSchema[key])
  })
}

export { removeCookie, cleanCookie }