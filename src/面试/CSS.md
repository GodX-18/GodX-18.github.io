---
title: CSS
icon: CSS
date: 2023-05-22
order: 2
category:
  - 面试
tag:
  - CSS
---

## CSS 选择器及优先级

### 一、CSS选择器

CSS选择器用于定位和选择HTML文档中的元素，从而对这些元素应用样式。

**常见的CSS选择器包括：**

1. **标签选择器（Tag Selector）**

   通过标签名选取元素，例如：`div{}`表示选取所有的div元素。

2. **类选择器（Class Selector）**

   通过类名选取元素，例如：`.class{}`表示选取所有class属性为" class "的元素。

3. **id选择器（ID Selector）**

   通过id选取元素，例如：`#id{}`表示选取id属性为"id"的元素。

4. **子元素选择器（Child Selector）**

   选择某元素下的子元素，例如：`div>p{}`表示选取所有在div元素内的p元素。

5. **后代元素选择器（Descendant Selector）**

   选择某元素内的后代元素，例如：`div p{}`表示选取所有p元素，只要它们在div元素内部。

6. **相邻兄弟元素选择器（Adjacent Sibling Selector）**

   选择紧挨着某个元素后的同级元素，例如：`h1 + p`表示选取紧接在h1元素后面的第一个p元素。

7. **通用选择器（Universal Selector）**

   选取所有的元素，例如：`*{}`表示选取所有的元素。

### 二、CSS优先级

CSS优先级指的是在样式定义冲突的情况下，浏览器根据一定规则来判断哪些样式具有更高的优先级，从而决定最终的样式。

**CSS优先级的计算规则：**

1. 如果样式使用了!important规则，则该样式具有最高优先级；
2. 如果所有的样式都没有使用!important规则，则按照样式规则的特殊性（Specificity）计算；
3. 如果特殊性相同，则按照样式规则的出现顺序决定。

**特殊性的计算方法：**

下面列表中，选择器类型的优先级是递增的：

1. [类型选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors)（例如，`h1`）和伪元素（例如，`::before`）
2. [类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors) (例如，`.example`)，属性选择器（例如，`[type="radio"]`）和伪类（例如，`:hover`）
3. [ID 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors)（例如，`#example`）。
4. 给元素添加的**内联样式** (例如，`style="font-weight:bold"`) 总会覆盖外部样式表的任何样式，因此可看作是具有最高的优先级。
5. !important

在样式规则冲突的情况下，特殊性越高的样式具有更高的优先级，即特殊性值越大的样式会覆盖特殊性值小的样式。如果特殊性相同，则后定义的样式会覆盖先定义的样式。

:::tip

当在一个样式声明中使用一个 `!important` 规则时，此声明将覆盖任何其他声明。虽然，从技术上讲，`!important` 与优先级无关，但它与最终的结果直接相关。使用 `!important` 是一个**坏习惯**，应该尽量避免，因为这破坏了样式表中的固有的级联规则 使得调试找 bug 变得更加困难了。当两条相互冲突的带有 `!important` 规则的声明被应用到相同的元素上时，拥有更大优先级的声明将会被采用。

**通配选择符**（universal selector）（[`*`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)）**关系选择符**（combinators）（[`+`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator), [`>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator), [`~`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator), [" "](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator), [`||`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Column_combinator)）和 **否定伪类**（negation pseudo-class）（[`:not()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)）对优先级没有影响。（但是，在 `:not()` 内部声明的选择器会影响优先级）。

:::

## position 属性的值有哪些及其区别

* `static`：元素的默认值，不受定位影响，按照文档流正常排列。
* `relative`：相对定位，相对于元素原来所占据的位置进行偏移，不改变文档流布局，其偏移对其他元素位置无影响。
* `absolute`：绝对定位，相对于其最近的非 `static` 祖先元素绝对定位，如果没有这样的祖先元素，则相对于 `body`，不再占据文档流空间，其偏移对其他元素位置有影响。
* `fixed`：固定定位，相对于视口进行定位，即使页面滚动，其位置也不变，不占据文档流空间，其偏移对其他元素位置有影响。
* `sticky`：粘性定位，表现类似 `relative` 和 `fixed` 的混合形式，表示元素在跨越特定阈值前为相对定位，之后为固定定位。在兼容性方面存在一些问题。

区别在于所占据的位置、是否改变文档流、偏移基准。

## BFC（块级格式化上下文）

起到隔离样式的作用

## box-sizing 属性

## 盒子模型

## 怎么解决父元素高度塌陷

## 让一个元素水平垂直居中

## 隐藏页面中某个元素的方法

## 各种布局优缺点


## 清除浮动

## 伪类和伪元素

## transition

## CSS 的可继承性

## CSS 预处理器

## 行内元素/块级元素/空元素

## 媒体查询

## 三角形

## margin 纵向重叠问题

## margin 负值问题

## 浮动布局（圣杯/双飞翼）

## line-height 如何继承

## CSS3有哪些新特性