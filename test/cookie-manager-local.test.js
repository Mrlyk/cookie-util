import cookieManagerLocal from '../src/index.js'

// eslint-disable
describe('cookie-manager-local 基础功能测试', () => {
  cookieManagerLocal.init({
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
    expect(cookieManagerLocal.set('cookie1', 'test1')).toBeUndefined()
  })
  test('获取 cookies', () => {
    expect(cookieManagerLocal.get('cookie1')).toBe('test1')
  })
  test('删除 cookies', () => {
    cookieManagerLocal.remove('cookie1')
    expect(cookieManagerLocal.get('cookie1')).toBeUndefined()
  })
  test('清除 cookies', () => {
    cookieManagerLocal.set('cookie1', 'test1')
    cookieManagerLocal.set('cookie2', 'test2')
    cookieManagerLocal.clean()
    expect(cookieManagerLocal.get('cookie1')).toBeUndefined()
    expect(cookieManagerLocal.get('cookie2')).toBeUndefined()
  })
})
