---
title: Nuxt2
icon: define
order: 1
category:
  - 前端
tag:
  - 泛客户端开发
---

## 是什么

**Nuxt 是一款基于 Vue 集成的服务端渲染框架**

## 能做什么

**开发应用程序,主要解决了单页面应用 SEO 不友好的问题**

## 初始化项目

**使用 Nuxtjs 团队创建的脚手架工具**

```js
1. npx create-nuxt-app <项目名> 
2. vue init nuxt-community/starter-template <项目名称>
```

## 目录结构

![image-20230728085337830](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230728085337830.png)

### Static(静态资源)

- 默认情况下 Nuxt 使用 vue-loader、file-loader 以及 url-loader 这几个 Webpack 加载器来处理文件的加载和引用。对于不需要通过 Webpack 处理的静态资源文件，可以放置在 static 目录中。
- 静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。
- 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。举个例子: /static/robots.txt 映射至 /robots.txt
- 若无额外配置，该目录不能被重命名。

### Assets(需要编译的静态资源)

资源目录 assets 用于组织未编译的静态资源如 LESS、SASS 或 JavaScript。

### components

组件目录 components 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 asyncData 方法的特性。

### layouts

* 布局目录 layouts 用于组织应用的布局组件。
* 若无额外配置，该目录不能被重命名。
* 在下面的例子中， Nuxt.js 会使用 layouts/blog.vue 作为当前页面组件的布局文件。

```js
export default {
  layout: 'blog',
  // 或
  layout(context) {
    return 'blog'
  }
}
```

### Middleware

### pages

### store

### plugins

### nuxt.config.js

## 生命周期

## 路由

### 约定式

### 扩展路由

### 自定义错误路由页面

### 路由动画

### 路由守卫

### 数据交互

### 配置 Loading 组件

## Vuex 的使用

### 状态持久化

## Element-UI 的安装与使用

## 全局封装

### 方法

### 过滤器

### 指令

## meta 信息注入

## scss 的使用

## 自定义 HTML 模版（app.html）

## 资源的指向与引入

## 使用场景

## 实现原理

## 参考链接
