import CookieManagerLocal from '@/utils/cookie-manager-local'
import get from 'lodash/get'
import merge from 'lodash/merge'
import Cookies from 'js-cookie'
import { convertDomain } from '@/utils/domain-utils'

export default function setCookie (key, value, options) {
  CookieManagerLocal.hasCookieSchema()
  const name = get(CookieManagerLocal.cookieSchema[key], 'name')
  if (name === undefined) {
    throw new Error('cookie-manager-local: 未找到 cookie 配置 - ' + key)
  }
  if (options) {
  // 为了防止混乱，name 属性不允许重新定义。移除用户传过来的 name 属性
    options = removeProperty(options, 'name')
    options = merge({}, CookieManagerLocal.cookieSchema[key], options)
    options.expires = convertExpires(options.maxAge)
    options.domain = convertDomain(options.domain)
  }
  Cookies.set(name, value, options)
}

function removeProperty (target = {}, key) {
  const { [key]: _, ...newTarget } = target
  return newTarget
}

function convertExpires (maxAge) {
  const expires = new Date(Date.now() + maxAge)
  return expires
}