# Cookie-Util
> web cookie 管理工具，用于理清项目中混乱的 cookie 。

## 安装
`npm install @weiyi/cookie-util --save-dev --registry http://npm.guahao-inc.com/`

## 使用
#### 初始化
```ts

/**
 * name、domain、path 重要参数最好在初始化时声明
 * @param strictModel 开启严格模式：不使用本工具的情况下无法设置 cookie
*/
interface Cookie {
  name: string,
  domain?: string,
  expires?: number,
  path?: string,
  httpOnly?: boolean,
  secure?: boolean
}

interface CookieSchema {
  [key: string]: Cookie 
}

CookieUtil.init(CookieSchema: CookieSchema, options?: { [key: string]: any })
```
**示例**  
```js
import CookieUtil from 'cookie-util'
import CookieSchema from './cookie-schema.js'

CookieUtil.init(CookieSchema)

```
```js
// cookie-schema.js
/**
 * @param { string } name cookie 名称
 * @param { string } domain cookie domain 默认为当前文档的 domain
 * @param { string } path cookie 匹配路径 默认为 /
 * @param { number } expires cookie 过期时间 默认为 session
 * @param { boolean } secure 是否仅允许 https 访问 默认为 false
*/
export default {
  cookie1: {
    name: 'cookie1', // cookie 名称
    domain: 'root', // root-根域名 sub-当前域名及子域名 current-当前域名（默认值）
    path: '/', // 匹配路径
    expires: 30 * 24 * 3600 * 1000, // 过期时间 30d
    secure: false // https 传输
  },
  cookie2: {
    name: 'cookie2',
    domain: 'sub',
    expires: 30 * 24 * 3600 * 1000, // 30d
    path: '/cookie-test',
    secure: false
  }
}
```

**重点属性说明**  

**domain 属性** 
domain 有三种可选值，以 test.example.com 举例   
- root 当前域名的二级域名 .example.com
- sub 当前域名及子域名 .test.example.com
- current 当前域名 test.example.com

**严格模式 strictModel**  
开启严格模式后，工具将禁止通过非本工具的方法设置 cookie。
使用如下方法设置 cookie 将给出警告。
```js
document.cookie='test=1' // 警告：cookie-util.js: cookie-util: cookie-util 启用严格模式，禁止手动设置 cookie
```
#### 获取 cookie
```js
CookieUtil.get(key: string)

CookieUtil.get('cookie1') // 返回 cookieSchema 对象中 cookie1 的 name 对应的 value 
```

#### 设置 cookie
```js
CookieUtil.set(key: string, value: string)

CookieUtil.set('cookie1', 'test1') // 设置 cookieSchema 对象中 cookie1 的 name
```
*ps: 支持传入参数*
#### 删除 cookie
- 单独删除
`CookieUtil.remove(key: string)`

- 清除所有 CookieSchema 中定义的 cookie
`CookieUtil.clean()`

## 注意点
- 本工具时为了能清晰的管理项目中所有的 cookie，防止在退出登录或多点登录时 cookie 造成的混乱问题，建议维护单独的 cookie-schema 文件来管理项目中用到的所有 cookie
- 未初始化的 cookie 无法设置或获取
- cookie 初始化的 name 后续无法更改
- 启用严格模式要注意第三包设置 cookie 会被组织，可能导致意外的问题
- <font color="red">强烈不建议在设置 cookie 时传入自定参数，可能会导致 clean 方法无法清除所有定义的 cookie，且违背工具初衷</font>
- <font color="red">强烈建议在初始化时定义好所有要处理的 cookie，便于后续处理</font>