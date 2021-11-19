import setCookie from '../actions/set'
import getCookie from '../actions/get'
import { removeCookie, cleanCookie } from '../actions/remove'

class CookieManagerLocal {
  constructor (cookieSchema) {
    if (!window.navigator.cookieEnabled) {
      throw new Error('cookie-manager-local: 浏览器未启用 cookie')
    }
    if (Object.prototype.toString.call(cookieSchema) !== '[object Object]') {
      throw new Error('cookie-manager-local: 请传入正确的参数类型')
    }
    CookieManagerLocal.cookieSchema = cookieSchema
  }

  static hasCookieSchema () {
    if (!CookieManagerLocal.cookieSchema) {
      throw new Error('cookie-manager-local: 未构造 cookie-manager-local 实例')
    }
    return true
  }

  static convertExpires (maxAge) {
    const expires = new Date(Date.now() + maxAge).toUTCString()
    return expires
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

export default CookieManagerLocal
