---
title: Parcel
icon: categoryselected
order: 7
category:
  - 前端
tag:
  - 模块化
  - Parcel
---

## 基本介绍

* Parcel 是在 2017 年出现的
* 当时的 webpack 使用上过于繁琐
* 完全零配置，不侵入开发代码
* 开发时直接使用依赖，自动安装
* 构建速度更快，多进程打包

## 使用

无需任何配置，指定打包入口即可

```json
 "scripts": {
    "dev": "parcel src/*.html",
    "build": "parcel build src/*.html"
  },
```

## vs. webpack

* webpack 有更好的生态
* webpack 越来越好用

