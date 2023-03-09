---
title: Rollup
icon: categoryselected
order: 6
category:
  - 前端
tag:
  - 模块化
  - rollup
---

## 基本介绍

* Rollup 更加小巧
* 仅仅是一款 ESM 打包器
* Rollup 中并不支持类似 HMR 这种高级特性
* 诞生的目的：
  * 并不是要与 webpack 全面竞争
  * 提供一个充分利用 ESM 各项特性的高效打包器

:::info

rollup.js 的开发本意，是打造一款简单易用的 ES 模块打包工具，不必配置，直接使用。这一点，它确实做到了。

后来经过不断发展，它也可以打包 CommonJS 模块。但是，这时需要经过复杂配置，实际上并没有比 Webpack 简单多少。

因此建议，**只把 rollup.js 用于打包 ES 模块**，这样才能充分发挥它的优势。下面你会看到，那是多么简单的一件事。

如果你的项目使用 CommonJS 模块，不推荐使用 rollup.js，优势不大。

:::

## 快速上手

**安装**

* 全局安装
  ```bash
  npm i rollup -g
  ```

* 项目内部安装
  ```bash
  yarn add rollup -D
  ```

**使用**

```js
rollup src/main.js --file dist/bundle.js --format iife
```

:::info

* –file：指定文件的输出的目录
* –format：将文件打包成指定的格式

:::

## 配置文件

**rollup.config.js**

```js
export default {
  input: 'src/index.js', // 入口文件
  output: {
    file: 'dist/bundle.js', // 输出目录
    format: 'iife' // 打包格式
  }
}
```

:::info

配置文件运行在 node 环境当中，不过 rollup 会额外处理这个文件，所以我们可以使用 ES Modules 的方式去编写

:::

**使用配置文件**

```bash
rollup --config rollup.config.js
```

## 使用插件

**使用场景**

* rollup 自身的功能就只是 ES Modules 模块的合并打包
* 如果有其他的需求就需要使用插件去完成。例如：加载其他类型的资源文件、导入 commonjs 模块、编译 ES6 新特性等等
* 插件是 rollup 唯一的扩展途径，不像 webpack 扩展了 loader 、plugins 和 minizier

**案例**

我们将使用 [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json), 其允许 Rollup 从一个 JSON 文件中导入数据。

```bash
# 安装插件
yarn add @rollup/plugin-json -D
```

修改配置文件

```js
// rollup.config.js
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [ json() ]
};
```

配置 npm scripts

```json
{
  "scripts": {
    "build": "rollup --config"
  }
}
```

使用

```bsh
yarn build
```

## 加载 npm 模块

有时候，您的项目可能需要依赖于一些 NPM 包。与 webpack 和 Browserify 等其他打包器不同，Rollup 并不能“开箱即用”地处理 NPM 包的依赖关系——我们需要添加一些配置。

**安装@rollup/plugin-node-resolve插件，该插件可以让 Rollup 查找到外部模块 **

```js
npm install --save-dev @rollup/plugin-node-resolve
```

**修改配置文件**

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ resolve() ]
};
```

## 加载 Commonjs 模块

一些库暴露了可以按照原样导入的 ES 模块。但目前，大多数的 NPM 包暴露的都是 CommonJS 模块。在此更改之前，我们需要将 CommonJS 转换为 ES2015，这样 Rollup 才能处理它们。

[@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs) 可以做到这一点。

**安装**

```bash
yarn add @rollup/plugin-commonjs
```

**修改配置文件**

```js
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    commonjs()
  ]
}
```

:::warning

请注意，`@rollup/plugin-commonjs` 应该在其他插件 *之前* 使用——这是为了防止其他插件进行的更改破坏了 CommonJS 检测。

Rolluo 插件的执行顺序是从前往后的

:::

## 代码拆分（分包）

**使用**

```js
import('./logger').then(({ log }) => {
  log('code splitting~')
})
```

**修改配置文件**

```js
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'amd'
  }
}
```

:::warning

Iife 格式会将所有的模块合并到同一个函数当中，并不支持代码的分包。要想使用代码拆分，可以使用 amd 或者 cjs 等其他标准，浏览器只能使用 amd 或 es modules

:::

:::info

file 是单个输入文件打包，不支持代码拆分。如果需要支持代码拆分，需要配置 dir 选项

:::

## 多入口打包

**配置文件**

```js
export default {
  // input: ['src/index.js', 'src/album.js'],
  input: { // 文件重命名
    foo: 'src/index.js',
    bar: 'src/album.js'
  },
  output: {
    dir: 'dist',
    format: 'amd'
  }
}
```



:::warning

多入口打包时，rollup 内部会自动提取公用模块，会使用到代码拆分，所以不能够使用 iife 输出格式

:::

:::info

*AMD 标准格式的输出 bundle 不能直接引用*，*需要 Require.js 这样的库辅助加载*

:::

## Rollup / Webpack 选用原则

**Rollup 优势**

* 输出结果更加扁平，执行效率更高
* 自动移除未引用代码
* 打包结果依然完全可读

**Rollup 劣势**

* 加载非 ESM 的第三方模块比较复杂
* 模块最终都被打包到一个函数中，无法实现 HMR
* 浏览器环境中，代码拆分功能依赖 AMD 库

**建议**

* 如果我们正在开发一个应用程序，建议使用 webpack
* 如果我们正在开发一个框架或者类库，建议使用 rollup
* 大多数知名框架 / 库都在使用 Rollup 作为模块打包器
* 社区种希望二者并存
* Webpack 大而全，Rollup 小而美