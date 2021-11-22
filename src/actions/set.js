import CookieManagerLocal from '@/utils/cookie-manager-local'
import Cookies from 'js-cookie'
import { convertDomain } from '@/utils/domain-utils'

export default function setCookie (key, value, options = {}) {
  CookieManagerLocal.hasCookieSchema()
  const name = CookieManagerLocal.cookieSchema[key]?.name
  if (name === undefined) {
    throw new Error('cookie-manager-local: 未找到 cookie 配置 - ' + key)
  }
  // 为了防止混乱，name 属性不允许重新定义。移除用户传过来的 name 属性
  options.name && (options = removeProperty(options, 'name'))
  options = Object.assign({}, CookieManagerLocal.cookieSchema[key], options)
  options.expires = convertExpires(options.expires)
  options.domain = convertDomain(options.domain)
  Cookies.set(name, value, options)
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
