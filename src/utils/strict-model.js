import CookieUtil from './cookie-util'

/**
 * 设置严格模式，劫持 cookie 的 set 属性
 */
const COOKIE_DESC = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
 Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie')

function setStrictModel () {
  if (!COOKIE_DESC) {
    return console.warn('cookie-util: 严格模式启用失败')
  }
  const allowableCookieArray = getAllowableCookie()
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    enumerable: COOKIE_DESC.enumerable,
    set: (cookie) => {
      const cookieName = cookie.substring(0, cookie.indexOf('=')).trim()
      if (!allowableCookieArray.includes(cookieName)) {
        console.warn('cookie-util: cookie-util 启用严格模式，禁止设置未初始化的 cookie')
        // eslint-disable-next-line
        return false
      }
      COOKIE_DESC.set.call(document, cookie)
    },
    get: () => {
      return COOKIE_DESC.get.call(document)
    }
  })
}

function getAllowableCookie () {
  const initCookieArray = []
  // 白名单，后续可增加用户自配置
  const whiteList = ['$root-domain&']
  CookieUtil.hasCookieSchema() && Object.keys(CookieUtil.cookieSchema).forEach(key => {
    if (!CookieUtil.cookieSchema[key].name) return
    initCookieArray.push(CookieUtil.cookieSchema[key].name)
  })
  return [...initCookieArray, ...whiteList]
}

export { setStrictModel }
