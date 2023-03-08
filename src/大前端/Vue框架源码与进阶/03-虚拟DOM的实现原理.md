---
title: 虚拟DOM的实现原理
order: 2
category:
  - 前端
tag:
  - vue	
---

## 目标

* 了解什么是虚拟DOM，以及虚拟DOM的作用
* Snabbdom 的基本使用
* Snabbdom 的源码解析

## 什么是 Virtual DOM

本质上是以 `JavaScript` 对象形式存在的对 `DOM` 的描述，如下：

```js
{
	sel: "div"，
	data: {},
	children: undefined,
	text:"Hello Virtual DOM",
	elm: undefined,
	key: undefined
}
```

:::info

**真实 DOM**

为文档对象模型，是一个结构化文本的抽象，在页面渲染出的每一个结点都是一个真实`DOM`结构，如下：

![img](https://camo.githubusercontent.com/02f62eb8d436564e96046444e697147b772e6569ae8569cb3143efb434e6bd20/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f66633762613864302d643330322d313165622d383566362d3666616337376330633962332e706e67)

:::

## 为什么要使用虚拟DOM

* 虚拟 DOM 可以维护视图和状态的关系，跟踪上一次的状态
* 复杂视图情况下提升渲染性能
* 通过比较前后两次状态差异更新真实DOM，最小化找出差异的性能消耗
* 跨平台
  * 浏览器平台渲染 DOM
  * 服务端渲染 SSR （Nuxtjs / Nextjs）
  * 原生应用（Weex / React Native）
  * 小程序（mpvue / uni-app）等

## 虚拟 DOM 库

* Snabbdom
  * vue 2.x 内部使用的虚拟 DOM 就是改造的 Snabbdom
  * 源代码不多
  * 通过模块可扩展
  * 源码使用 ts 开发
  * 最快的 虚拟 DOM 之一
* virtual-dom
  * 最早的 虚拟 DOM 之一

## Snabbdom 的基本使用

**看文档的意义**

* 学习任何一个库都要先看文档
* 通过文档了解库的作用
* 看文档中提供的示例，自己快速实现一个 demo
* 通过文档查看 API 的使用

```js
import { init, h, styleModule, eventListenersModule } from "snabbdom";

const patch = init([styleModule, eventListenersModule]);

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
let vnode = h("div", [
  h("h1", { style: { color: "red" } }, "文本"),
  h("button", { on: { click: test }, style: { cursor: "pointer" } }, "按钮")]);
function test() {
  console.log("GodX------>log");
}
let app = document.querySelector("#app");
// 第一个参数：旧的 VNode，可以是 DOM 元素
// 第二个参数：新的 VNode
// 返回新的 VNode
patch(app, vnode);

```

## Snabbdom 源码解析

### 如何学习源码

* 宏观了解
* 带着目标看源码
* 看源码的过程要不求甚解
* 调试
* 参考资料

### Snabbdom 的核心

* init 设置模块，创建 patch 函数
* 使用 h 函数创建 js 对象（VNode）描述真实 DOM
* patch 比较新旧两个 VNode
* 把变化的内容更新到真实 DOM 树

### h 函数

* 作用：处理参数，调用 vnode 函数创建一个 vnode 对象返回

* vue 中的 h 函数（功能更加强大，支持组件机制）
  ```js
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  ```

**函数重载（前置知识）**

会根据调用参数的个数和类型去判断执行哪个函数，如下：

*参数个数重载*

![image-20221208154031789](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221208154031789.png)

*参数类型重载*

![image-20221208154116764](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221208154116764.png)

:::info

* 参数个数或参数类型不同的函数
* JS  中没有重载的概念
* TS 中有重载，不过重载的实现还是要通过代码调整参数

:::

### VNode

用来描述真实 DOM

```js
export function vnode(
  // 选择器
  sel: string | undefined,
  // 模块数据
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | DocumentFragment | Text | undefined
): VNode {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
```

### VNode 渲染成真实 DOM（patch）整体过程分析

* `path(oldVNode,newVNode)`
* 把新节点中变化的内容渲染到真实 DOM，最后返回新节点作为下一次处理的旧节点
* 对比新旧 VNode 是否相同节点（节点的 Key 和 sel 相同）
* 如果不是相同节点，删除之前的内容，重新渲染
* 如果是相同节点，再判断新的 VNode 是否有 text，如果有并且和 oldVNode 的 text 不同，直接更新文本内容
* 如果新的 VNode 有 children，判断子节点收否有变化

### init

是一个高阶函数，缓存模块、domApi 和 配置参数，返回一个 patch 函数

```js
export default init(
    modules: Array<Partial<Module>>,
  	domApi?: DOMAPI,
  	options?: Options
) {
  ...
  return function path;
}
```

### patch

**作用**

对比新旧虚拟节点的差异，将差异更新到真实 DOM中，并返回一个新的 VNode 作为下个 path 函数的旧虚拟节点的参数

### patchVnode

![image-20221216135703040](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221216135703040.png)
