---
title: Node 基础
icon: structure
order: 1
category:
  - 前端
tag:
  - nodejs	
---

## Nodejs 可以做什么？

* 轻量级、高性能的 Web 服务
* 前后端 JS 同构开发
* 便捷高效的前端工程化

## Nodejs 架构

![image-20221226104356196](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221226104356196.png)

### Natives modules

内置核心模块：暴露相应的 JS 功能接口，供开发者直接进行调用

* 当前层内容由 JS 实现
* 提供应用程序可直接调用库，例如 fs 、path、http 等

### Builtin modules

胶水层：帮我们找到 C++ 对应的 modules 层，需要 v8 引擎配合实现

* 当前层由 C / C++ 代码编写而成
* 该层表我们调用 C / C++ 函数

### 底层

* V8：构建 Nodejs 的运行环境，执行 JS 代码，提供桥梁接口
* Libuv：时间循环、事件队列、异步 IO
* 第三方模块：zlib 、 http 、 c-ares 等

## 为什么是 Nodejs

Nodejs 慢慢演化为一门服务端“语言”

![image-20221226115124046](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221226115124046.png)

:::info

IO 是计算机操作过程中最缓慢的环节，Node 结合 Reactor 模式下实现异步 IO、事件驱动

:::

## Nodejs 异步 IO

* 重复调用 IO 操作，判断 IO 是否结束（轮询）

* 常见的轮询技术：read、select、poll、kqueue、event potrts

* 期望实现无需主动判断的非阻塞 IO


![image-20221226154047982](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221226154047982.png)

![image-20221226154153310](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221226154153310.png)

* IO 是应用程序的瓶颈所在
* 异步 IO 提高性能不在原地等待结果返回
* IO 操作属于操作系统级别，平台都有对应实现
* Node 单线程配合事件驱动架构及 libuv 实现了异步 IO

## Node 事件驱动架构

```js
const EventBus = require("events");

const myEvent = new EventBus();

myEvent.on("message", () => {
  console.log("GodX------>log", 111);
});

myEvent.on("message", () => {
  console.log("GodX------>log", 222);
});

myEvent.emit("message");
```

## Nodejs 单线程

使用 JS 实现高效可伸缩的高性能 Web 服务

**单线程如何实现高并发？**

* 异步非阻塞 IO 配合事件回调通知
* Nodejs 主线程是单线程

## Node 应用场景

* 适合于 IO 密集型高并发请求
* Nodejs 做为中间层
  ![image-20221226180224058](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221226180224058.png)

* 操作数据库提供 API服务
* 实时聊天应用程序
* 不使用处理大量的业务逻辑

## Nodejs 实现 API服务

1. 安装依赖
   ```bash
   yarn add express ts-node 
   ```

2. 初始化 tsconfig文件
   ```bash
   tsc --init
   ```

3. 编写 server.js 代码
   ```ts
   import express from "express";
   import { Store } from "./data";
   
   const app = express();
   
   app.get("/test", (req, res) => {
     res.json(Store.list);
   });
   
   app.listen(8888, () => {
     console.log("GodX------>log服务已启动。。。");
   });
   
   ```

4. Data.ts
   ```ts
   import list from "./list.json";
   
   export class Store {
     static list = list;
   }
   
   ```

5. List.json
   ```json
   [
     {
       "name": "zx",
       "age": 18
     },
     {
       "name": "lisi",
       "age": 19
     }
   ]
   
   ```

6. 修改 tsconfig配置，支持引入 json 文件

   ![image-20221227164940641](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221227164940641.png)

7. 启动服务，访问 localhost:8888/test
   ```bash
   yarn ts-node ./server.js
   ```

## node 全局对象

* Global 的根本作用就是做为宿主
* 全局对象可以看作是全局变量的宿主，比如 window（全局对象）和 alert（全局变量）
* filename：返回正在执行脚本文件的绝对路径
* dirname：返回正在执行脚本所在目录
* timer类函数：执行顺序与事件循环间的关系
* process：提供与当前进程互动的接口
* require：实现模块的加载
* module、 exports： 处理模块的导出

```js
console.log("GodX------>log", __filename);

console.log("GodX------>log", __dirname);

console.log("GodX------>log", global);
// 默认情况 this 是空对象
console.log("GodX------>log", this);

console.log("GodX------>log", this == global); // false

(function () {
  console.log("GodX------>log", this == global); // true
})();
```

## process

* 无需 require 直接使用
* 获取进程信息
* 执行进程操作

**获取一些信息**

```js
// 内存
console.log("GodX------>log", process.memoryUsage());
//   rss: 25731072, 常驻内存
//   heapTotal: 4481024, 堆区（总大小）
//   heapUsed: 2811608, 实际使用的内存大小
//   external: 911362, 扩展内存（底层模块 C/C++ 占用内存）
//   arrayBuffers: 9898 缓存区大小

// cpu
console.log("GodX------>log", process.cpuUsage());
// user: 36915, 用户
// system: 8312 操作系统

// 运行目录
console.log("GodX------>log", process.cwd());

// node 环境
console.log("GodX------>log", process.version);
console.log("GodX------>log", process.versions);

// cpu 架构
console.log("GodX------>log", process.arch);

// 用户环境
console.log("GodX------>log", process.env.NODE_ENV); // 环境变量
console.log("GodX------>log", process.env.PATH); // 系统环境变量
console.log("GodX------>log", process.env.USERPROFILE); // 用户管理员目录(Windows 平台)
console.log("GodX------>log", process.env.HOME); // 用户管理员目录(MAC 平台)

// 系统平台
console.log("GodX------>log", process.platform);

// 运行状态：启动参数、PID、运行时间
console.log("GodX------>log", process.argv);
console.log("GodX------>log", process.argv0); // 快捷操作：第一个
console.log("GodX------>log", process.execArgv); // 用户传入的参数 --params
console.log("GodX------>log", process.pid); // ppid

setTimeout(() => {
  console.log("GodX------>log", process.uptime()); // 当前文件运行时间
}, 3000);

```

**事件**

```js
process.on("beforeExit", (code) => {
  console.log("GodX------>logbeforeExit", code);
});

process.on("exit", (code) => {
  console.log("GodX------>logexit", code);
  // exit 中不能够书写异步代码，会被自动忽略
  setTimeout(() => {
    console.log("GodX------>log", 123);
  }, 1000);
});

process.exit(); // 手动退出程序

console.log("GodX------>logfinish"); // 同步代码优先执行
```

```js
// stdout-输出

console.log = function (data) {
  process.stdout.write("---" + data + "\n");
};
console.log("GodX------>log11");
console.log("GodX------>log22");

const fs = require("fs");
var filename = __dirname + "/test.txt";
fs.createReadStream(filename).pipe(process.stdout);

// stdin-输入

process.stdin.pipe(process.stdout); // 复制控制台输入并输出

// 对用户输入二次处理
process.stdin.setEncoding("utf-8");
process.stdin.on("readable", () => {
  let chunk = process.stdin.read();
  if (chunk != null) {
    process.stdout.write("data" + chunk);
  }
});

```





