import { setStrictModel } from './strict-model'
import dispatchActions from './dispatch-actions'

/**
 * @param { object } cookieSchema 定义本项目使用的所有 cookie 属性
 * @param { object } strictModel 开启严格模式：不使用本工具的情况下无法设置 cookie
 */
class CookieUtil {
  static init (cookieSchema, options = {}) {
    if (!window.navigator.cookieEnabled) {
      throw new Error('cookie-util: 浏览器未启用 cookie')
    }
    if (Object.prototype.toString.call(cookieSchema) !== '[object Object]' ||
        Object.prototype.toString.call(options) !== '[object Object]'
    ) {
      throw new Error('cookie-util: 请传入正确的参数类型')
    }
    CookieUtil.cookieSchema = cookieSchema
    CookieUtil.resolveOptions(options)
    CookieUtil.strictModel && setStrictModel()
  }

  static resolveOptions ({ strictModel = false }) {
    CookieUtil.strictModel = strictModel
  }

  static hasCookieSchema () {
    if (!CookieUtil.cookieSchema) {
      throw new Error('cookie-util: 未初始化 cookie-util')
    }
    return true
  }

  static set () {
    return dispatchActions('set', ...arguments)
  }

  static get (key) {
    return dispatchActions('get', ...arguments)
  }

  static remove (key) {
    return dispatchActions('remove', ...arguments)
  }

  static clean () {
    return dispatchActions('clean', ...arguments)
  }
}

export default CookieUtil
