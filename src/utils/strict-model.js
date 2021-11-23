const document = window.document
const setter = document.__lookupSetter__('cookie')
const getter = document.__lookupGetter__('cookie')
/**
 * 设置严格模式，劫持 cookie 的 set 属性
 */
function setStrictModel () {
  if (!document) { console.warn('cookie-util: 严格模式启用失败') }
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    set: () => {
      console.warn('cookie-util: cookie-util 启用严格模式，禁止手动设置 cookie')
    },
    get: getter
  })
}

/**
 * 解除严格模式，在使用本工具设置 cookie 时暂时解除
 */
function reliefStrictModel () {
  if (!document) { console.warn('cookie-util: 严格模式启用失败') }
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    set: setter,
    get: getter
  })
}

export { setStrictModel, reliefStrictModel }
