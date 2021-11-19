import Cookies from 'js-cookie'

function convertDomain (domain) {
  if (getHostName() === 'localhost' || isIp(domain)) {
    return getHostName()
  }
  switch (domain) {
    case 'root':
      return '.' + getRootDomain()
    case 'sub':
      return '.' + getHostName()
    case 'current':
      return getHostName()
    default:
      return typeof domain === 'string' ? domain : ''
  }
}

/**
 * 获取根域名，根据是否可以设置 cookie 来查找根域名（二级域名）
 * @return {string}
 */
function getRootDomain () {
  let rootDomain = ''
  const domainList = document.domain.split('.')
  const expiredTime = new Date(0)
  const tempKey = '$root-domain'
  const urlItems = []
  urlItems.unshift(domainList.pop())
  while (domainList.length) {
    urlItems.unshift(domainList.pop())
    rootDomain = urlItems.join('.')
    Cookies.set(tempKey, 'root-domain')
    if (Cookies.get('$root-domain')) {
      Cookies.set(tempKey, 'root-domain', { expires: expiredTime })
      break
    }
  }
  return rootDomain || document.domain
}

function getHostName () {
  return location.hostname
}

/**
 * 判断是否ip
 * @return {Boolean}
 */
function isIp (hostname) {
  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return ipReg.test(hostname)
}

export { convertDomain, getHostName, getRootDomain, isIp }
