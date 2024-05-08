---
title: JavaScript
icon: js
date: 2023-05-22
order: 3
category:
  - 面试
tag:
  - JavaScript
---

## JS 中的 8 种数据类型及区别

JavaScript 中有多种数据类型，它们在存储方式和特性上有所不同。让我们一起来了解这些数据类型：

1. **基本数据类型**：
    - **Number**（数字）：包括整数和浮点数。整数可以是十进制、八进制（以零开头）或十六进制（以0x开头）。浮点数必须包含小数点，也可以使用科学计数法表示。
    - **String**（字符串）：用双引号、单引号或反引号表示。字符串是不可变的，一旦创建，其值不会改变。
    - **Boolean**（布尔值）：只有两个字面值，即 `true` 和 `false`。
    - **Undefined**（未定义）：表示变量已声明但未初始化。
    - **null**（空值）：表示一个空对象指针。
    - **Symbol**（符号）：ES6 新增的原始值，用于确保对象属性的唯一性。

2. **引用数据类型**：
    - **Object**（对象）：使用对象字面量表示法，属性名可以是字符串或数值。
    - **Array**（数组）：有序的数据集合，每个槽位可以存储任意类型的数据。
    - **Function**（函数）：函数是对象，可以通过函数声明、函数表达式或箭头函数来创建。

3. **存储区别**：
    - 基本数据类型存储在**栈**中。
    - 引用数据类型的对象存储在**堆**中。
    - 基本类型的值是按值引用，而引用类型的值是按地址引用。

## 什么是 Symbol

## JS 中数据类型检测

## var/cosnt/let 三者之间的区别

## setTimeout/Promise/Async/Await 的区别

## 异步编程的发展历程

JavaScript 的异步编程经历了多个阶段，从最早的回调函数到现在的 `async/await`。让我们一起探讨一下这些阶段：

1. **回调函数 (Callbacks)**:

   - 回调函数是最早用于处理异步操作的方式之一。

   - 通过将函数作为参数传递给后台执行的其他函数，当后台代码执行完毕时，调用回调函数来通知工作已完成。

   - 优点：解决了同步问题，但存在回调地狱和错误处理复杂的问题。

   - 示例代码：

     ```javascript
     let readFile = (path, callBack) => {
       setTimeout(function() {
         callBack(path);
       }, 1000);
     };
     
     readFile('first', function() {
       console.log('first readFile success');
       readFile('second', function() {
         console.log('second readFile success');
         // ... more nested callbacks
       });
     });
     ```

2. **Promise**:

   - Promise 是一种代表异步操作的对象，可以将异步操作的成功返回值或失败原因与相应的处理程序关联起来。

   - 可以像同步方法一样返回值，避免了回调地狱。

   - 优点：状态改变后不再变，可读性较好。

   - 缺点：无法取消 Promise，无法得知进展状态。

   - 示例代码：

     ```javascript
     let readFile = (path) => {
       return new Promise((resolve, reject) => {
         setTimeout(() => {
           if (!path) {
             reject('error!!!');
           } else {
             console.log(path + ' readFile success');
             resolve();
           }
         }, 1000);
       });
     };
     
     readFile('first')
       .then(() => readFile('second'))
       .then(() => readFile('third'))
       // ... more chained promises
     ```

3. **Generator**:

   - Generator 函数是 ES6 中提供的一种异步编程解决方案。

   - 可以暂停和恢复执行，需要使用 `next()` 函数来继续执行下面的代码。

   - 优点：可以控制函数的执行，但流程管理不方便。

   - 示例代码：

     ```javascript
     var readFile = function(name, ms) {
       return new Promise((resolve, reject) => {
         setTimeout(() => {
           console.log(name + '读完了');
           resolve();
         }, ms);
       });
     };
     
     var gen = function* () {
       yield readFile('first', 1000);
       yield readFile('second', 2000);
       // ... more yield statements
       return '完成了';
     };
     
     var g = gen();
     g.next().value.then(() => g.next())
       .then(() => g.next())
       // ... more chained promises
     ```

4. **async/await**:

   - `async/await` 是 ES2017 引入的语法糖，使异步代码看起来像同步代码一样。
   - 可以使用 `try...catch` 来捕获错误。
   - 优点：可读性好，解决了回调地狱问题。
   - 缺点：无法取消异步操作。

## this 指向

我们要彻底掌握 this 指向问题，其实只要搞清楚**词法作用域**和**动态作用域**就可以了，下面我们来简单介绍一下：

* 词法作用域：函数的作用域在**函数定义**的时候就决定了。
* 动态作用域，函数的作用域是在**函数调用**的时候才决定的。

```js
// 词法作用域
var fullname = "a";
var obj = {
  fullName: "b",
  prop: {
    fullname: "c",
    getFullname: () => {
      // 箭头函数的 this 指向为外层的词法作用域，因为对象没有词法作用域所以指向其实就是全局作用域
      return this.fullname;
    }
  }
};
console.log(obj.prop.getFullname()); // a
// 函数在哪里调用没有关系，变量的位置在编译的词法分析阶段就确定了。
```

我们再将箭头函数改成普通函数：

```js
// 词法作用域
var fullname = "a";
var obj = {
  fullName: "b",
  prop: {
    fullname: "c",
    getFullname: function() {
      // 此时的 this 指向其实是 prop 对象
      return this.fullname;
    }
  }
};
console.log(obj.prop.getFullname()); // c
```

::: warning

* JavaScript 中其实只有词法作用域，并没有动态作用域。只是 this 的执行机制让作用域表现的像动态作用域(使用普通函数的时候)，this 的绑定是在代码执行的时候确定的。

* 箭头函数的 this 指向为外层的词法作用域

:::

## call/apply/bind 三者的区别

call、apply和bind是JavaScript中用于改变函数内部this指向的三种方法。

call和apply都是立即调用函数的方法，它们的作用是改变函数内部的this指向。它们的区别在于传入参数的方式不同，call是逐个传入参数，而apply是以数组的形式传入参数。

bind方法则是创建一个新的函数，并将原函数的this指向绑定到指定的对象。但是bind方法不会立即调用函数，而是返回一个新的函数，需要手动调用才会执行原函数。

## EventLoop 事件循环

在**JavaScript**中，**事件循环**是一种处理**异步操作**的机制。它让我们能够在代码执行过程中处理各种异步任务，比如网络请求、定时器和用户交互等。让我用通俗易懂的语言解释一下：

1. **单线程**：首先，要知道**JavaScript**是一门**单线程**的语言。这意味着它一次只能处理一个任务，而不是像多线程语言那样同时处理多个任务。

2. **事件队列**：当我们遇到需要等待某些操作结果的语句时，**JavaScript**引擎不会一直等待，而是将这些语句放入一个**事件队列**中。例如，当你发起一个网络请求或设置一个定时器时，这些操作会被放入队列中。

3. **主线程**：**JavaScript**引擎会继续执行其他代码，而不会阻塞在等待的操作上。这就像你在超市排队结账，虽然你在等待，但你可以同时看手机或聊天。

4. **异步操作完成**：当异步操作（比如网络请求返回数据或定时器时间到了）完成时，对应的事件会被加入到事件队列中。

5. **事件循环**：**事件循环**就是不断地检查事件队列，如果队列中有待处理的事件，就会执行它们。这样，**JavaScript**就能在单线程下处理异步任务。

现在，让我用一个生活中的例子来说明。假设你在做家务，你需要同时洗衣服和煮饭。你不会一直等着洗衣服完再去煮饭，而是先放洗衣机洗衣服，然后去做其他事情，比如切菜、炒菜等。当洗衣机洗完衣服时，你会立刻去晾衣服，这就是一种类似于**事件循环**的机制。

## 为什么 JS 是单线程的

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

## JS 是如何实现异步编程的

## 宏任务和微任务都有哪些

在**JavaScript**中，异步任务被分为两类：**宏任务（MacroTask）**和**微任务（MicroTask）**。让我解释一下它们的区别：

1. **宏任务**：
   - 宏任务是在**JavaScript事件循环**中的下一阶段执行的任务。
   - 它包括一些需要较长时间才能完成的操作，例如：
     - `setInterval`
     - `setTimeout`
     - 异步函数
     - I/O 操作
     - UI 渲染等
2. **微任务**：
   - 微任务是在宏任务之后立即执行的任务。
   - 它通常用于处理一些需要快速响应的操作，例如：
     - `Promise.then`
     - `async/await`

## 为什么要区分宏任务和微任务

- **性能优化**：微任务的执行速度更快，因为它们不需要等待下一个事件循环迭代。这对于响应性能要求高的应用程序非常重要。
- **避免阻塞主线程**：如果将异步操作直接放在宏任务中，可能会阻塞主线程，导致应用程序变得不流畅。使用微任务可以将这些操作分散到更小的任务中，避免阻塞。

现在，让我们用一个生活中的例子来说明：

想象你正在银行办理业务。每个人的业务可以看作是一个**宏任务**，例如存钱、买纪念币、购买理财产品或办理信用卡。这些业务需要一定的时间来完成，就像在JavaScript中的宏任务一样。

现在，让我们来看看**微任务**。假设有一个人，他的业务包括存钱、买纪念币、购买理财产品和办理信用卡。这些业务中的每一个都是一个**微任务**。微任务不需要等待很长时间，而是在主线程上的同步任务执行完毕后立即执行。

总之，**微任务**比**宏任务**执行得更快，因为它们被放在了更高的优先级上，而且通常用于处理一些需要快速响应的操作。

## 防抖节流

## 闭包使用场景

## 作用域与作用域链

## 原型与原型链

1. **原型**：
   - 在 JavaScript 中，每个对象都有一个私有属性，指向另一个对象，这个对象被称为“原型”。
   - 原型是一个对象，它包含共享的属性和方法，可以被其他对象继承。
   - 对象通过 `__proto__` 属性（或者更标准的 `Object.getPrototypeOf()` 方法）连接到其原型。
2. **原型链**：
   - 原型链是一系列对象的链接，每个对象都有一个原型，直到达到原型链的末尾（通常是 `null`）。
   - 当我们访问一个对象的属性时，JavaScript 会沿着原型链向上搜索，直到找到匹配的属性或到达链的末尾。
   - 这使得对象之间可以共享属性和方法，实现了继承。

让我们通过一个简单的示例来理解原型和原型链：

```javascript
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

// 创建一个继承自 parent 的对象
const child = {
  __proto__: parent,
};

console.log(child.method()); // 输出 3
```

在这个示例中，`child` 对象继承了 `parent` 对象的属性和方法。当调用 `child.method()` 时，`this` 指向了 `child`，因此返回了正确的值。

原型和原型链是 JavaScript 中非常重要的概念，深入理解它们有助于更好地编写和理解代码。

## 普通函数和箭头函数区别

当谈到**普通函数**和**箭头函数**时，它们之间有一些关键区别。让我们来看看这些区别：

1. **声明方式不同**：
   - 普通函数可以是声明式的，也可以是赋值式的。
   - 箭头函数只能以赋值式的方式定义。

2. **this 指向不同**：
   - 普通函数具有原型（prototype），因此其 this 指向不确定。
   - 箭头函数本身没有 this，它继承自定义它的上下文。换句话说，箭头函数的 this 指向是固定的，取决于外层函数的 this。

3. **arguments 对象**：
   - 普通函数中可以使用 `arguments` 对象，它代表函数调用时传递的参数。
   - 箭头函数没有 `arguments` 对象，因此无法直接访问传递给它的参数。

4. **作为构造函数**：
   - 普通函数可以作为构造函数，使用 `new` 关键字生成实例。
   - 箭头函数不能作为构造函数，因为它没有自己的 `this` 变量，也没有 `prototype` 对象。

总之，普通函数更灵活，适用于需要明确上下文的场景，而箭头函数则更适合函数式编程风格，具有更简洁的语法。

## for-in for-of 的区别

当谈到 JavaScript 中的循环语句时，**for-in** 和 **for-of** 是两个常用的变体。尽管它们看起来相似，但在迭代对象方面有一些关键区别。让我们详细探讨一下：

1. **for-in 循环**：
   - 用于迭代对象的属性，遍历对象中的所有可枚举属性，包括从原型链继承的属性。
   - 通常用于遍历对象的键名。
   - 循环的顺序是不确定的，因为对象属性没有固定的顺序。
   - 可能会迭代到不是自身属性的属性，因此需要使用 `hasOwnProperty` 方法来检查属性是否为对象自身的属性。

   示例：
   ```javascript
   const person = { name: 'John', age: 30, gender: 'male' };
   for (const key in person) {
     if (person.hasOwnProperty(key)) {
       console.log(key, person[key]);
     }
   }
   ```

2. **for-of 循环**：
   - 用于迭代可迭代对象，如数组、字符串、Map、Set、TypedArray 等。
   - 通常用于遍历数组或字符串的值。
   - 不适用于迭代对象的属性，如果尝试使用会抛出 TypeError 异常。
   - 循环的顺序是确定的，因为可迭代对象的值是按照一定顺序排列的。

   示例：
   ```javascript
   const arr = [1, 2, 3];
   for (const value of arr) {
     console.log(value);
   }
   ```

3. **区别总结**：
   - **迭代内容**：for-in 循环迭代对象的是键名，for-of 循环迭代对象的是值。
   - **迭代类型**：for-in 循环适用于遍历对象，for-of 循环适用于遍历可迭代对象。
   - **迭代顺序**：for-in 循环的顺序不确定，for-of 循环的顺序是确定的。
   - **原理**：for-in 循环遍历对象时会包含从原型链继承的属性，for-of 循环遍历的对象是可迭代对象，它们的值是可枚举的。

在选择使用 for-in 循环还是 for-of 循环时，需要根据对象的类型和需要迭代的内容来选择合适的循环方法。通常，如果需要迭代对象的键名，可以使用 for-in 循环；如果需要迭代对象的值，可以使用 for-of 循环。同时，需要注意 for-in 循环的一些缺陷，避免在数组和字符串上使用它。

## == 和 === 的区别

在 JavaScript 中，`==` 和 `===` 是两个用于比较的运算符，它们之间有一些关键区别：

1. **`==`（相等运算符）**：
   - 检查其两个操作数是否相等，并返回一个布尔值结果。
   - 不同类型的操作数会尝试强制类型转换，然后进行比较。
   - 如果操作数具有相同的类型，按照以下方式进行比较：
     - 对象：仅当两个操作数引用同一个对象时返回 `true`。
     - 字符串：只有当两个操作数具有相同的字符且顺序相同时才返回 `true`。
     - 数值：如果两个操作数的值相同，则返回 `true`。+0 和 -0 被视为相同的值。
     - 布尔值：仅当操作数都为 `true` 或都为 `false` 时返回 `true`。
     - 其他类型（如大整形、符号等）：仅当两个操作数值相同时返回 `true`。
   - 如果其中一个操作数是 `null` 或 `undefined`，另一个操作数也必须为 `null` 或 `undefined` 才返回 `true`。
   - 否则返回 `false`。

2. **`===`（严格相等运算符）**：
   - 先判断数据类型，如果类型不匹配就直接返回 `false`。
   - 如果类型相同，再判断其值是否相同，如果值也相同则返回 `true`，否则返回 `false`。
   - `===` 表示的是绝对的相等，不会进行类型转换。

下面是一些示例来说明它们之间的区别：

- 没有类型转换的比较：
  - `1 == 1; // true`
  - `"hello" == "hello"; // true`
- 有类型转换的比较：
  - `"1" == 1; // true`
  - `0 == false; // true`
  - `0 == null; // false`
  - `0 == undefined; // false`
- 比较对象：
  - `const object1 = { key: "value" };`
    - `console.log(object1 == object1); // true`
    - `console.log(object1 == object2); // false`
  - 比较字符串和 String 对象：
    - `const string1 = "hello";`
    - `const string2 = String("hello");`
    - `console.log(string1 == string2); // true`
  - 比较日期和字符串：
    - `const d = new Date("December 17, 1995 03:24:00");`
    - `const s = d.toString();`
    - `console.log(d == s); // true`
  - 比较数组和字符串：
    - `const a = [1, 2, 3];`
    - `const b = "1,2,3";`
    - `console.log(a == b); // true`

总之，`===` 是严格相等运算符，不会进行类型转换，而 `==` 是相等运算符，会尝试类型转换。根据需要选择合适的运算符来进行比较。

## 数组的操作方法

* reduce
* map
* forEach
* Every
* any
* splice
* indexOf
* find
* Filter
* Slice
* Split

## 数组转化为字符串

## 事件冒泡和事件委托和事件捕获

## 阻止事件冒泡、阻止默认事件

## nodejs 和传统 js 有什么区别

## js 中取整办法

## 函数提升和变量提升

## ES6 出了哪些新语法
