import CookieUtil from '../src/index.js'

// eslint-disable
describe('cookie-util 基础功能测试', () => {
  CookieUtil.init({
    cookie1: {
      name: 'cookie1',
      domain: 'root',
      path: '/',
      expires: 30 * 24 * 3600 * 1000, // 30d
      httpOnly: false,
      secure: false
    },
    cookie2: {
      name: 'cookie2',
      domain: 'sub',
      expires: 30 * 24 * 3600 * 1000, // 30d
      path: '/cookie-test',
      httpOnly: false,
      secure: false
    }
  })
  test('设置 cookie', () => {
    expect(CookieUtil.set('cookie1', 'test1')).toBeUndefined()
  })
  test('获取 cookies', () => {
    CookieUtil.set('cookie1', 'test1')
    expect(CookieUtil.get('cookie1')).toBe('test1')
  })
  test('删除 cookies', () => {
    CookieUtil.remove('cookie1')
    expect(CookieUtil.get('cookie1')).toBeUndefined()
  })
  test('清除 cookies', () => {
    CookieUtil.set('cookie1', 'test1')
    CookieUtil.set('cookie2', 'test2')
    CookieUtil.clean()
    expect(CookieUtil.get('cookie1')).toBeUndefined()
    expect(CookieUtil.get('cookie2')).toBeUndefined()
  })
})
