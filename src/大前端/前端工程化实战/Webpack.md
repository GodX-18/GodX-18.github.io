---
title: Webpack 打包
icon: speed
order: 5
category:
  - 前端
tag:
  - 模块化
---


### 为什么需要模块化打包

* ES Modules 存在环境兼容问题
* 模块化文件过多，网络请求频繁
* 所有的前端资源都需要模块化（资源文件）

### 打包工具的作用

* 新特性的语法转换，例如 es6 编译成 es5
* 将散落的模块文件再次合并到一起（解决频繁请求模块文件的问题）
* 支持不同种类的前端资源类型

### 快速上手

1. 初始化项目，安装 webpack、webpack-cli
   ```bash
   yarn init --yes
   yarn add webpack webpack-cli -D
   ```

2. 在根目录下新建一个 src/index.js 作为入口文件
   ```js
   import createHeading from './heading.js'
   
   const heading = createHeading()
   
   document.body.append(heading)
   ```

   *heading.js*

   ```js
   export default () => {
     const element = document.createElement('h2')
   
     element.textContent = 'Hello world'
     element.addEventListener('click', () => {
       alert('Hello webpack')
     })
   
     return element
   }
   ```

3. 使用 webpack-cli 进行初体验

   ```bash
   yarn webpack --mode production
   ```

   :::info

   Webpack4之后的版本支持零配置打包， 会默认使用 src 目录下的 index.js 文件作为入口文件进行打包，并输出到 `dist/main.js`

   :::

### 配置文件

在根目录下新建`webpack.config.js`文件，该文件是运行在`node`环境下的 js 文件，所以我们要使用`commonjs`规范来编写

```js
const path = require("path");
module.exports = {
  entry: "./src/main.js", // 指定入口文件
  output: {
    filename: "zx.js", // 定义输出文件的名称
    path: path.resolve(__dirname, "output") // 输出目录
  }
};
```

:::info

输出的路径必须定义为绝对路径

:::

### 工作模式

**webpack一共有三种工作模式：**

* production：该模式下，会自动使用一些优化插件进行处理，比如压缩插件
* development：该模式下，会自动优化打包速度，添加一些调试过程中辅助
* none：最基本的模块打包功能，不做任何额外的处理

**可以用配置文件中的`mode`属性来指定模式	**

:::info

webpack会默认使用 production模式

:::

### 资源模块加载

loader 是 webpack 的核心特性，借助 Loader 就可以加载任何类型的资源

```js
const path = require("path");
module.exports = {
	module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
```

**loader** 有两个属性：

1. `test` 属性，识别出哪些文件会被转换。
2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。

:::info

Webpack 会从后往前加载 loader编译

:::

### 导入资源模块

*webpack 推荐在 js 文件中引入资源文件，原因如下：*

* 逻辑合理，JS 确实需要这些资源文件
* 确保上线资源部缺失，都是必要的

### 文件资源加载器

*无法通过 js 来表示的资源文件，需要使用文件资源加载器*

**入口文件使用 png 资源**

```js
import icon from '../static/icon.png'
const img = new Image();
img.src = icon;

document.body.append(img)
```

**添加 file-loader 配置**

```js
const path = require("path");
module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/"
  },
  module: {
    rules: [
      {
        test: /.png$/,
        use: "file-loader"
      }
    ]
  }
};

```

:::warning

publicPath 属性默认为 “”，表示网站的根目录。该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，**此选项的值都会以 `/` 结束**。

:::

### Data URLs 与 url-loader

Data URLs 是一种特殊的 url 协议。它能够直接表示一个文件，不需要发起 http 请求，可以通过代码的方式来表示任何文件

![image-20221021172552294](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221021172552294.png)

可以通过`url-loader`将文件转换成 data urls，比较适合体积比较小的文件，可以减少 http 请求的次数，如果体积过大会导致我们打包结果比较大，从而会影响我们的运行速度。

**最佳实践**

* 小文件使用`Data URLs`,减少请求次数
* 大文件单独提取存放，提高加载速度

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.png$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024 // 只编译10 KB以下的文件，否则使用 file-loader
          }
        }
      }
    ]
  }
};

```

::: warning

如果使用 `url-loader` 的 `limit` 选项必须要安装 `file-loader` 依赖，否则会报错

:::

### Webpack 常用的资源加载器分类

**编译转换类**

*将加载的资源模块转换为 JS 代码，例如 css-loader*

![image-20221022083158717](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022083158717.png)

**文件操作类**

*将加载的资源模块拷贝到输出目录，同时导出文件访问路径，例如 file-loader*

![image-20221022083414836](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022083414836.png)

**代码检查类**

*统一代码风格，提高代码质量，例如 eslint-loader*

![image-20221022083510177](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022083510177.png)

### 处理 ES2015

*因为模块打包需要，所以处理 import 和 export。并不能自动帮我们转换一些其他新特性的语法*

```js
module.exports = {
  module: {
    rules: [
       {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
    ]
  }
};
```

:::info

* Webpack 只是打包工具
* 加载器可以用来编译转换代码

:::

### 模块加载方式

*webpack 支持一下几种种模块加载方式*

* 遵循 ES Modules 标准的 import 声明

  ![image-20221022085028091](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022085028091.png)

* 遵循 CommonJS 标准的 require 函数
  ![image-20221022085117754](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022085117754.png)

* 遵循 AMD 标淮的 define 函数和 require 函数
  ![image-20221022085154242](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022085154242.png)

* Loader 加载的非 JavaScript 也会触发资源加载，例如：

  * 样式代码中的 @import 指令 和 url 函数
  * HTML 代码中图片标签的 src 属性

```js
// 在 webpack5 中使用旧的 assets loader配置 
module.exports = {
  module: {
    rules: [
     {
        test: /.png$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024, // 10 KB
            esModule: false // 采用 coomonjs 语法
          },
        },
        type: 'javascript/auto'
      },
    ]
  }
};
```

:::info

url-loader默认采用ES模块语法，即import ‘…/aaa.png’；
然而 css 、vue 生成的是CommonJS模块语法，即require(’…/image.png’)；二者不一致。
要么让file-loader或url-loader采用CommonJS语法，要么让Vue采用ES语法。

url-loader中的属性esModule选项能调整，将其设置为false即可，就关闭了es模块语法

:::

:::info

Webpack 5 中，资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

如果需要在 webpack4 中正常使用 url-loader 需要一些额外的配置

:::

### 核心工作原理

*loader 机制是 webpack 的核心*

![image-20221022105853332](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221022105853332.png)

1. 在我们的项目当中一般都会散落着各种各样的代码以及资源文件，webpack 会根据我们的配置，找到其中一个文件作为打包的入口，一般情况下，这个文件都会是一个js 文件，然后他会顺着入口文件中的代码，根据代码中的出现的 import 或者 require 之类的语句，然后解析推断出来这个文件所依赖的资源模块，然后分别去解析每个资源模块对应的依赖。最后形成整个项目中所有用到文件之间的一个依赖关系树。
2. 有了这个依赖关系树之后，webpack 会递归这个依赖树，然后找到每个节点所对应的资源文件，最后再根据配置文件中的 rules 属性去找到这个模块所对应的加载器,然后交给对应的加载器去加载这个模块，最后会将加载后的结果放入打包结果当中，从而实现整个项目的打包

### 开发一个 Loader

*我们现在开发一个 markdown loader，更直观的帮助我们理解 loader 的原理*

1. 首先在根目录下新建一个 maekdown-loader.js 文件
   ```js
   const marked = require("marked"); // 用来讲 md 转换成 html
   
   module.exports = (source) => {
     const html = marked.parse(source);
     // return `module.exports = "${html}"`
     // return `export default ${JSON.stringify(html)}`
   
     // 返回 html 字符串交给下一个 loader 处理
     return html;
   };
   ```

   :::info

   如果当前 loader 没有下个 loader 处理，那当前 loader 最终返回的结果必须是一段 JS 代码，否则 webpack 会报错

   :::

2. 使用 loader
   ```js
   const path = require('path')
   
   module.exports = {
     mode: 'none',
     entry: './src/main.js',
     output: {
       filename: 'bundle.js',
       path: path.join(__dirname, 'dist'),
       publicPath: 'dist/'
     },
     module: {
       rules: [
         {
           test: /.md$/,
           use: [
             'html-loader',
             './markdown-loader'
           ]
         }
       ]
     }
   }
   
   ```

### 插件机制

*目的：增强 webpack 自动化的能力，例如：清除 dist 目录、代码的压缩、拷贝静态文件至输出目录*

### Clean-webpack-plugin

*自动清除输出目录*

1. 安装
   ```js
   yarn add clean-webpack-plugin -D
   ```

2. 使用
   ```js
   const { CleanWebpackPlugin } = require("clean-webpack-plugin");
   module.exports = {
     plugins: [new CleanWebpackPlugin()]
   };
   ```

### Html-webpack-plugin

*自动生成使用 bundle.js的 html*

1. 安装
   ```js
   yarn add html-webpack-plugin -D
   ```

2. 使用
   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: 'index.js',
     output: {
       path: __dirname + '/dist',
       filename: 'index_bundle.js'
     },
     plugins: [
       new HtmlWebpackPlugin({
         title: 'Webpack Plugin Sample', // 网页标题
         meta: {
           viewport: 'width=device-width'
         },
         template: './src/index.html' // 使用模版文件
       }),
       new HtmlWebpackPlugin({
         filename: 'about.html' 
       })
     ]
   }
   ```

### Copy-webpack-plugin

   *处理不需要处理的静态文件*

   1. 安装
      ```js
      yarn add copy-webpack-plugin -D
      ```

   2. 使用
      ```js
      const path = require("path");
      const CopyPlugin = require("copy-webpack-plugin");
      module.exports = {
        mode: "development",
        entry: "./src/index.js",
        plugins: [
          new CopyPlugin([
            {
              from: path.resolve(__dirname, "public/"),
              to: path.resolve(__dirname, "dist/public/")
            }
          ])
        ]
      };
      
      ```

### 开发一个插件

*loader 是在加载模块的时候去工作，而 plugin 拥有更宽的能力范围。*现在我们开发一个删除打包 bundle.js 中无用的注释，使其更加容易阅读

**原理**

*通过在生命周期的钩子中挂载函数实现扩展，类似于 vue 的生命周期钩子函数*

:::info

`webpack` 要求插件必须是一个函数或者是一个包含 `apply` 方法的对象

:::

**实现**

```js
class MyPlugin {
  apply(complier) {
    complier.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation => 可以理解为此次打包的上下文，其中 assets 为输出目录下的所有文件
      for (let name in compilation.assets) {
        if(name.endsWith(".js"))  {
          const contents =  compilation.assets[name].source(); // 获取文件内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, ''); // 去除注释
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    });
  }
}

modules.export = {
  mode: 'none',
  plugins: [
    new MyPlugin()
  ]
}
```

### 优化开发体验

**目前我们是通过以下方式来开发的**

![image-20221108074901611](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221108074901611.png)

这种方式过于原始，我们在实际的开发中不推荐使用这种方式

**理想的开发环境**

* 以 http Server 运行
  * 更加接近生产环境的状态
  * 可以使用 ajax 这类 api，这些 api 不能以文件的形式去访问
* 自动编译 + 自动构建
  * 减少重复操作
* 提供 Source Map 支持
  * 方便定位错误

### webpack 实现自动编译

**watch 工作模式**

Webpack 可以监听文件变化，当它们修改后会重新编译。

**使用方式**

* 命令行参数
  ```bash
  webpack --watch
  ```

* webpack.config.js 中配置
  ```js
  module.exports = {
    //...
    watch: true,
  };
  ```

:::info

[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 和 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 里 Watch 模式默认开启。

:::

### webpack 自动刷新浏览器

**BrowserSync**

```js
browser-sync dist --files "**/*"
```

缺点

* 操作麻烦
* 磁盘读写，效率较低

**Webpack Dev Server**

* 提供用于开发的 HTTP Server
* 集成了自动编译和自动刷新浏览器等功能

1. 安装
   ```bash
   yarn add webpack-dev-server -D
   ```

2. 使用
   ```bash
   yarn webpack-dev-server --open 
   ```

   或者在`pakage.json`中添加命令

   ```json
   "scripts": {
       "serve": "webpack-dev-server --open"
     },
   ```

:::info

Webpack Dev Server 为了提高工作效率，将打包结果暂时存放在内存当中，内部的 httpServer 也是从内存中取出打包结果通知浏览器更新

:::

**静态资源访问**

* Dev Server 默认只会 serve 打包输出文件
* 只要是 webpack 输出的文件，都可以直接被访问
* 如果其他静态资源文件也需要 serve，就需要做一些额外的配置

```js
devServer: {
    contentBase: './public',
},
```

:::info

`CopyWebpackPlugin` 插件不推荐在开发环境中使用，因为开发过程中我们频繁的执行打包任务，如果拷贝的文件比较多，会降低打包速度。所以我们需要以上配置。

:::

### 代理 API 服务

![image-20221110085724400](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221110085724400.png)

* 跨域资源共享 （CORS）可以解决跨域问题，但并不适用于开发环境

![image-20221110085751328](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221110085751328.png)

```js
  devServer: {
    proxy: {
      "/api": {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: "https://api.github.com",
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          "^/api": ""
        },
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名
        changeOrigin: true
      }
    }
  },
```

:::info

服务器会根据主机名去判断属于哪个网站，因为默认是使用当前的主机名（localhost:8080），服务器并不认识。所以需要 changeOrigin 去配置主机名

:::

### Source Map

**帮助开发者调试和定位错误，解决了源代码与运行代码不一致所产生的问题**

![image-20221110090102052](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221110090102052.png)

**现有问题**

* 运行代码与源代码之间完成不同
* 如果需要调试应用，错误信息无法定位
* 调试和报错都是基于运行代码

**使用**

首先添加`source map`文件，定义压缩文件与源代码之间的映射。接着在压缩代码中添加注释使用，例如下面的例子：

![image-20221110091201803](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221110091201803.png)

这样，我们就可以在控制台直接调试源码，而不是编译后的代码

![image-20221110091304578](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221110091304578.png)

### Webpack 配置 Source Map

* webpack 支持 12 种不同的方式
* 每种方式的效率和效果各不相同，效果越好，效率越慢

![image-20221110131346590](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221110131346590.png)

**使用**

```js
module.exports ={
   devtool: "source-map",
}
```



#### eval 模式下的 Source Map

#### 原理

通过 JS 的 `eval`api 注释中的`sourceURL`属性找到文件所在的目录

```js
eval('console.log(123) //# sourceURL=./foo/b')
```

#### 不同 devtool 之间的差异

**eval**

只能用来定位源代码所在的文件名称

**eval-source-map**

同样使用`eval`函数去执行模块代码，但是它不仅能定位源代码所在的文件名称，还可以定位报错的行列信息。相比于 eval 模式，它生产了 source map 文件

**eval-cheap-source-map**

阉割版的 eval-source-map，只能定位到行，不能定位到列，效率比 eval-source-map 要快

**cheap-module-eval-source-map**

相比于上一个模式，定位的源码是没有经过 loader 加工的代码，也就是我们手写的源代码

:::info

* eval 是否使用 eval 执行模块代码
* cheap Source Map 是否包含行信息
* module是否能够得到 Loader 处理之前的源代码

:::

**cheap-source-map**

没有用 eval

**inline-source-map**

和普通的 source-map 效果是一样的，只是引入 source-map 的方式不同，它将 source-map 文件以 data-url 嵌入到源代码当中，这会导致代码文件会很大，不推荐使用

**hidden-source-map**

隐藏了 source-map 文件，使用一些第三方包的时候经常会使用

**nosources-source-map**

能看到出现问题的位置，但是点击看不见源代码。通常使用在生产环境，不想暴露源码的情况下

### 选择合适的 source map

#### 开发环境

cheap-module-eval-source-map

**原因：**

* 我的代码每行不会超过80个字符
* 我的代码经过 Loader 转换过后的差异较大
* 首次打包速度慢无所谓，重写打包相对较快

#### 生产环境

none

* Source Map 会暴露源代码
* 调试是开发阶段的事情

### 自动刷新的问题

**问题**

自动刷新导致的页面状态丢失，例如：在视图中在输入框中输入文本，编辑代码查看效果时，输入的文本丢失，无法及时看到效果

**方案**

* 代码中写死编辑器中的内容
* 额外代码实现刷新前保存，刷新后读取

**预想**

在页面不刷新的前提下，模块也可以及时更新

### HMR-模块热更新

* 在应用程序运行的过程中实时替换某个模块，而且应用的运行状态不受影响
* 热替换只将修改的模块实时替换至应用中，不会完全刷新应用

**使用**

HMR 集成在 webpack-dev-server 中，通过以下两种方式使用：

命令行

```bash
webpack-dev-server --hot
```

或者配置文件

```js
const webpack = require('webpack')
module.exports = {
  devServer: {
    hot: true
  }，
  plugins: [
  new webpack.HotModuleReplacementPlugin()
  ]
}
```

:::info

Weboack 中的 HMR 并不可以开箱即用，需要手动处理模块热替换的逻辑

:::

**为什么样式文件的热更新开箱即用？**

因为样式文件时通过`loader`处理的，在 style-loader 当中就已经自动处理了样式文件的热更新，所以不需要我们自己去手动配置

![image-20221111145435273](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221111145435273.png)

**凭什么样式可以自动处理？**

因为在样式模块更新过后，把更新过后的 css 及时替换到页面当中，当就可以覆盖掉之前的样式，从而实现样式文件的更新。

而我们所编写的 js 模块是没有任何规律的，你可能在一个模块当中导出的是一个对象，也可能导出的是一个字符串或者函数，导出成员的使用也各不相同，所以无法实现一个通用的模热更新方案。这就是为什么样式文件可以自动更新，而修改 js 代码页面自动刷新的原因。

**我的项目没有手动处理，JS 照样可以热替换**

因为你使用了框架，框架下的开发，每种文件都是有规律的。通过脚手架创建的项目内部都集成了 HMR 方案

### 处理 JS 模块热替换

```js
import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

if (module.hot) {
  let hotEditor = editor
  module.hot.accept('./editor.js', () => {
    const value = hotEditor.innerHTML
    document.body.removeChild(hotEditor)
    hotEditor = createEditor()
    hotEditor.innerHTML = value
    document.body.appendChild(hotEditor)
  })
}

```

**图片模块热替换**

```js
import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

if (module.hot) {
  module.hot.accept('./better.png', () => {
    img.src = background
  })
}

```

### HMR 注意事项

* HMR 的代码报错会导致自动刷新

  * 问题：自动刷新将会报错信息覆盖

  * 解决方案：使用 hotOnly
    ```js
    devServer: {
      hotOnly: true
    }
    ```

* 没启用 HMR 的情况下，HMR API 报错

* HMR 开发环境下的配置代码在打包后会自动去除，所以生产环境无需作额外的处理

### 生产环境优化

**生产环境与开发环境有着很大的差异**

* 生产环境注重运行效率
* 开发环境注重开发效率

:::info

Webpack 也推荐我们为不同的工作环境创建不同的配置

:::

### 不同环境下的配置

**有两种配置方式**

1. 配置文件根据环境不同导出不同配置（配置文件中添加判断）

   ```bash
   # 命令行指定运行环境
   yarn webpack --env production
   ```

   ```js
   const webpack = require('webpack')
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   
   module.exports = (env, argv) => {
     const config = {
       mode: 'development',
       entry: './src/main.js',
       output: {
         filename: 'js/bundle.js'
       },
       devtool: 'cheap-eval-module-source-map',
       devServer: {
         hot: true,
         contentBase: 'public'
       },
       module: {
         rules: [
           {
             test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
           },
           {
             test: /\.(png|jpe?g|gif)$/,
             use: {
               loader: 'file-loader',
               options: {
                 outputPath: 'img',
                 name: '[name].[ext]'
               }
             }
           }
         ]
       },
       plugins: [
         new HtmlWebpackPlugin({
           title: 'Webpack Tutorial',
           template: './src/index.html'
         }),
         new webpack.HotModuleReplacementPlugin()
       ]
     }
   	// 条件判断
     if (env === 'production') {
       config.mode = 'production'
       config.devtool = false
       config.plugins = [
         ...config.plugins,
         new CleanWebpackPlugin(),
         new CopyWebpackPlugin(['public'])
       ]
     }
   
     return config
   }
   ```

2. 一个环境对应一个配置文件
   **一般有三个配置文件，其中一个是公用配置**

   ![](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221111160124716.png)

   * 通用配置
     ```js
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     
     module.exports = {
       entry: './src/main.js',
       output: {
         filename: 'js/bundle.js'
       },
       module: {
         rules: [
           {
             test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
           },
           {
             test: /\.(png|jpe?g|gif)$/,
             use: {
               loader: 'file-loader',
               options: {
                 outputPath: 'img',
                 name: '[name].[ext]'
               }
             }
           }
         ]
       },
       plugins: [
         new HtmlWebpackPlugin({
           title: 'Webpack Tutorial',
           template: './src/index.html'
         })
       ]
     }
     
     ```

   * 开发环境的配置
     ```js
     const webpack = require('webpack')
     const merge = require('webpack-merge')
     const common = require('./webpack.common')
     
     module.exports = merge(common, {
       mode: 'development',
       devtool: 'cheap-eval-module-source-map',
       devServer: {
         hot: true,
         contentBase: 'public'
       },
       plugins: [
         new webpack.HotModuleReplacementPlugin()
       ]
     })
     
     ```

   * 生产环境的配置
     ```js
     const merge = require('webpack-merge')
     const { CleanWebpackPlugin } = require('clean-webpack-plugin')
     const CopyWebpackPlugin = require('copy-webpack-plugin')
     const common = require('./webpack.common')
     
     module.exports = merge(common, {
       mode: 'production',
       plugins: [
         new CleanWebpackPlugin(),
         new CopyWebpackPlugin(['public'])
       ]
     })
     ```

   :::warning

   不推荐使用 Object.assign() 去合并配置，会覆盖公用配置中所有的配置

   :::

   **使用对应的配置文件进行打包**

   ```bash
   yarn webpack --config webpack.prod.js
   ```

   **也可以定义到 npm scripts 中，更加方便我们使用**

   ```js
   "scripts": {
       "build": "webpack --config webpack.prod.js"
    },
   ```

:::info

第一种方式只适用于中小型项目，如果项目较大，推荐使用第二种方式。因为项目越复杂，配置文件也就越复杂，分开编写，更加方便维护

:::

### DefinePlugin

**内置插件，为代码注入全局成员**

:::info

在 production 模式下，DefinePlugin插件默认启用，并且在我们的代码当中注入一个 `process.env.NODE_ENV`这个常量，很多第三方模块都会通过这个常量去判断当前的运行环境

:::

**定义全局成员**

```js
module.exports = {
   plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
  ]
}
```

**使用全局成员**

```js
console.log(API_BASE_URL)
```

:::info

DefinePlugin 的值要求是一个代码片段，如果写成字符串，打包结果会有问题，如下图

![image-20221111163253519](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221111163253519.png)

:::

### Tree-shaking

**打包过程去除项目中未引用的代码，生产环境下会自动开启**

:::info

Tree-shaking 不是指某个配置选项，而是一组功能搭配使用后的优化效果，production 模式下自动开启

:::

**开发模式下使用**

```js
 optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 压缩输出结果
     minimize: true
  }
```

**原理**

* usedExports 负责标记用不到的代码
* Minimize 负责去除被标记的代码

**webpack 合并模块（Scope Hoisting - 作用域提升）**

```js
 optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
  }
```

:::info

合并每一个模块到一个函数中，既提升了运行效率，又减少了代码的体积

:::

### Tree-shaking & Babel

**使用 babel-loader 会导致 tree-shaking 失效的问题**

* tree-shaking 前提是不需要使用 ES Modules 
* 由 Webpack 打包的代码必须要使用 ESM

原因

因为打包过后的代码不是 ES Modules 格式的，所以导致 tree-shaking 无效

解决方案

通过配置，关闭转换 ES Modules即可

```js
module.exports = {
  module: {
    rules: [
        {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
              // ['@babel/preset-env', { modules: 'commonjs' }]
              // ['@babel/preset-env', { modules: false }]
              // 也可以使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
              ['@babel/preset-env', { modules: 'auto' }]
            ]
          }
        }
      }
    ]
  }
}
```

### sideEffects

**简介**

允许我们通过配置的方式来标记我们的代码是否有副作用，从而为 tree-shaking 提供更大的压缩空间，production 模式下会自动开启

**副作用**

模块执行时除了导出成员之外所作的事情

**使用场景**

一般用于 npm 包标记是否有副作用

**使用方法**

```js
 optimization: {
		sideEffects: true,
  }
```

**执行过程**

开启后，首先检查` pakage.json` 文件中的`sideEffects`标识，以此来判断这个模块是否有副作用，如果没有副作用，这些没有的用到的模块就不会被打包

:::warning

Webpack 中的 sideEffects 选项是用来开启这个功能，而 package.json 中的是标识作用，不要混淆

:::

**注意事项**

* 使用前，确保你的代码真的没有副作用，否则 webpack 会误删掉有副作用的代码，比如下面的代码：
  ```js
  // 为 Number 的原型添加一个扩展方法
  Number.prototype.pad = function (size) {
    // 将数字转为字符串 => '8'
    let result = this + ''
    // 在数字前补指定个数的 0 => '008'
    while (result.length < size) {
      result = '0' + result
    }
    return result
  }
  ```

* 可以在 package.json 中配置以标记有副作用的代码
  ```js
  "sideEffects": [
      "./src/extend.js",
      "*.css"
   ]
  ```

### 代码分包/代码分割

**问题**

* 如果应用很大，所有代码最终都被打包到一起，导致bundle 体积过大
* 并不是每个模块在启动时都是必要加载的，打包到一起会整体加载所有模块，这会浪费很多流量和带宽
* Http 1.1本身有很多缺陷：
  * 同域并行请求限制
  * 每次请求都会有一定的延迟
  * 请求的 Header 浪费带宽流量

**解决方案**

分包的两种方式

1. 多入口打包

   * 适用于多页应用程序，一个页面对应一个打包入口，公共部分单独提取

     * 开启多入口打包
     * 输出名称动态获取
       * 输出的目录名称必须要区分
     * 使用 chunks 选项指定引入的模块
       * 因为  HtmlWebpackPlugin 插件会默认加载所有的模块

     ```js
     const { CleanWebpackPlugin } = require('clean-webpack-plugin')
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     
     module.exports = {
       mode: 'none',
       // 开启多入口打包
       entry: {
         index: './src/index.js',
         album: './src/album.js'
       },
       // 输出名称动态获取
       output: {
         filename: '[name].bundle.js'
       },
       module: {
         rules: [
           {
             test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
           }
         ]
       },
       plugins: [
         new CleanWebpackPlugin(),
         // 使用 chunks 选项指定引入的模块
         new HtmlWebpackPlugin({
           title: 'Multi Entry',
           template: './src/index.html',
           filename: 'index.html',
           chunks: ['index']
         }),
         new HtmlWebpackPlugin({
           title: 'Multi Entry',
           template: './src/album.html',
           filename: 'album.html',
           chunks: ['album']
         })
       ]
     }
     
     ```

     **提取公共模块**

     在 optimiztion 中配置 splitChunks  即可

     ```js
       optimization: {
         splitChunks: {
           // 自动提取所有公共模块到单独 bundle
           chunks: 'all'
         }
       },
     ```

2. 动态导入

   1. 目的：实现按需加载
      按需加载：需要用到某个模块时，再加载这个模块

   2. 动态导入的模块会被自动分包

   3. 可以通过代码的逻辑来控制加载模块的时机

   4. 实现：无需配置，只需使用 ES modules 动态导入的语法即可，webpack 内部自动会帮我们处理分包和按需加载

   5. 代码示例
      ```js
      // import posts from './posts/posts'
      // import album from './album/album'
      
      const render = () => {
        const hash = window.location.hash || '#posts'
      
        const mainElement = document.querySelector('.main')
      
        mainElement.innerHTML = ''
      
        if (hash === '#posts') {
          // mainElement.appendChild(posts())
          import('./posts/posts').then(({ default: posts }) => {
            mainElement.appendChild(posts())
          })
        } else if (hash === '#album') {
          // mainElement.appendChild(album())
          import('./album/album').then(({ default: album }) => {
            mainElement.appendChild(album())
          })
        }
      }
      
      render()
      
      window.addEventListener('hashchange', render)
      ```

### 魔法注释

**解决问题**

默认使用动态导入产生的 bundle 文件名称只是一个序号，如果你需要给 bundle 命名的话，可以使用 webpack 的魔法注释来去实现

**如何使用**

```js
// import posts from './posts/posts'
// import album from './album/album'

const render = () => {
  const hash = window.location.hash || '#posts'

  const mainElement = document.querySelector('.main')

  mainElement.innerHTML = ''

  if (hash === '#posts') {
    // mainElement.appendChild(posts())
    import(/* webpackChunkName: 'posts' */'./posts/posts').then(({ default: posts }) => {
      mainElement.appendChild(posts())
    })
  } else if (hash === '#album') {
    // mainElement.appendChild(album())
    import(/* webpackChunkName: 'album' */'./album/album').then(({ default: album }) => {
      mainElement.appendChild(album())
    })
  }
}

render()

window.addEventListener('hashchange', render)
```

**小技巧**

如果魔法注释的名字起的是一样的，webpack 会将同名的模块打包到一起，可以根据这个特性，灵活组织动态加载的模块所输出的文件目录

### MinCssExtractPlugin

**作用**

可以将 CSS 代码从打包结果中提取出来，可以更具这个插件来时 CSS 模块的按需加载

**使用场景**

CSS 文件超过 150 KB 时使用。因为小于 150 KB 时嵌入到代码当中，减少一次请求，效果可能会更好

**使用**

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader, // 通过 link 的方式引入
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dynamic import',
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}

```

**OptimizeCssAssetsWebpackPlugin**

**作用**

压缩输出的 CSS 文件

:::info

生产环境下，webpack只会压缩 JS 文件，其他的文件压缩需要额外的插件支持。

:::

**使用**

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    // wenpack 推荐在 minimizer 中配置，只有在生产环境下才会启用
    minimizer: [
      // 不添加，生产环境下不会压缩 JS 代码
      new TerserWebpackPlugin(),
      // 压缩 CSS
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dynamic import',
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}
```

### 输出文件名 Hash

**作用**

如果线上网页设置缓存的时间过长，项目重新发布依旧会使用缓存进行展示。生产模式下，文件名使用 Hash，一旦资源文件发生改变，Hash 值也会改变，文件名称也会改变。这样客户端的缓存时间就可以设置的非常长，也就不用担心文件更新过后的问题

**使用**

通过占位符的方式设置 hash

有三种 Hash 

* 整个项目级别

  * 项目中的代码只要有任何改动，hash 都会发生变化
    ```js
    output: {
        filename: '[name]-[hash:8].bundle.js'
     },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name]-[hash:8].bundle.css'
        })
      ]
    ```

* chunk 级别

  * 同一个入口的 hash 是一样的，其他入口的 hash 不会受影响
    ```js
    output: {
        filename: '[name]-[chunkhash:8].bundle.js'
     },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name]-[chunkhash:8].bundle.css'
        })
      ]
    ```

* 文件级别

  * 根据文件的内容生产 Hash，只有文件内容改变时，才会改变 Hash
    ```js
    output: {
        filename: '[name]-[contenthash:8].bundle.js'
     },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name]-[contenthash:8].bundle.css'
        })
      ]
    ```

:::info

推荐使用 8 位的 文件级别 Hash

:::
