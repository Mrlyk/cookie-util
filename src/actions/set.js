import CookieUtil from '@/utils/cookie-util'
import Cookies from 'js-cookie'
import { convertDomain } from '@/utils/domain-utils'
import { setStrictModel, reliefStrictModel } from '@/utils/strict-model'

export default function setCookie (key, value, options = {}) {
  CookieUtil.hasCookieSchema()
  CookieUtil.strictModel && reliefStrictModel()
  const name = CookieUtil.cookieSchema[key]?.name
  if (name === undefined) {
    throw new Error('cookie-util: 未找到 cookie 配置 - ' + key)
  }
  // 为了防止混乱，name 属性不允许重新定义。移除用户传过来的 name 属性
  options.name && (options = removeProperty(options, 'name'))
  options = Object.assign({}, CookieUtil.cookieSchema[key], options)
  options.expires = convertExpires(options.expires)
  options.domain = convertDomain(options.domain)
  Cookies.set(name, value, options)
  CookieUtil.strictModel && setStrictModel()
}

function removeProperty (target, key) {
  // eslint-disable-next-line
  const { [key]: _, ...newTarget } = target
  return newTarget
}

function convertExpires (expires) {
  if (expires === undefined) return ''
  return new Date(Date.now() + expires)
}
