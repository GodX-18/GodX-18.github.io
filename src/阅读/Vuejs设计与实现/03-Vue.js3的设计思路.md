---
title: Vue3.js 的设计思路
icon: creative
order: 3
category:
  - 前端
tag:
  - vue
---

## 声明式地描述 UI

* Vue3 是一个声明式的框架，哪怕是事件都有与之对应的描述方式。用户不需要手写任何命令式代码
  * 使用与 HTML 标签一致的方式来描述 DOM 元素，例如描述一个 div 标签时可以使用 `<div></div>`
  * 使用与 HTML 标签一致的方式来描述属性，例如`<div id="app"></div>`
  * 使用 ：或者 v-bind 来描述动态绑定的属性
  * 使用 @ 或者 v-on 来描述事件
  * 使用与 HTML 标签一致的方式来描述层级结构
* h 函数是一个辅助创建虚拟 DOM 的工具函数，其作用就是让我们编写虚拟 DOM 变得更加轻松

## 初识渲染器

**虚拟DOM如何变成真实DOM并渲染到浏览器页面中？**

通过渲染器

**渲染器内部实现原理**

渲染器的工作原理很简单，归根结底，都是使用一些我们熟悉的DOM操作 API 来完成渲染工作

* 通过 document.createElement 创建元素
* 通过 addEventListtener 为元素添加事件
* 递归处理子节点（children）
* 挂载元素到目标节点上

> 对于渲染器来说，它需要精确地找到 vnode 对象的变更点并且只更新变更的内容，不需要每次都走一遍完整的创建元素流程，具体实现后面再分析。

## 组件的本质

**组件就是一组 DOM 元素的封装**，因为组件实际上也是由 DOM 元素组成的

```js
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello')
    },
    children: 'click me'
  }
}
```

可以定义用虚拟DOM 来描述组件

```js
const vnode = {
  tag: MyComponent
}
```

看一下渲染器内部是如何处理组件的

```js
function mountComponent(vnode, cotainer) {
  const subtree = vnode.tag()
  // 递归调用 renderer 渲染 subtree
  renderer(subtree,cotainer) 
}

function renderer(vnode,container) {
  if(typeof vnode.tag === 'string') {
    // 普通标签元素
    mountElement(vnode,container) 
  } else if(typeof vnode.tag === 'function') {
    // 如果tag是一个函数，说明 vnode 的描述的是组件
    mountComponent(vnode, container)
  }
}
```

## 模版的工作原理

**模版通过编译器工作**

编译器的作用其实就是将模版编译为渲染函数，例如给出如下模版：

```vue
<template>
	<div @click="handler">
    click me
  </div>
</template>

<script>
  export default {
    data() {},
    methods: {
      handler() {
        ...
      }
    }
  }
</script>
```

其中 template 标签里的内容就是模版内容，编译器会把模版编译成渲染函数并添加到 script 标签块的组件对象上，所以最终在浏览器中运行的代码就是：

```js
export default {
  data() {},
  methods: {
    handler() {
      ...
    }
    },
    render() {
      return h('div',{onClick: handler},'click me')
    }
  }
```

:::tip

无论是使用模版还是直接手写渲染函数，对于一个组件来说，它要渲染的内容最终都是通过渲染函数产生的，然后渲染器再把渲染函数返回的虚拟 DO M 渲染为真实 DOM，这就是模版的工作原理，也就是 Vue.js 渲染页面的流程

:::

## Vue.js 是各个模块组成的有机整体

编译器、渲染器都是 Vue.js 的核心组成部分，它们共同构成一个有机的整体，不同模块之间互相配合，进一步提升框架性能。

例如，在编译器工作时能够识别出哪些是静态属性，哪些是动态属性，在生成代码的时候可以附带这些信息：

```vue
<template>
	<div id="foo" :class="cls"></div>
</template>
```

告诉渲染器哪些是静态属性，哪些是动态属性，渲染器节省了寻找变更节点的工作量，从而提升了性能

```js
function render() {
  return {
    tag: 'div',
    props: {
      id: 'foo',
      class: cls
    },
    patchFlags: 1 // 假设 1 代表 class 是动态的
  }
}
```

