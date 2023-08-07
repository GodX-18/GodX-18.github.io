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

### 介绍一下 MVVM 模式，和 MVC 模式有什么区别？

## 生命周期

### Vue2 的生命周期有哪些

### keep-alive 中的生命周期有哪些

### 父子组件生命周期执行顺序

* 加载过程：父组件beforeCreate => 父组件created => 父组件beforeMount => 子组件beforeCreate => 子组件created => 子组件 beforeMount => 子组件mounted => 父组件mounted
* 更新过程：父组件beforeUpdate => 子组件beforeUpdate => 子组件updated => 父组件updated
* 销毁过程：父组件beforeDestroy => 子组件 beforeDestroy => 子组件 destoryed => 父组件 destoryed

### 平时发送异步请求在哪个生命周期，并解释原因

### created 和 mouted 区别

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
