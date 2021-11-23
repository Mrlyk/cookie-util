import setCookie from '../actions/set'
import getCookie from '../actions/get'
import { removeCookie, cleanCookie } from '../actions/remove'

class CookieUtil {
  static init (cookieSchema) {
    if (!window.navigator.cookieEnabled) {
      throw new Error('cookie-util: 浏览器未启用 cookie')
    }
    if (Object.prototype.toString.call(cookieSchema) !== '[object Object]') {
      throw new Error('cookie-util: 请传入正确的参数类型')
    }
    CookieUtil.cookieSchema = cookieSchema
  }

  static hasCookieSchema () {
    if (!CookieUtil.cookieSchema) {
      throw new Error('cookie-util: 未初始化 cookie-util')
    }
    return true
  }

  static set (key, value, options) {
    return setCookie(key, value, options)
  }

  static get (key) {
    return getCookie(key)
  }

  static remove (key) {
    return removeCookie(key)
  }

  static clean () {
    return cleanCookie()
  }
}

export default CookieUtil
