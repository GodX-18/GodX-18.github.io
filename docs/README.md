# HTML

## 如何理解HTML语义化？

![image-20210928213148714](https://i.loli.net/2021/09/28/vtFBolJG19Y3U5n.png)

> * 让人更容易读懂（增加代码可读性）
> * 让搜索引擎更容易读懂（SEO）

## 有哪些块级元素内联元素？

> 行内元素：　　
>
> - 与其他行内元素并排
> - 不能设置宽高，默认的宽度就是文字的宽度
> - 例如：span/img/input/button等
>
> 块级元素：
>
> - 霸占一行，不能与其他任何元素并列。
> - 能接受宽高，如果不设置宽度，那么宽度将默认变为父级的100%。
> - 例如：div/h1/h2/table/ul/ol/p

# CSS

## 盒模型宽度计算

如下代码，请问 *div* 的 *offsetWidth* 是多大 ？

```css
div {
    width:100px;
   	margin:10px;
    padding:10px;
    border:1px solid red;
}
```

> **知识点**
>
> * *offsetWidth* = (内容宽度 + 内边距 + 边框)，无外边距
> * *盒模型*
>   * W3C盒模型
>     width 指的是盒模型中内容的宽度
>   * IE盒模型
>     width 指的是 offsetWidth 
>
> **补充**
>
> * 如果给元素加了 *box-sizing: border-box;* 属性,那么width所指的宽度就是 *offsetwidth* 的宽度
>
> **答案**
>
> 100px + (10 + 1) * 2 = 122px

## margin 纵向重叠问题

![image-20210929115336325](https://i.loli.net/2021/09/29/ZesUYxyf2EqaXiC.png)

> **知识点**
>
> * 相邻元素的 margin-top 和 margin-bottom 会发生重叠
> * 空白内容的 <p></p> 也会重叠 
>
> **答案**
>
> 15px

## margin 负值问题

> * margin-top 和 margin-left 负值,元素向上和向左移动
> * margin-right 负值,右侧元素左移,自身不受影响
> * margin-bottom 负值, 下方元素上移,自身不受影响

## BFC的理解与应用

> **什么是BFC？**
>
> * BFC即块级格式化上下文，它既不是一个CSS属性，也不是一段代码，而是CSS2.1规范中的一个概念，决定元素的内容如何渲染以及其他元素的关系和交互。
> * 可以将BFC想象成一个箱子，BFC中的内容就相当于箱子中的物品，将物品摆放在箱子中，能避免与其他箱子中的物品混淆，还能保护它们不被破坏。
>
> **BFC的五条规则**
>
> * BFC有隔离作用，内部元素不会受外部元素的影响
> * 一个元素只能存在于一个BFC中，如果能同时存在与两个BFC中，那么就违反了BFC隔离的规则。
> * BFC中元素按正常流排列，元素之间的间隙有元素的外边距（margin）控制。
> * BFC中的内容不会与外面的浮动元素重叠。
> * 计算BFC的高度，需要包括BFC内的浮动子元素的高度。
>
> **如何创建BFC?**
>
> * 根元素，也就是html元素。
> * float属性不为none的浮动元素。
> * position 属性是 absolute 或 fixed 的定位元素。
> * display 属性为 inline-block、table-cell、table-caption、flex 或 inline-flex 的元素。
>
> **BFC的用途？**
>
> * 清除浮动
>
>   ```html
>   <!DOCTYPE html>
>   <html lang="en">
>   <head>
>       <meta charset="UTF-8">
>       <meta http-equiv="X-UA-Compatible" content="IE=edge">
>       <meta name="viewport" content="width=device-width, initial-scale=1.0">
>       <title>Document</title>
>   </head>
>   <body>
>       <div class="ff">
>           <div class="aa">444</div>
>       </div>
>       <span class="bb">6666</span>
>   </body>
>   </html>
>   <style>
>       .ff {
>           overflow: hidden; // 给父盒子添加BFC
>       }
>       .aa {
>           width: 100px;
>           height: 100px;
>           background-color: pink;
>           float: left;
>       }
>   
>   </style>
>   ```
>
> * 解决外边距塌陷
>
>   ```js
>   <!DOCTYPE html>
>   <html lang="en">
>   <head>
>       <meta charset="UTF-8">
>       <meta http-equiv="X-UA-Compatible" content="IE=edge">
>       <meta name="viewport" content="width=device-width, initial-scale=1.0">
>       <title>Document</title>
>   </head>
>   <body>
>       <div class="a"></div>
>       <div class="b">
>           <div class="c"></div>
>       </div>
>   </body>
>   <script>
>   </script>
>   </html>
>   <style>
>     .a {
>       width: 100px;
>       height: 100px;
>       background-color: #ccc;
>       margin-bottom: 10px;
>     }
>     .b {
>         margin-top: 20px;
>         height: 100px;
>         background-color: pink;
>         /* overflow: hidden; */
>     }
>     .c {
>       margin-top: 20px;
>         height: 80px;
>         background-color: skyblue;
>     }
>   
>   </style>
>   ```
>
> * 宽度自适应的两栏布局
>
>   ```js
>   <!DOCTYPE html>
>   <html lang="en">
>   <head>
>       <meta charset="UTF-8">
>       <meta http-equiv="X-UA-Compatible" content="IE=edge">
>       <meta name="viewport" content="width=device-width, initial-scale=1.0">
>       <title>Document</title>
>   </head>
>   <body>
>       <div class="a"></div>
>       <div class="b"></div>
>   </body>
>   <script>
>   </script>
>   </html>
>   <style>
>     .a {
>       float: right;
>       width: 100px;
>       height: 100px;
>       background-color: #ccc;
>     }
>     .b {
>         height: 100px;
>         background-color: pink;
>         /* overflow: hidden; */
>     }
>           
>   </style>
>   ```

## float 布局

> **圣杯布局和双飞翼布局**
>
> * 效果
>   * 三栏布局，中间一栏最先加载和渲染（内容最重要）
>   * 两侧内容固定，中间内容随着宽度自适应
>   * 一般用于PC网页
> * 技术要点
>   * 使用float布局
>   * 两侧使用 margin 负值，以便和中间的内容横向重叠
>   * 防止中间的内容被两侧覆盖，圣杯用padding，双飞翼用margin
>
> ![圣杯布局](https://i.loli.net/2021/10/06/EVHo345h7nGjm6f.gif)
>
> **圣杯布局**
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>圣杯布局</title>
> </head>
> 
> <body>
>     <div id="hd">header</div>
>     <div id="bd">
>         <div id="middle">middle</div>
>         <div id="left">left</div>
>         <div id="right">right</div>
>     </div>
>     <div id="footer">footer</div>
> </body>
> 
> </html>
> 
> <style>
>     #hd {
>         width: 100%;
>         height: 100px;
>         background-color: #ccc;
>     }
> 
>     #bd {
>         overflow: hidden;
>         padding: 0 100px;
>     }
> 
>     #middle {
>         float: left;
>         width: 100%;
>         height: 100px;
>         background-color: pink;
>     }
> 
>     #left {
>         float: left;
>         height: 100px;
>         width: 100px;
>         background-color: hotpink;
>         margin-left: -100%;
>         position: relative;
>         left: -100px;
>     }
> 
>     #right {
>         float: left;
>         height: 100px;
>         width: 100px;
>         background-color: rgb(42, 189, 226);
>         margin-left: -100px;
>         position: relative;
>         right: -100px;
>     }
> 
>     #footer {
>         width: 100%;
>         height: 100px;
>         background-color: rgb(29, 202, 136);
>     }
> </style>
> ```
>
> **双飞翼布局**
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>双飞翼</title>
> </head>
> 
> <body>
>     <div id="hd">header</div>
>     <div id="middle">
>         <div id="inside">
>             middle
>         </div>
>     </div>
>     <div id="left">left</div>
>     <div id="right">right</div>
>     <div id="footer">footer</div>
> </body>
> <style>
>     #hd,
>     #footer {
>         /* 清除浮动 */
>         clear: both;  
>         width: 100%;
>         background-color: hotpink;
>         height: 100px;
>     }
> 
> 
>     #middle {
>         float: left;
>         width: 100%;
>         height: 100px;
>         background-color: rgb(34, 207, 178);
>     }
> 
>     #inside {
>         margin: 0 100px;
>         height: 100px;
>     }
> 
>     #left {
>         float: left;
>         width: 100px;
>         height: 100px;
>         margin-left: -100%;
>         background-color: pink;
>     }
> 
>     #right {
>         float: left;
>         width: 100px;
>         height: 100px;
>         margin-left: -100px;
>         background-color: skyblue;
>     }
> </style>
> </html>
> ```

## 手写 clearfix(清除浮动)

> ```css
>  .clearfix:after {
>      content: '';
>      display: table;
>      clear:both;
>  }
> 	.clearfix {
>  	*zoom: 1; /* 兼容 IE 低版本 */
> 	}
> ```

## flex 布局

> * 常用语法
>
>   * flex-direction
>   * justify-cotent
>   * align-self
>   * align-items
>   * flex-wrap
>
> * ![image-20211007092353241](https://i.loli.net/2021/10/07/cM1TPH6nQsFgyBp.png)
>
>   ```html
>   <!DOCTYPE html>
>   <html lang="en">
>   <head>
>       <meta charset="UTF-8">
>       <meta http-equiv="X-UA-Compatible" content="IE=edge">
>       <meta name="viewport" content="width=device-width, initial-scale=1.0">
>       <title>Document</title>
>   </head>
>   <body>
>       <div class="box">
>           <div class="item"></div>
>           <div class="item"></div>
>           <div class="item"></div>
>       </div>
>   </body>
>   <style>
>       .box{
>           display: flex;
>           justify-content: space-between;
>           height: 50px;
>           width: 50px;
>           outline: 1px solid black;
>       }
>       .item{
>           width: 10px;
>           height: 10px;
>           border-radius: 50%;
>           background-color: #000;
>       }
>           
>       .item:nth-child(2) {
>           align-self: center;
>       }
>           
>       .item:nth-child(3) {
>           align-self: flex-end;
>       }
>  
>
>
>   </style>
>   </html>
>
>  
> 
>   ```

## absolute 和 relative 定位

> * relative 依据自身定位
> * absolute 依据最近一层的定位元素定位
>   * 定位元素：absolute、relative、fixed
>   * body

## 水平居中

* inline 元素 ：text-align ：center
* block 元素 ：margin：auto
* absolute 元素 ：left ：50% + margin-left 负值

![image-20211007102320821](https://i.loli.net/2021/10/07/xfhBrjqMWa2ZRlt.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="box1 box">
        <span>span</span>
    </div>
    <div class="box2 box">
        <div class='item'>block</div>
    </div>
    <div class="box3 box">
        <div class='item'>absolute</div>
    </div>

</body>
<style>
    .box {
        width: 100%;
        height: 100px;
        background-color: #ccc;
        margin-bottom: 20px;
    }
   .box1 {
       text-align: center;
   }
   .box2 .item {
       width: 500px;
       height: 100px;
       background-color: pink;
       margin: auto;
       text-align: center;
   }
   .box3 {
        position: relative;
   }
   .box3 .item {
       width: 100px;
       height: 100px;
       background-color: skyblue;
       position: absolute;
       left: 50%;
       margin-left: -50px ;
   }
</style>
</html>
```



## 垂直居中

* inline 元素：line-hight 的值等于height值
* absolute 元素 ：top:50% + margin-top 负值
* absolute 元素：transform（-50%,-50%)
* absolute 元素: top,left,bottom,right = 0 + margin : auto

![image-20211007140929066](https://i.loli.net/2021/10/07/pgmlK9r1OnUzFDv.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="box1 box">
        <span>span</span>
    </div>
    <div class="box2 box">
        <div class='item'>absolute1</div>
    </div>
    <div class="box3 box">
        <div class='item'>absolute2</div>
    </div>
    <div class="box4 box">
        <div class='item'>absolute3</div>
    </div>
</body>
<style>
    .box {
        position: relative;
        width: 100%;
        height: 100px;
        background-color: #ccc;
        margin-bottom: 20px;
    }

    .box1 {
        text-align: center;
        line-height: 100px;
    }

    .box2 .item {
        position: absolute;
        width: 100px;
        height: 50px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -25px;
        background-color: pink;
        text-align: center;
    }

    .box3 .item {
        width: 100px;
        height: 50px;
        background-color: skyblue;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    }

    .box4 .item {
        width: 500px;
        height: 50px;
        background-color: skyblue;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin:auto
    }
</style>
</html>
```

## line-height 如何继承

> * 写具体数值，如30px，则直接继承
> * 写比例，如 2/1.5，则继承 比例 * 当前line-height 的值
> * 写百分比，如 200%，则继承父元素的line-height * 百分比 的值
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>Document</title>
> </head>
> <body>
>     <p>888888</p>
> </body>
> <style>
>     body {
>         font-size: 16px;
>         line-height: 3; // 60px
>         line-height: 50px; // 50px
>         line-height: 200%; // 32px
>     }
>     p {
>         background-color: pink;
>         font-size:20px;
>     }
> </style>
> </html>
> ```

## CSS响应式

### rem 是什么

> * rem 相对长度单位，相对于根元素，常用于响应式布局
> * em 相对长度单位，相对于父元素，不常用
> * px 绝对长度单位，最常用

![响应式](https://i.loli.net/2021/10/07/lb2iavMOJqNIESm.gif)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式</title>
</head>
<body>
    <p>8888888</p>
</body>
<style>
    @media only screen and (max-width:374px){
        html {
            font-size:100px
        }
    }
    @media only screen and (min-width:375px) and (max-width:413px) {
        html {
            font-size: 150px;
        }
    }
    @media only screen and (min-width:414px){
        html {
            font-size: 200px;
        }
    }
    p {
        font-size: 0.16rem;
    }
</style>
</html>
```

### vw/vh

> **rem的弊端**
> 像素跨度较大，如果针对每一个像素设置响应式太麻烦
>
> **网页视口尺寸**
>
> ![image-20211007164755528](https://i.loli.net/2021/10/07/zcLsQOaA8fbUYJZ.png)
>
> * window.screen.height // 屏幕高度
> * window.innerHeight  // 网页视口高度
> * document.body.clientHeight // body 高度
>
> **vw/vh**
>
> * vh：网页视口高度的 1/100 （window.innerHeight）
> * vw: 网页视口宽度的 1/100 （window.innerWidth）
> * vmax: 取两者最大值；vmin取两者最小值

## CSS3动画

> * 并不是面试的重点，除非你面试的是一个专门做动画的职位

# JS

## 运行机制

## 闭包

## this

## 原型和原型链

## ES6

> * 开发环境已经普及使用
> * 浏览器环境却只支持不好（需要开发环境编译）
> * 内容很多，重点了解常用语法
> * 面试：开发环境的使用 + 重点语法的掌握

### Promise

**自我理解**

> 

**知识点**

> 

**使用场景**

> 

**代码演示**

> ```js
> 
> ```

**常见问题**

> 

### ?.、??.、??=

**[?（可选链）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)**

> **自我理解**
>
> 当你要读取一个对象中的属性，如果这个对象不存在或者等于 `null` 时，控制台就会报错。而可选链的作用就是让控制台不报错，并且返回一个 `undefined` 给你。
>
> **使用场景**
>
> 当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。
>
> **代码演示**
>
> ```js
> let a = obj?.b;  // a的值为undefined
> ```

[**??(空值合并运算符)**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

> **自我理解**
>
> 与 `||` 操作符类似，不同之处在于，只有在左侧的操作数为`falsy值（虚值）` 中的  `undefined` 和 `null` 时，才会读取右侧的操作数；而 `||` 在左侧操作数只要为  `falsy值（虚值）`，就会读取右侧的操作数。
>
> **使用场景**
>
> 当你判断布尔值的依据只为`falsy值（虚值）` 中的  `undefined` 和 `null` 时，可以采用 `??` 操作符。
>
> **JavaScript 中只有 8 个 falsy 值**
>
> | `false`                                                      | [false](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Future_reserved_keywords_in_older_standards) 关键字 |      |
> | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
> | 0                                                            | 数值 [zero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) |      |
> | -0                                                           | 数值 负 [zero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) |      |
> | 0n                                                           | 当 [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 作为布尔值使用时, 遵从其作为数值的规则. `0n` 是 *falsy* 值. |      |
> | "", '', ``                                                   | 这是一个空字符串 (字符串的长度为零). JavaScript 中的字符串可用双引号 `**""**`, 单引号 `''`, 或 [模板字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) **````** 定义。 |                                                              |      |
> | [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) - 缺少值 |      |
> | [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined) | [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) - 原始值 |      |
> | [NaN](https://developer.mozilla.org/zh-CN/docs/Glossary/NaN) | [NaN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)- 非数值 |      |
>
> **代码演示**
>
> ```js
> let a =0;
> let c = null;
> console.log(a??"cheng"); 0
> console.log(c??"cheng"); "cheng"           
> ```

**[??=(逻辑空赋值)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)**

> **自我理解**
>
> 当左侧操作数为 `null` 或者 `undefined` 时，才会进行赋值操作；
>
> **使用场景**
>
> 当需要被赋值的变量为`null` 或者 `undefined`时才会进行赋值操作。
>
> **代码演示**
>
> ```js
> let a ="cheng";
> let b = null;
> let c = NaN;
> c ??= a;
> console.log(b); // NaN
> console.log(c); // cheng
> ```


### [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

**自我理解**

> `Proxy`的字面意思为代理，在JS中，使用`Proxy`可以自己定义目标对象的增删改查操作，这相当于针对对象的 `.` 运算符进行了重载，即用自己的定义覆盖了语言的原始定义。

**常见问题**

> **对比于 `Object.defineProerty()` 有哪些优点**
>
> * Proxy 可以监视到读写以外的其他操作
>
>   ```js
>   const person = {
>     name: 'zce',
>     age: 20
>   }
>           
>   const personProxy = new Proxy(person, {
>     deleteProperty (target, property) {
>       console.log('delete', property)
>       delete target[property]
>     }
>   })
>           
>   delete personProxy.age // delete age
>   console.log(person) // { name: 'zce' }
>   ```
>
> 
>
> * Proxy 可以很方便的监视数组操作
>
>   ```js
>   const list = []
>   
>   const listProxy = new Proxy(list, {
>     set (target, property, value) {
>       console.log('set', property, value)
>       target[property] = value
>       return true // 表示设置成功
>     }
>   })
>   
>   listProxy.push(100); 
>   // set 0 100
>   // set length 1
>   console.log(listProxy); // [100]
>   ```
>
> * Proxy 不需要侵入对象
>
>   ```js
>   // Object.definePorerty需要侵入对象 =================================================
>   const person = {}
>           
>   Object.defineProperty(person, 'name', {
>     get () {
>       console.log('name 被访问')
>       return person._name
>     },
>     set (value) {
>       console.log('name 被设置')
>       person._name = value
>     }
>   })
>   Object.defineProperty(person, 'age', {
>     get () {
>       console.log('age 被访问')
>       return person._age
>     },
>     set (value) {
>       console.log('age 被设置')
>       person._age = value
>     }
>   })
>           
>   person.name = 'jack' 
>   // name 被设置
>           
>   console.log(person.name)
>   // name 被访问
>   // jack
>           
>   // 使用Proxy更为合理 =========================================================
>   const person2 = {
>     name: 'zce',
>     age: 20
>   }
>           
>   const personProxy = new Proxy(person2, {
>     get (target, property) {
>       console.log('get', property)
>       return target[property]
>     },
>     set (target, property, value) {
>       console.log('set', property, value)
>       target[property] = value
>     }
>   })
>           
>   personProxy.name = 'jack'
>   // set name jack
>           
>   console.log(personProxy.name)
>   // get name
>   // jack
>   ```
>
> 

**使用场景**

> 主要用于修改某些操作的默认行为

**代码演示**

> ```js
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
>  <meta charset="UTF-8">
>  <meta http-equiv="X-UA-Compatible" content="IE=edge">
>  <meta name="viewport" content="width=device-width, initial-scale=1.0">
>  <title>proxy</title>
> </head>
> 
> <body>
>  <script>
>      const person = {
>          name: '小明',
>          age: 18
>      }
> 
>      const personProxy = new Proxy(person, {
>          get(target, property) {
>              console.log(target, property);
>              return 100;
>          },
>          set(target, property, value) {
>              console.log(target, property, value);
>          }
>      });
> 
>      console.log(personProxy.name); // { name: '小明', age: 18 } name 100
>      personProxy.age = 20; // { name: '小明', age: 18 } age 20
>  </script>
> </body>
> 
> </html>
> ```


### 箭头函数

**自我理解**

> 

**知识点**

> 

**使用场景**

> 

**代码演示**

> ```js
> 
> ```

### 模块化

**自我理解**

> 

**知识点**

> 

**使用场景**

> 

**代码演示**

> ```js
> 
> ```



### class

* Class在语法上更加贴合面向对象的写法
* Class实现继承更加易读、易理解
* 更易于写Java等后端语言的使用 
* 本质上是语法糖，使用 prototype

**自我理解**

> 

**实现原理**

> 

**使用场景**

> 

**代码演示**

> ```js
> 
> ```





# Vue

## 生命周期

## 组件通信

## 双向绑定

**自我理解**

> * Vue2.0中，通过Object.defineProperty来进行数据劫持
> * Vue3.0中，通过Proxy对目标对象进行代理

**实现原理**

[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

> `Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

**Proxy**

> 见目录

**使用场景**

> 数据和视图改变其中一个时，要求另一个也会发生改变

**代码演示**

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <script src="./learn.js"></script> -->
</head>

<body>
    <p id="content"></p>
    <br>
    <input type="text" id="inputs">
    <script>
        // vue2
        let obj = {
            a: 888
        };
        let newObj = JSON.parse(JSON.stringify(obj))
        Object.defineProperty(obj, "a", {
            get() {
                return newObj.a;
            },
            set(val) {
                if(val === newObj.a) return;
                newObj.a = val;
                observer(val)
            }
        });
		// vue3
		let obj = {};
        obj = new Proxy(obj, {
            get(target,key) {
                return target[key];
            },
            set(target,key,value) {
                target[key] = value;
                observer(value)
            }
        });
        function observer(e) {
            content.innerHTML = e
            inputs.value = e
        }
        // 修改数据改变视图
        setTimeout(() => {
            obj.a = 777;
        },2000)
        // 修改视图改变数据
        inputs.oninput = function() {
            console.log("普通函数",this); // this指向input实例
            obj.a = this.value
        }
    </script>
</body>

</html>
```



## 虚拟 DOM 与 diff 算法

**自我理解**

> 最小化页面重绘

**实现原理**

> 

**使用场景**

> 

**代码演示**

> ```js
> 
> ```

**常见问题**

> 

**参考链接**

* https://juejin.cn/post/6994959998283907102

* https://juejin.cn/post/6994959998283907102#heading-11

* https://mp.weixin.qq.com/s/XRR9afpujcjbgFZM0Zw6Gw



## 数据响应式原理

> https://segmentfault.com/a/1190000039803772#item-1-1

## nextTick


# React

# 构建工具

## Webpack

## Rollup

## Vite

# 第三方库

## 地图

## Echarts

# 性能优化

# Web 安全

# 算法

# 其它

## MVVM 和 MVC 的区别

## V8垃圾回收机制
> https://juejin.cn/post/6995706341041897486#heading-18


**自我理解**

> `MVC` 和 `MVVM` 的区别不大。`MVC` 只实现了数据更改，视图随之改变，并没有实现视图改变数据也随之改变。而 `MVVM` 实现了双向绑定。简单来说，`MVC` 是单向数据流，`MVVM` 是双向数据流。

## 从输入 URL 到页面展示到底发生了什么？

> [从输入 URL 到页面展示到底发生了什么？看完吊打面试官！ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/133906695)



# 模板

**自我理解**

> 

**实现原理**

> 

**使用场景**

> 

**代码演示**

> ```js
> 
> ```

**常见问题**

> 

**参考链接**

>