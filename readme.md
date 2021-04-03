> 网站地址【部署成功的服务器地址】：http://113.31.104.73:3306/

# 前言

我们要实现的 Demo[小伙伴可以自行点进去看看哈~]
`https://demo.realworld.io/#/`

以下是当前 Demo 的相关资源列举

- GitHub 仓库 `https://github.com/gothinkster/realworld`
- 接口文档 `https://github.com/gothinkster/realworld/tree/master/api`
- 页面模板 `https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md`

# 准备工作

### 项目初始化

```txt
mkdir [projectname]
cd [projectname]
yarn init -y
yarn add nuxt
---
vi package.json
insert content
"scripts": {
    "dev": "nuxt"
},
esc  :wq
---
mkdir pages
touch index.vue
```

index.vue

```vue
<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped></style>
```

`yarn dev`

打开响应端口页面，看到页面展示内容就说明我们的项目初始化完成啦~

## 导入页面模板

### 导入样式资源

`touch app.html`

1. 将[App.html 默认模板](https://zh.nuxtjs.org/docs/2.x/concepts/views/#document-apphtml) copy 到 app.html 中
2. 将[realworld 资源](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md) 资源部分导入到文件中
3. 重启服务，F12 验证资源加载

资源本土化方法

```txt
open https://www.jsdelivr.com/
search ionicons
找到对应的版本[2.0.1]下的css/ionicons.min.css
copy [链接](https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css)
将href替换成我们新的资源地址
open //demo.productionready.io/main.css
copy 内容
新建 static/main.css
将内容粘贴进去
替换资源引入'/main.css'
```

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link
      href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
      rel="stylesheet"
      type="text/css"
    />
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <!-- <link rel="stylesheet" href="//demo.productionready.io/main.css" /> -->
    <link rel="stylesheet" href="/main.css" />
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

### 配置布局组件

1. 创建文件

   ```txt
   mkdir pages/layouttouch
   pages/layout/index.vue
   ```

2. 将[realworld 资源](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md) 中 Header/Footer 部分 copy 到文件中

3. [配置自定义路由规则](https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-router/#extendroutes)

   `touch nuxt.config.js`

   ```js
   module.exports = {
     router: {
       // 自定义路由规则
       extendRoutes(routes, resolve) {
         // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
         routes.splice(0)

         routes.push(
           ...[
             {
               name: 'layout',
               path: '/',
               component: resolve(__dirname, 'pages/layout/')
             }
           ]
         )
       }
     }
   }
   ```

4. 创建主页面相关

   ```txt
   mkdir pages/home
   touch pages/home/index.vue
   ```

   将[realworld 资源](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md) 中 Home 部分 copy 到文件中

   配置路由

   ```js
   module.exports = {
     router: {
       // 自定义路由规则
       extendRoutes(routes, resolve) {
         // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
         routes.splice(0)

         routes.push(
           ...[
             {
               name: 'layout',
               path: '/',
               component: resolve(__dirname, 'pages/layout/'),
               children: [
                 {
                   path: '', // 默认子路由
                   name: 'home',
                   component: resolve(__dirname, 'pages/home/')
                 }
               ]
             }
           ]
         )
       }
     }
   }
   ```

### 配置页面组件

**导入登录注册页面**

1. 创建 pages/login/index.vue

2. 从资源 [Login/Register](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#loginregister) 中将内容拷贝到文件中

3. 相关路由配置

   ```js
   children: [
     {
       path: '/login',
       name: 'login',
       component: resolve(__dirname, 'pages/login/')
     },
     {
       path: '/register',
       name: 'register',
       component: resolve(__dirname, 'pages/login/')
     },
   ],
   ```

4. 处理页面 pages/login/index.vue

   ```vue
   <template>
     <div class="auth-page">
       <div class="container page">
         <div class="row">
           <div class="col-md-6 offset-md-3 col-xs-12">
             <h1 class="text-xs-center">
               {{ isLogin ? 'Sign in' : 'Sign up' }}
             </h1>
             <p class="text-xs-center">
               <nuxt-link v-if="isLogin" to="/register"
                 >Need an account?</nuxt-link
               >
               <nuxt-link v-else to="/login">Have an account?</nuxt-link>
             </p>

             <ul class="error-messages">
               <li>That email is already taken</li>
             </ul>

             <form>
               <fieldset v-if="!isLogin" class="form-group">
                 <input
                   class="form-control form-control-lg"
                   type="text"
                   placeholder="Your Name"
                 />
               </fieldset>
               <fieldset class="form-group">
                 <input
                   class="form-control form-control-lg"
                   type="text"
                   placeholder="Email"
                 />
               </fieldset>
               <fieldset class="form-group">
                 <input
                   class="form-control form-control-lg"
                   type="password"
                   placeholder="Password"
                 />
               </fieldset>
               <button class="btn btn-lg btn-primary pull-xs-right">
                 {{ isLogin ? 'Sign in' : 'Sign up' }}
               </button>
             </form>
           </div>
         </div>
       </div>
     </div>
   </template>

   <script>
   export default {
     name: 'Login',
     computed: {
       isLogin() {
         return this.$route.name === 'login'
       }
     }
   }
   </script>

   <style lang="scss" scoped></style>
   ```
