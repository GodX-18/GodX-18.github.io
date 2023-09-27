---
title: Vue
icon: vue
date: 2023-05-22
order: 4
category:
  - 面试
tag:
  - Vue
---

## Vue 的设计模式

### 介绍一下 MVVM 模式和 MVC 模式有什么区别？

MVVM 模式是一种软件架构设计模式，它将应用程序分为三个部分：模型（Model）、视图（View）和视图模型（ViewModel）。模型负责处理数据和业务逻辑，视图负责显示用户界面，视图模型负责连接视图和模型，并实现数据绑定和命令模式。MVVM 模式的目的是实现视图和模型的解耦，使代码更易于维护和测试。

MVC 模式也是一种软件架构设计模式，它将应用程序分为三个部分：模型（Model）、视图（View）和控制器（Controller）。模型负责处理数据和业务逻辑，视图负责显示用户界面，控制器负责接收用户输入并调用模型或视图进行响应。MVC 模式的目的是实现关注点的分离，使代码更具有可扩展性和可复用性。

MVVM 模式和 MVC 模式的主要区别有：

- MVVM 模式中，视图和模型之间没有直接的联系，而是通过视图模型进行交互。视图模型可以监听模型的变化，并自动更新视图。视图也可以通过命令或事件通知视图模型进行操作。这样实现了双向数据绑定，使得视图和模型保持同步。
- MVC 模式中，视图和模型之间可以有直接的联系，也可以通过控制器进行中介。控制器负责将用户输入转换为对模型或视图的操作。控制器也可以根据模型的变化更新视图。这样实现了单向数据流，使得控制器成为应用程序的核心。

MVVM 模式适合于需要处理复杂的用户界面和业务逻辑的应用程序，例如桌面应用程序或移动应用程序。MVVM 模式可以利用数据绑定框架或库来简化开发过程，例如 Vue.js, React.js, Angular.js 等。

MVC 模式适合于需要快速开发和部署的应用程序，例如 Web 应用程序或服务端应用程序。MVC 模式可以利用 Web 开发框架或工具来提高开发效率，例如 Spring MVC, ASP.NET MVC, Zend Framework, JSF 等。

## 生命周期

### Vue2 的生命周期有哪些

### keep-alive 中的生命周期有哪些

### 父子组件生命周期执行顺序

* 加载过程：父组件beforeCreate => 父组件created => 父组件beforeMount => 子组件beforeCreate => 子组件created => 子组件 beforeMount => 子组件mounted => 父组件mounted
* 更新过程：父组件beforeUpdate => 子组件beforeUpdate => 子组件updated => 父组件updated
* 销毁过程：父组件beforeDestroy => 子组件 beforeDestroy => 子组件 destoryed => 父组件 destoryed

### 平时发送异步请求在哪个生命周期，并解释原因

* 平时发送异步请求，我一般会在 created 生命周期中调用，因为这样可以更快地获取到服务端的数据，减少页面的 loading 时间，提高用户体验。
* 另外，如果我需要进行服务端渲染（SSR），那么在 created 中调用异步请求也有助于保持数据的一致性，因为 SSR 不支持 beforeMount 和 mounted 生命周期。
* 当然，如果我需要在异步请求之后进行一些 DOM 操作，那么我也可以在 mounted 生命周期中调用异步请求，但这样可能会导致页面的二次渲染。

### created 和 mouted 区别

created 和 mounted 是 Vue.js 中的两个生命周期钩子函数，它们分别用于在 Vue 实例被创建之后和挂载到 DOM 之后执行一些逻辑。具体区别和应用场景如下：

- created：
  - 在 Vue 实例被创建之后立即执行。
  - 在这个阶段，Vue 实例的数据观测和事件配置已完成，但尚未挂载到 DOM 上。
  - 通常在这个阶段执行一些数据初始化、事件监听、异步请求等逻辑，但不涉及 DOM 操作。例如，你可以在 created 中发送一个 Ajax 请求来获取数据，并将其赋值给 data 中的属性。

- mounted：
  - 在 Vue 实例挂载到 DOM 之后执行。
  - 在这个阶段，Vue 实例已经完成了数据观测、编译渲染、创建虚拟 DOM 和真实 DOM 等所有过程，可以进行 DOM 操作。
  - 通常在这个阶段执行一些需要依赖 DOM 元素的逻辑，如获取元素尺寸、绑定事件、设置定时器等。例如，你可以在 mounted 中使用 echarts 来绘制一个图表，并将其插入到某个元素中。


## 数据绑定

### 组件中的 data 为什么是一个函数？

### Vue 的双向数据绑定是如何实现的

### 为什么 Vue3 用 proxy 代替了 Vue2 中的 Object.defineProperty

### this.$set() 的用处及用法

### Vue 中的数据为什么频繁变化时只会更新一次

### this.$nextTick() 作用及实现原理

## 组件通信

### 父子组件通信

### 子组件可以直接改变父组件的值吗？

### 平行组件通信

### 什么是状态管理？为什么需要状态管理？

### mutations 能不能做异步

### 怎么解决刷新页面时，Vuex 中数据丢失的问题？

### Vuex 和 localStorage 的区别

## 虚拟 dom 和 diff 算法

### 什么是虚拟 dom ？有什么用？

### 虚拟 dom 的解析过程

### diff 算法

### Vue 中 key 的作用

### Vue2 和 Vue3中diff算法的区别

Vue2和Vue3的diff算法有一些区别，主要有以下几点：

* Vue2使用双向指针来进行虚拟DOM的比较，而Vue3则使用了单向链表的方式。这样可以减少不必要的比较次数，提高性能。
- 在计算key值不同时，Vue2会采用首尾两端比较的方法，而Vue3则采用了更高效的“Map”数据结构。这样可以避免在乱序情况下进行暴力比对，减少移动节点的操作。
- Vue3还对diff算法进行了一些优化，如静态提升、长列表优化、动态组件优化等，可以更好地处理特定的场景，提高应用的性能和响应速度。
- Vue3还增强了异步更新控制，通过更细粒度的控制更新的优先级和批量更新，避免了不必要的更新操作，从而减少了diff算法的运行时间。

## Vue2 和 Vue3的区别

### 生命周期

### diff 算法

### 数据响应式原理

### 组件通信

## 标签和属性

### v-if 和 v-show 的区别

### v-if 和 v-for 哪个优先级更高

### slot（插槽）的作用

### computed（计算属性）和 watch（监听属性）的区别

## 路由

### Vue 实现路由跳转的方法

### 路由的 hash 模式和 history 模式的区别

## 原理

### vue 如何实现响应式

Vue是采用数据劫持结合发布者-订阅者模式的方式, Vue相应系统有三大核心：observe,dep,watcher;

* Observe：当一个Vue实例创建时，initData阶段，vue会遍历data选项的属性（observe），用 Object.defineProperty 将它们转为 getter/setter并且在内部追踪相关依赖(dep)，在属性被访问和修改时通知变化。
* Compite：调用compile方法解析模版,当视图中有用到vue.data中数据的时候，会调用实例化watcher方法进行依赖收集
* Watcher：是Observer和Compile之间通信的桥梁，当视图中遇到绑定的数据时,在watcher方法中会获取这个数据，此时会触发observe中的getter方法
* Dep：发布订阅模式,observe中数据的getter被触发时会收集依watcher(dep.depend方法)
* 当有数据被改动时会触发observe中数据的setter，此时会调用dep.notify方法给所有订阅的watcher发通知（通过回掉方式）进行视图更新，此

### $nextTick

vue实现响应式并不是数据一更新就立刻触发dom变化，而是按照一定的策略对dom进行更新，[源码位置](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js#L42)，原理：

* 首先会将所有的nextTick放到一个函数中，然后放在callbacks数组中，$nextTick没有传cb回调，则返回一个promise
* 接下来就是callbacks的执行时机
  * 首先如果浏览器是否兼容promise，则用promise.resolve().then来执行callbacks
  * 如果浏览器兼容MutationObserver,则用实例化的MutationObserver监听文本变化来执行回调
  * 如果兼容setImmediate,则用setImmediate(cb)来执行回掉
    最后降级为用setTimeout(fn,0)来执行
  * 在vue2.5.X版本中对于像v-on这样的DOM交互事件，默认走macroTimerFunc，也就是，跳过第一步promise的判断

### Computed

* vue对象初始化的同时对计算属性进行初始化initComputed
* computed会初始化Watcher实例，并在内实例化一个Dep消息订阅器用作后续收集依赖
* 当视图中有对computed引用的时候会第一次执行计算属性，调用watcher的evaluate方法，将dirty设置为false,并将结果保存在this.value中进行缓存
* 如果依赖没有更改，则下次获取computed会这直接返回this.value
  当computed所依赖的属性发生变化时会调用watcher的update方法将dirty设置为true，下次调用computed时就会重新计算

```js
class Watcher{
  ……
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }
  ……
}

class initComputed{
  …… 
  //计算属性的getter 获取计算属性的值时会调用
	createComputedGetter (key) {
	  return function computedGetter () {
	  	//获取到相应的watcher
	    const watcher = this._computedWatchers && this._computedWatchers[key]
	    if (watcher) {
	    	 //watcher.dirty 参数决定了计算属性值是否需要重新计算，默认值为true，即第一次时会调用一次
	      	if (watcher.dirty) {
	      		/*每次执行之后watcher.dirty会设置为false，只要依赖的data值改变时才会触发
	      		watcher.dirty为true,从而获取值时从新计算*/
	        	watcher.evaluate()
	      	}
	      	//获取依赖
	      	if (Dep.target) {
	        	watcher.depend()
	      	}
	      	//返回计算属性的值
	      	return watcher.value
	    }
	  }
	}
  ……
}
```

### watch

## 开放性问题

### 说说 Vue 的优缺点

### Vue 模板编译原理

### 说一说 Vue 的性能优化

Vue 的性能优化是一个很重要的话题，它涉及到 Vue 应用的页面加载速度和更新速度两个方面。为了提高 Vue 的性能，我们可以从以下几个方面进行优化：

- 代码优化：我们可以通过以下方法来减少代码量和提高代码质量：
  - 使用模块化和组件化的方式来组织代码，避免重复和冗余的代码，提高代码的复用性和可维护性。
  - 使用 v-if 和 v-for 时注意避免不必要的渲染，给每个 v-for 的元素设置唯一的 key 值，提高 diff 算法的效率。
  - 使用 computed 属性和 watch 选项来优化数据的计算和监听，避免在模板中使用复杂的表达式和过滤器。
  - 使用事件代理的方式来处理多个元素的事件绑定，减少事件监听器的数量。
  - 使用 keep-alive 组件来缓存不活动的组件，避免重复渲染。
  - 使用异步组件和路由懒加载的方式来实现按需加载，减少首屏加载时间。
  - 使用自定义指令和插件来封装常用的功能，提高代码的可读性和可扩展性。
- 资源优化：我们可以通过以下方法来压缩和优化静态资源，如图片、字体、CSS 和 JS 文件：
  - 使用 Webpack 等打包工具来进行代码压缩、Tree-shaking、Scope Hoisting 等优化操作，减少打包后的文件体积。
  - 使用 CDN 来存储和分发静态资源，提高资源的加载速度和可用性。
  - 使用图片懒加载的方式来延迟加载图片，减少网络请求和内存占用。
  - 使用 SVG 图标来替代图片图标，提高图标的清晰度和灵活性。
  - 使用字体子集或 Web 字体加载器来优化字体文件的加载，减少字体文件的体积和阻塞时间。
- 架构优化：我们可以根据应用的类型和需求来选择合适的架构方式，如 SSR、SSG、SPA 等，以提高应用的页面加载速度和用户体验：
  - 如果应用对 SEO 和首屏加载性能有较高的要求，可以使用 SSR（服务器端渲染）或 SSG（静态站点生成）的方式来直接返回包含内容的 HTML 代码，避免客户端渲染带来的额外开销。
  - 如果应用对交互性和动态性有较高的要求，可以使用 SPA（单页应用）的方式来实现客户端渲染，提高应用的响应速度和灵活性。
  - 如果应用既需要 SEO 和首屏加载性能，又需要交互性和动态性，可以使用 SSR + SPA 的混合模式，或者使用预渲染、骨架屏等技术来提升用户体验。
