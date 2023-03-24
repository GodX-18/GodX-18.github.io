---
title: NodeJs
icon: nodeJS
order: 2
category:
  - 前端
tag:
  - 模块化
  - Parcel
---

## V8 - JavaScript 引擎

* V8 是驱动 Google Chrome 的 JavaScript 引擎的名称
* V8 提供了 JavaScript 执行的运行时环境
* JavaScript 引擎独立于它所在的浏览器，这个关键特性促成了 Node.js 的兴起
* Node.js 生态系统非常庞大，这要归功于 V8，它还支持桌面应用程序，例如 Electron 等项目

### 其他 JS 引擎

* Firefox 具有 [**SpiderMonkey**](https://spidermonkey.dev/)
* Safari 具有 [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore)（也称为 Nitro）
* Edge 最初基于 [**Chakra**](https://github.com/Microsoft/ChakraCore)，但最近[使用 Chromium 和 V8 引擎重建](https://support.microsoft.com/en-us/help/4501095/download-the-new-microsoft-edge-based-on-chromium)

### 最求性能

* V8 是用 C++ 编写的，并且在不断改进。 
* 它是可移植的，可以在 Mac、Windows、Linux 和其他几个系统上运行。

## 如何退出 Node.js 程序

---

* 当在控制台中运行程序时，可以用 `ctrl-C` 关闭它
* `process` 核心模块提供了一种方便的方法，允许您以编程方式退出 Node.js 程序：`process.exit()`

## 如何从 Nodejs 读取环境变量

---

* Node.js 的 `process` 核心模块提供了 `env` 属性，该属性承载了在启动进程时设置的所有环境变量

* 这是访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 `development`

  ```js
  process.env.NODE_ENV // "development"
  ```

  > *注意：*`process` *不需要 "require"，它是自动可用的。*

* 在脚本运行之前将其设置为 "production"，则可告诉 Node.js 这是生产环境

* 可以用相同的方式访问设置的任何自定义的环境变量

## 如何使用Nodejs REPL

----

* 直接在终端中输入`node`，开启 REPL

> 注意：REPL 也被称为运行评估打印循环，是一种编程语言环境（主要是控制台窗口），它使用单个表达式作为用户输入，并在执行后将结果返回到控制台。

* 输入 JavaScript 类的名称，例如 `Number`，添加一个点号并按下 `tab`，可以查看该类的所有属性和方法
  ![image-20220907220328023](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220907220328023.png)
* 通过输入 `global.` 并按下 `tab`，可以检查可以访问的全局变量
  ![image-20220907220542983](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220907220542983.png)

* 点命令
  * `.help`: 显示点命令的帮助。
  * `.editor`: 启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。
  * `.break`: 当输入多行的表达式时，输入 `.break` 命令可以中止进一步的输入。相当于按下 ctrl-C。
  * `.clear`: 将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。
  * `.load`: 加载 JavaScript 文件（相对于当前工作目录）。
  * `.save`: 将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。
  * `.exit`: 退出 REPL（相当于按下两次 ctrl-C）

## Nodejs 从命令行接收参数

### 传参

----

**参数可以是独立的，也可以具有健和值**

示例

```bash
// 独立参数
node app.js zx

//带有键值的参数
node app.js name=zx
```

### 获取参数

---

**通过 Node.js 中内置的 `process` 对象的 argv 属性获取**

* 第一个参数是 `node` 命令的完整路径。
* 第二个参数是正被执行的文件的完整路径。
* 所有其他的参数从第三个位置开始。

**使用循环迭代所有的参数（包括 node 路径和文件路径）**

```js
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})
```

**创建一个排除了前两个参数的新数组来仅获取其他的参数**

```js
const args = process.argv.slice(2)
```

**如果参数没有键值可以直接访问**

```js
args[0]
```

**如果参数带有键值则 `args[0]` 是 `name=joe`，需要对其进行解析。 最好的方法是使用 [`minimist`](https://www.npmjs.com/package/minimist) 库，该库有助于处理参数,但是需要在每个参数名称之前使用双破折号：**

```js
// 传参
node app.js --name=zx
// 取参
const args = require('minimist')(process.argv.slice(2))
args['name'] //zx
```

## 使用 Nodejs 到命令行接收输入

---

**从版本 7 开始，Node.js 提供了 [`readline` 模块](http://nodejs.cn/api/readline.html)来执行以下操作：每次一行地从可读流（例如 `process.stdin` 流，在 Node.js 程序执行期间该流就是终端输入）获取输入**

* node 内置 readline 模块

```js
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`你叫什么名字?`, (name) => {
    console.log(`你好 ${name}!`);
    readline.close()
});
```

* [Inquirer.js 软件包](https://github.com/SBoudrias/Inquirer.js)则提供了更完整、更抽象的解决方案

  可以使用 `npm install inquirer` 进行安装，然后复用上面的代码如下：

  ```js
  import inquirer from "inquirer";
  
  var questions = [
      {
          type: "input",
          name: "name",
          message: "你叫什么名字?"
      },
      {
          type: "input",
          name: "age",
          message: "年龄?"
      }
  ];
  
  inquirer.prompt(questions).then((answers) => {
      console.log(`你好 ${answers["name"]}!`);
  });
  ```

  * Inquirer.js 可以执行许多操作，例如询问多项选择、展示单选按钮、确认等。

  * 所有的可选方案都值得了解，尤其是 Node.js 提供的内置方案，但是如果打算将 CLI 输入提升到更高的水平，则 Inquirer.js 是更优的选择。

## 使用 exports 从 Nodejs 文件中公开功能

---

**可以通过以下两种方式公开**

1. exports

   ```js
   // 公开
   const a = {
       name: 'zx',
       age: 19
   }
   exports.person = a;
   
   // 获取
   onst {person} = require('./a')
   console.log('GodX------>log',person.name);
   ```

2. module.exports

   ```js
   // 公开
   const a = {
       name: 'zx',
       age: 19
   }
   module.exports = a;
   
   // 获取
   const a = require('./a')
   console.log('GodX------>log',a.name);
   ```

## npm 包管理器

---

* `npm` 是 Node.js 标准的软件包管理器
* npm 可以管理依赖的下载
* 它起初是作为下载和管理 Node.js 包依赖的方式，但其现在也已成为前端 JavaScript 中使用的工具

**开发依赖和生产依赖**

- `--save` 安装并添加条目到 `package.json` 文件的 dependencies。
- `--save-dev` 安装并添加条目到 `package.json` 文件的 devDependencies。
- 如果不指定，则默认安装到生产依赖

> 区别主要是，`devDependencies` 通常是开发的工具（例如测试的库），而 `dependencies` 则是与生产环境中的应用程序相关。

**更新软件包**

```js
// 更新所有依赖包
npm update
// 更新单个依赖包
npm update <package-name>
```

## npm 将软件包安装到哪里

---

**本地安装**

* 软件包会被安装到当前文件树中的 `node_modules` 子文件夹下
* 在这种情况下，`npm` 还会在当前文件夹中存在的 `package.json` 文件的 `dependencies` 属性中添加 `lodash` 条目

```
npm install lodash
```

**全局安装**

* 使用 `-g` 标志可以执行全局安装
* 在这种情况下，`npm` 不会将软件包安装到本地文件夹下，而是使用全局的位置

```js
npm install -g lodash
```

**全局的位置**

* `npm root -g` 命令会告知其在计算机上的确切

## 如何使用或执行 npm 安装的软件包

---

**我们用 cowsay 来做示例** 

> cowsay 软件包提供了一个命令行程序，可以执行该程序以使母牛说些话（以及其他动物也可以说话）

**可执行文件安装到哪里**

有一个隐藏的 .bin 文件夹，其中包含指向 cowsay 二进制文件的符号链接

**如何执行**

* 可以输入 `./node_modules/.bin/cowsay` 来运行它

* 但是最新版本的 npm（自 5.2 起）中包含的 npx 是更好的选择。只需运行：

  ```bash
  npx cowsay wow
  ```

* npx 会帮你找到程序包的位置

* 修改 page.json 文件

  ```json
  {
    "name": "node",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "wow": "cowsay wow"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "cowsay": "^1.5.0",
      "inquirer": "^9.1.1",
      "lodash": "^4.17.21",
      "progress": "^2.0.3"
    }
  }
  
  ```

  

## Package.json 指南

---

- `version` 表明了当前的版本。
- `name` 设置了应用程序/软件包的名称。
- `description` 是应用程序/软件包的简短描述。
- `main` 设置了应用程序的入口点。
- `private` 如果设置为 `true`，则可以防止应用程序/软件包被意外地发布到 `npm`。
- `scripts` 定义了一组可以运行的 node 脚本。
- `dependencies` 设置了作为依赖安装的 `npm` 软件包的列表。
- `devDependencies` 设置了作为开发依赖安装的 `npm` 软件包的列表。
- `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
- `browserslist` 用于告知要支持哪些浏览器（及其版本）。

> 详见 http://nodejs.cn/learn/the-package-json-guide

## Package-lock.json 文件

----

**该文件旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包）。**

* 无需将 node_modules 文件夹（该文件夹通常很大）提交到 Git
* `package-lock.json` 文件需要被提交到 Git 仓库，以便被其他人获取
* 当运行 `npm update` 时，`package-lock.json` 文件中的依赖的版本会被更新

## 查看 npm 包安装的版本

---

**查看查看所有已安装的 npm 软件包（包括它们的依赖包）的最新版本**

```bash
npm list
```

**查看全局安装的软件包**

```bash
npm list -g
```

**查看顶层的软件包（不包括依赖包）**

```bash
npm list --depth=0
```

**通过指定名称来获取特定软件包的版本**

```bash
npm list [package_name]
```

**查看软件包在 npm 仓库上最新的可用版本**

```bash
npm view [package_name] version
```

## 安装 npm 包的旧版本

----

**可以使用 `@` 语法来安装 npm 软件包的旧版本**

```bash
npm install <package>@<version>
```

**列出软件包所有的以前的版本**

```bash
npm view <package> versions
```

## 将所有 Nodejs 依赖更新到最新版本

---

**发觉软件包的新版本**

```bash
npm outdated
```

**更新所有非主版本依赖**

```bash
npm update
```

**将所有软件包更新到新的主版本**

1. 全局安装`npm-check-updates` 软件包

   ```bash
   npm install -g npm-check-updates
   ```

2. 运行以下代码

   ```bash
   ## 这会升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本，以便 npm 可以安装新的主版本
   ncu -u
   ```

3. 运行更新

   ```bash
   npm update
   ```

   

## 使用 npm 的语义版本控制

---

**语义版本控制的概念很简单：所有的版本都有 3 个数字：`x.y.z`**

- 第一个数字是主版本。
- 第二个数字是次版本。
- 第三个数字是补丁版本。

**当发布新的版本时，不仅仅是随心所欲地增加数字，还要遵循以下规则：**

- 当进行不兼容的 API 更改时，则升级主版本。
- 当以向后兼容的方式添加功能时，则升级次版本。
- 当进行向后兼容的缺陷修复时，则升级补丁版本。

**规则详情**

- `^`: 只会执行不更改最左边非零数字的更新。 如果写入的是 `^0.13.0`，则当运行 `npm update` 时，可以更新到 `0.13.1`、`0.13.2` 等，但不能更新到 `0.14.0` 或更高版本。 如果写入的是 `^1.13.0`，则当运行 `npm update` 时，可以更新到 `1.13.1`、`1.14.0` 等，但不能更新到 `2.0.0` 或更高版本。
- `~`: 如果写入的是 `〜0.13.0`，则当运行 `npm update` 时，会更新到补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
- `>`: 接受高于指定版本的任何版本。
- `>=`: 接受等于或高于指定版本的任何版本。
- `<=`: 接受等于或低于指定版本的任何版本。
- `<`: 接受低于指定版本的任何版本。
- `=`: 接受确切的版本。
- `-`: 接受一定范围的版本。例如：`2.1.0 - 2.6.2`。
- `||`: 组合集合。例如 `< 2.1 || > 2.6`。
- 无符号: 仅接受指定的特定版本（例如 `1.2.1`）。
- `latest`: 使用可用的最新版本。

## Nodejs 包运行器 npx

---

* `npx` 是一个非常强大的命令，从 **npm** 的 5.2 版本（发布于 2017 年 7 月）开始可用
* *如果不想安装 npm，则可以*[安装 npx 为独立的软件包](https://www.npmjs.com/package/npx)*
* `npx` 可以运行使用 Node.js 构建并通过 npm 仓库发布的代码

### 轻松地运行本地命令

运行 `npx commandname` 会自动地在项目的 `node_modules` 文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包

### 无需安装的命令执行

`npx` 的另一个重要的特性是，无需先安装命令即可运行命令

例如：

```bash
## npx 可以运行该 npm 命令，而无需在本地安装
npx cowsay "你好"
```

**应用场景**

- 运行 `vue` CLI 工具以创建新的应用程序并运行它们：`npx @vue/cli create my-vue-app`。
- 使用 `create-react-app` 创建新的 `React` 应用：`npx create-react-app my-react-app`

> 当被下载完，则下载的代码会被擦除

### 使用不同的 Node.js 版本运行代码

使用 `@` 指定版本，并将其与 [`node` npm 软件包](https://www.npmjs.com/package/node) 结合使用：

```bash
npx node@10 -v ##v10.18.1
npx node@12 -v ##v12.14.1
```

> 这有助于避免使用 `nvm` 之类的工具或其他 Node.js 版本管理工具

### 直接从 URL 运行任意代码片段

* `npx` 并不限制使用 npm 仓库上发布的软件包

* 可以运行位于 GitHub gist 中的代码，例如：

  ```bash
  npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
  ```

> 当然，当运行不受控制的代码时，需要格外小心，因为强大的功能带来了巨大的责任

## Nodejs 事件循环

----

* Node.js JavaScript 代码运行在单个线程上。 每次只处理一件事。
* 这个限制实际上非常有用，因为它大大简化了编程方式，而不必担心并发问题。
* 只需要注意如何编写代码，并避免任何可能阻塞线程的事情，例如同步的网络调用或无限的循环。
* 通常，在大多数浏览器中，每个浏览器选项卡都有一个事件循环，以使每个进程都隔离开，并避免使用无限的循环或繁重的处理来阻止整个浏览器的网页。

### 阻塞事件循环

* 任何花费太长时间才能将控制权返回给事件循环的 JavaScript 代码，都会阻塞页面中任何 JavaScript 代码的执行，甚至阻塞 UI 线程，并且用户无法单击浏览、滚动页面等。
* JavaScript 中几乎所有的 I/O 基元都是非阻塞的。 网络请求、文件系统操作等。 被阻塞是个异常，这就是 JavaScript 如此之多基于回调（最近越来越多基于 promise 和 async/await）的原因。

### 调用堆栈

* 调用堆栈是一个 LIFO 队列（后进先出）
* 事件循环不断地检查调用堆栈，以查看是否需要运行任何函数
* 当执行时，它会将找到的所有函数调用添加到调用堆栈中，并按顺序执行每个函数

> 官网有个很好的例子阐释了事件循环的机制：http://nodejs.cn/learn/the-nodejs-event-loop

### 消息队列

* 当调用 setTimeout() 时，浏览器或 Node.js 会启动定时器。 当定时器到期时（在此示例中会立即到期，因为将超时值设为 0），则回调函数会被放入“消息队列”中。
* 在消息队列中，用户触发的事件（如单击或键盘事件、或获取响应）也会在此排队，然后代码才有机会对其作出反应。 类似 `onLoad` 这样的 DOM 事件也如此。
* 事件循环会赋予调用堆栈优先级，它首先处理在调用堆栈中找到的所有东西，一旦其中没有任何东西，便开始处理消息队列中的东西
* 我们不必等待诸如 `setTimeout`、fetch、或其他的函数来完成它们自身的工作，因为它们是由浏览器提供的，并且位于它们自身的线程中。 例如，如果将 `setTimeout` 的超时设置为 2 秒，但不必等待 2 秒，等待发生在其他地方

### ES6作业队列

* ECMAScript 2015 引入了作业队列的概念，Promise 使用了该队列（也在 ES6/ES2015 中引入）。 这种方式会尽快地执行异步函数的结果，而不是放在调用堆栈的末尾
* 在当前函数结束之前 resolve 的 Promise 会在当前函数之后被立即执行
* 有个游乐园中过山车的比喻很好：消息队列将你排在队列的后面（在所有其他人的后面），你不得不等待你的回合，而工作队列则是快速通道票，这样你就可以在完成上一次乘车后立即乘坐另一趟车

## 了解 process.nextTick()

---

* 每当事件循环进行一次完整的行程时，我们都将其称为一个滴答
* 当将一个函数传给 `process.nextTick()` 时，则指示引擎在当前操作结束（在下一个事件循环滴答开始之前）时调用此函数
* 事件循环正在忙于处理当前的函数代码,当该操作结束时，JS 引擎会运行在该操作期间传给 `nextTick` 调用的所有函数
* 这是可以告诉 JS 引擎异步地（在当前函数之后）处理函数的方式，但是尽快执行而不是将其排入队列
* 调用 `setTimeout(() => {}, 0)` 会在下一个滴答结束时执行该函数，比使用 `nextTick()`（其会优先执行该调用并在下一个滴答开始之前执行该函数）晚得多
* 当要确保在下一个事件循环迭代中代码已被执行，则使用 `nextTick()`

## 了解 setImmediate（）

----

* setImmediate 可以作为 nextTick 的一个替代方案
* 作为 setImmediate() 参数传入的任何函数都是在事件循环的下一个迭代中执行的回调

**`setImmediate()` 与 `setTimeout(() => {}, 0)`（传入 0 毫秒的超时）、`process.nextTick()` 有何不同**

* 传给 `process.nextTick()` 的函数会在事件循环的当前迭代中（当前操作结束之后）被执行。 这意味着它会始终在 `setTimeout` 和 `setImmediate` 之前执行
* 延迟 0 毫秒的 `setTimeout()` 回调与 `setImmediate()` 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行

## 探索 JavaScript 定时器

----

### setTimeout

* 当编写 JavaScript 代码时，可能希望延迟函数的执行。
* 这就是 setTimeout 的工作。 指定一个回调函数以供稍后执行，并指定希望它稍后运行的时间（以毫秒为单位）的值.

```js
setTimeout(() => {
  // 2 秒之后运行
}, 2000)

setTimeout(() => {
  // 50 毫秒之后运行
}, 50)
```

### setTimeout 传参

```js
const myFunction = (firstParam, secondParam) => {
  // 做些事情
}

// 2 秒之后运行
setTimeout(myFunction, 2000, firstParam, secondParam)
```

### 清除定时器

```js
const id = setTimeout(() => {
  // 应该在 2 秒之后运行
}, 2000)

// 改变主意了
clearTimeout(id)
```

### 零延迟

如果将超时延迟指定为 `0`，则回调函数会被尽快执行（但是是在当前函数执行之后）

```js
setTimeout(() => {
  console.log('后者 ')
}, 0)

console.log(' 前者 ')
```

会打印 `前者 后者`。

> *某些浏览器（IE 和 Edge）实现的* `setImmediate()` *方法具有相同的确切功能，但是不是标准的，并且*[在其他浏览器上不可用](https://caniuse.com/##feat=setimmediate)*。但是在 Node.js 中它是标准的函数。*

### setInterval

`setInterval` 是一个类似于 `setTimeout` 的函数，不同之处在于：它会在指定的特定时间间隔（以毫秒为单位）一直地运行回调函数，而不是只运行一次:

```js
setInterval(() => {
  // 每 2 秒运行一次
}, 2000)
```

上面的函数每隔 2 秒运行一次，除非使用 `clearInterval` 告诉它停止（传入 `setInterval` 返回的间隔定时器 id）：

```js
const id = setInterval(() => {
  // 每 2 秒运行一次
}, 2000)

clearInterval(id)
```

通常在 `setInterval` 回调函数中调用 `clearInterval`，以使其自行判断是否应该再次运行或停止。 例如，此代码会运行某些事情，除非 `App.somethingIWait` 具有值 `arrived`：

```js
const interval = setInterval(() => {
  if (App.somethingIWait === 'arrived') {
    clearInterval(interval)
    return
  }
  // 否则做些事情
}, 100)
```

### 递归的 setTimeout

1. `setInterval` 每 n 毫秒启动一个函数，而无需考虑函数何时完成执行。

2. 如果一个函数总是花费相同的时间，那就没问题

3. 函数可能需要不同的执行时间，这具体取决于网络条件。

4. 如果一个较长时间的执行会与下一次执行重叠

5. 为了避免这种情况，可以在回调函数完成时安排要被调用的递归的 setTimeout：

   ```js
   const myFunction = () => {
     // 做些事情
   
     setTimeout(myFunction, 1000)
   }
   
   setTimeout(myFunction, 1000)
   ```

   > Node.js 还提供 `setImmediate()`（相当于使用 `setTimeout(() => {}, 0)`），通常用于与 Node.js 事件循环配合使用。

## JS 异步编程与回调

---

### 编程语言中的异步性

* 计算机在设计上是异步的。
* 在当前的用户计算机中，每个程序都运行于特定的时间段，然后停止执行，以让另一个程序继续执行。 这件事运行得如此之快，以至于无法察觉。
* 我们以为计算机可以同时运行许多程序，但这是一种错觉（在多处理器计算机上除外）。
* 程序在内部会使用中断，一种被发送到处理器以获取系统关注的信号。
* 程序是异步的且会暂停执行直到需要关注，这使得计算机可以同时执行其他操作。 
* 当程序正在等待来自网络的响应时，则它无法在请求完成之前停止处理器。
* 通常，编程语言是同步的，有些会在语言或库中提供管理异步性的方法。 
* 默认情况下，C、Java、C＃、PHP、Go、Ruby、Swift 和 Python 都是同步的。 
* 其中一些语言通过使用线程（衍生新的进程）来处理异步操作。

### JavaSript

* JavaScript 默认情况下是同步的，并且是单线程的。 这意味着代码无法创建新的线程并且不能并行运行。

* 代码是依次执行的，例如：

  ```js
  const a = 1
  const b = 2
  const c = a * b
  console.log(c)
  doSomething()
  ```

* 但是 JavaScript 诞生于浏览器内部，一开始的主要工作是响应用户的操作，例如 `onClick`、`onMouseOver`、`onChange`、`onSubmit` 等。 使用同步的编程模型该如何做到这一点？

  * 答案就在于它的环境。 浏览器通过提供一组可以处理这种功能的 API 来提供了一种实现方式。

  * 更近点，Node.js 引入了非阻塞的 I/O 环境，以将该概念扩展到文件访问、网络调用等。


### 回调

你不知道用户何时单击按钮。 因此，为点击事件定义了一个事件处理程序。 该事件处理程序会接受一个函数，该函数会在该事件被触发时被调用：

```js
JS
document.getElementById('button').addEventListener('click', () => {
  //被点击
})
```

这就是所谓的回调。

回调是一个简单的函数，会作为值被传给另一个函数，并且仅在事件发生时才被执行。 之所以这样做，是因为 JavaScript 具有顶级的函数，这些函数可以被分配给变量并传给其他函数（称为高阶函数）。

通常会将所有的客户端代码封装在 `window` 对象的 `load` 事件监听器中，其仅在页面准备就绪时才会运行回调函数：

```js
JS
window.addEventListener('load', () => {
  //window 已被加载。
  //做需要做的。
})
```

回调无处不在，不仅在 DOM 事件中。

一个常见的示例是使用定时器：

```js
JS
setTimeout(() => {
  // 2 秒之后运行。
}, 2000)
```

XHR 请求也接受回调，在此示例中，会将一个函数分配给一个属性，该属性会在发生特定事件（在该示例中，是请求状态的改变）时被调用：

```js
JS
const xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 ? console.log(xhr.responseText) : console.error('出错')
  }
}
xhr.open('GET', 'http://nodejs.cn')
xhr.send()
```

### 处理回调中的错误

如何处理回调的错误？ 一种非常常见的策略是使用 Node.js 所采用的方式：任何回调函数中的第一个参数为错误对象（即错误优先的回调）。

如何处理回调的错误？ 一种非常常见的策略是使用 Node.js 所采用的方式：任何回调函数中的第一个参数为错误对象（即错误优先的回调）。

```js
fs.readFile('/文件.json', (err, data) => {
  if (err !== null) {
    //处理错误
    console.log(err)
    return
  }

  //没有错误，则处理数据。
  console.log(data)
})
```

### 回调的问题

回调适用于简单的场景！

但是，每个回调都可以添加嵌套的层级，并且当有很多回调时，代码就会很快变得非常复杂：

```js
JS
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach(item => {
        //你的代码在这里。
      })
    }, 2000)
  })
})
```

这只是一个简单的 4 个层级的代码，但还有更多层级的嵌套，这很不好。

该如何解决？

### 回调的替代方法

从 ES6 开始，JavaScript 引入了一些特性，可以帮助处理异步代码而不涉及使用回调：Promise（ES6）和 Async/Await（ES2017）。

## Nodejs 事件触发器

---

### 基本使用

**类似与 vue 中的 eventBus，对事件进行订阅和发布**

1. 初始化事件中心

   ```js
   const EventEmitter = require('events')
   const eventEmitter = new EventEmitter()
   ```

2. 事件注册

   ```js
   eventEmitter.on('start', () => {
     console.log('开始')
   })
   ```

3. 触发注册的事件

   ```js
   eventEmitter.emit('start')
   ```

### **带参数的事件**

**单个参数**

```js
eventEmitter.on('start', number => {
  console.log(`开始 ${number}`)
})

eventEmitter.emit('start', 23)
```

**多个参数**

```js
eventEmitter.on('start', (start, end) => {
  console.log(`从 ${start} 到 ${end}`)
})

eventEmitter.emit('start', 1, 100)
```

### 其他方法

**EventEmitter 对象还公开了其他几个与事件进行交互的方法，例如：**

- `once()`: 添加单次监听器。
- `removeListener()` / `off()`: 从事件中移除事件监听器。
- `removeAllListeners()`: 移除事件的所有监听器。

可以在事件模块的页面 http://nodejs.cn/api/events.html 上阅读其所有详细信息。

## 搭建 HTTP 服务器

---

### **基本用法**

```js
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf8')
  res.end('你好世界\n')
})

server.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}/`)
})
```

**简要分析一下**

* 首先，引入了 [`http` 模块](http://nodejs.cn/api/http.html)，使用该模块来创建 HTTP 服务器
* 服务器被设置为在指定的 `3000` 端口上进行监听。 当服务器就绪时，则 `listen` 回调函数会被调用。
* 传入的回调函数会在每次接收到请求时被执行。 每当接收到新的请求时，[`request` 事件](http://nodejs.cn/api/http.html##http_event_request)会被调用，并提供两个对象：一个请求（[`http.IncomingMessage`](http://nodejs.cn/api/http.html##http_class_http_incomingmessage) 对象）和一个响应（[`http.ServerResponse`](http://nodejs.cn/api/http.html##http_class_http_serverresponse) 对象）。
  * `request` 提供了请求的详细信息。 通过它可以访问请求头和请求的数据。
  * `response` 用于构造要返回给客户端的数据。
* 设置 statusCode 属性为 200，以表明响应成功。
* 最后结束并关闭响应，将内容作为参数添加到 `end()`

## 使用 Nodejs 发送 http 请求

---

```js
JS
const https = require('https')
const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'GET'
}


const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)


  res.on('data', d => {
    process.stdout.write(d)
  })
})


req.on('error', error => {
  console.error(error)
})


req.end()
```



### 执行 POST 请求

```js
JS
const https = require('https')


const data = JSON.stringify({
  todo: '做点事情'
})


const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}


const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)


  res.on('data', d => {
    process.stdout.write(d)
  })
})


req.on('error', error => {
  console.error(error)
})


req.write(data)
req.end()
```

### PUT 和 DELETE

PUT 和 DELETE 请求使用相同的 POST 请求格式，只需更改 `options.method` 的值即可。



 