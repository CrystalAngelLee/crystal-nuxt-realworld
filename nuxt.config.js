module.exports = {
  router: {
    linkActiveClass: 'active',
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
              },
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
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/')
              },
              {
                path: '/editor',
                name: 'create',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/editor/:slug',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/')
              }
            ]
          }
        ]
      )
    }
  },
  // 注册插件
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
  server: {
    port: 3306, // default: 3000
    host: '0.0.0.0',
  }
}
