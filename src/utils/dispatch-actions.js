import setCookie from '../actions/set'
import getCookie from '../actions/get'
import { setStrictModel, reliefStrictModel } from './strict-model'
import { removeCookie, cleanCookie } from '../actions/remove'
import CookieUtil from '@/utils/cookie-util'

/**
 * 分发 cookie 设置动作，统一处理所有前置和后置逻辑
 * @param { object } dispatchStrategies 分发策略对象
 */
export default function dispatchActions (action, ...args) {
  const dispatchStrategies = {
    set: (args) => {
      return setCookie(...args)
    },
    get: (args) => {
      return getCookie(...args)
    },
    remove: (args) => {
      return removeCookie(...args)
    },
    clean: () => {
      return cleanCookie()
    }
  }
  if (!dispatchStrategies[action]) {
    throw new Error('cookie-util: ' + action + '动作未定义')
  }
  beforeDispatch(action)
  const result = dispatchStrategies[action](args)
  afterDispatch()
  return result
}
/**
 * 处理动作开始前的事件，目前只支持同步动作
 */
function beforeDispatch (action) {
  // 是否初始化 schema
  CookieUtil.hasCookieSchema()
  CookieUtil.strictModel && reliefStrictModel()
}

/**
 * 处理设置动作后的逻辑
 */
function afterDispatch () {
  CookieUtil.strictModel && setStrictModel()
}
