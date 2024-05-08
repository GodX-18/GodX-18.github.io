---
title: JS 性能优化
icon: javascript
date: 2023-03-09
order: 3
category:
  - JS
tag:
  - 性能优化
---
## JS 内存管理

---

**内存为什么需要管理**

* 内存泄漏
* 如果不管理内存，程序会出现意想不到的 bug

**基本概念**

* 内存：有可读写的单元组成，表示一片可操作的空间
* 管理：人为的去操作一片空间的申请、使用和释放
* 内存管理：开发者主动申请空间、使用空间、释放空间
* 管理流程：申请 ➡️ 使用 ➡️ 释放

**代码实现**

```js
// 申请
var obj = {}

// 使用
obj.name = 'lg'

// 释放
obj = null
```

## JS 中的垃圾回收

----

**JS 中的垃圾**

* JS 中的内存管理是自动的
* 对象不再被引用时就会被当作垃圾回收
* 对象不能从根上访问到时也会被当作垃圾回收

**JS 中的可达对象**

* 可以访问到的对象就是可达对象 （引用、作用域链）
* 可达的标准就是从根出发是否能够被找到
* JS 中的根就可以理解为全局变量对象

## GC 算法

---

**基本介绍**

* GC 就是垃圾回收机制的简写
* GC 可以找到内存中的垃圾、并释放和回收空间
* 算法就是工作时查找和回收所遵循的规则

**GC里的垃圾**

* 程序中不再需要使用的对象

```js
function func() {
  name = 'lg';
  return name;
}
func() // 函数执行后，因为 name 属性不再使用，所以会从全局变量中回收 name 的内存
```

* 程序中不能再访问到的对象

```js
function func() {
  const name = 'lg';
  return name;
}
func() // 函数执行后，因为 name 属性不能在外部作用域访问到，所以会从函数作用域中回收 name 的内存
```

**常见的 GC 算法**

* 引用计数
* 标记清除
* 标记整理
* 分代回收

## 引用计数算法

----

* 核心思想：设置引用数，判断当前引用数是否为 0
* 引用计数器
* 引用关系改变时修改引用数字
* 引用数字为 0 时立即回收

> 引用数就是当前变量是否被用到的数量

```js
const a = {age:1}; // 引用数为1
const b = {age:1}; // 引用数为1
const c = {age:1}; // 引用数为0

const d = [a.age,b.age];

function fn() {
  lg = 19 // 引用数为 0
}
fn()
```

**优点**

* 发现垃圾时立即回收（引用数为 0）
* 最大限度的减少程序的暂停
  * 实时监听一个引用数的哈希表，有垃圾立即回收，最大限度的减少内存中的垃圾数量，这就保证程序的运行内存是足够的

**缺点**

* 无法回收循环引用的对象

```js
// 虽然在全局作用域中找不到 obj1和 obj2，但是在函数作用域内，obj1 和 obj2 的引用数不为 0 ，所以导致用 引用计数算法是无法回收的
function fn() {
  const obj1 = {};
  const obj2 = {};
  obj1.name = obj2;
  obj2.name = obj1;
}
```

* 时间开销大
  * 需要时刻监控当前对象的引用数值表，本身数值表的修改就需要花费时间，如果内存中的有更多的对象需要修改，那么相对于其他 GC 算法，时间开销还是很大的

## 标记清除算法

---

* 核心思想：分标记和清除两个阶段完成
* 遍历所有对象找标记活动对象（可达对象）
* 遍历所有对象清除没有标记对象
* 回收相应的空间

**优点**

* 可以回收循环引用的对象

**缺点**

* 不会立即回收垃圾对象，要等待标记完成后才能清除

* 会导致空间的碎片化

> * 由于当前所回收的垃圾对象在地址上不连续的，从而导致回收后分散在各个角落
> * 空间碎片太多可能会导致程序在运行过程中需要分配较大对象时，无法找到足够的连续内存而不得不提前触发另一次垃圾收集动作

![preload](https://ask.qcloudimg.com/http-save/7365393/59583b5ef531022a8bf7b5c1d47484b2.png)

## 标记整理算法（标记压缩）

---

* 标记整理可以看作是标记清除的增强
* 标记阶段的操作和标记清除一致
* 在标记完成之后并不是直接清除掉要回收的对象，而是把所有的存活对象都压缩到内存的一端，最后在清理掉边界之外的所有空间，所以不会产生内存碎片，提高了内存的利用率

![preload](https://ask.qcloudimg.com/http-save/7365393/88aa53c095283e8f81a270f8285749cb.png)

**优点**

* 减少碎片化空间

**缺点**

* 不会立即回收垃圾对象
* 移动对象位置，回收效率慢

## 认识 V8

---

* V8 是一款主流的 JS 执行引擎
* V8 采用即时编译
* V8 内存设限：64位操作系统是 1.5GB，32位操作系统是 800MB

### V8 垃圾回收策略

---

* 采用分代回收的思想
* 内存分为新生代、老生代

![image-20220802214727569](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220802214727569.png)

* 针对不同对象采用不同算法

### V8 中常用的 GC 算法

----

* 分代回收
* 空间复制
* 标记清除
* 标记整理
* 标记增量

### V8 中如何回收新生代对象

----
**V8 内存分配**

* V8 内存空间一分为二
* 小空间用于存储新生代对象 （64位操作系统：32M ；32位操作系统：16M）
* 新生代指的是存活时间较短的对象

> 存活时间较短是相对于全局作用域下的对象而言的，通常指那些局部作用域中的对象，函数运行完就会回收，存活时间较短。

**新生代对象回收实现**

* 回收过程采用复制算法 + 标记整理
* 新生代内存区分为二个等大小空间
* 使用空间为 From，空闲空间为 To
* 活动对象存储于 From 空间
* 标记整理后将活动对象拷贝至 To
* From 与 To 交换空间完成释放

**回收细节说明**

* 拷贝过程中可能出现晋升
* 晋升就是将新生代对象移动至老生代存储区
* 晋升的两个条件
  * 经过一轮 GC 还存活的新生代需要晋升
  * To 空间（空闲空间）的使用率超过 25%

> To 空间的使用率之所以超过 25%就会促发晋升，是因为如果 To 空间的使用率过大，当 To 空间转换成 From 空间时，使用空间的剩余空间会变小，所以会设置一个阙值来保证有足够的空间来存放活动对象。

### V8 如何回收老生代对象

---

**老年代对象说明**

* 老年代对象存放在右侧老生代区域
* 64位操作系统 1.4 G，32位操作系统 700 M
* 老年代对象就是指存活时间较长的对象

**老年代对象回收实现**

* 主要采用标记清除、标记整理、增量标记算法
* 首先使用标记清除完成垃圾空间的回收
* 采用标记整理进行空间优化
  * 只有在新生代对象晋升到老年代空间中没有连续的空间存放时，才会触发标记整理算法
* 采用增量标记进行效率优化

**细节对比**

* 新生代区域垃圾回收使用空间换时间
* 老生代区域垃圾回收不适合复制算法

**标记增量如何优化垃圾回收**

![image-20220806100722080](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220806100722080.png)

* 之前垃圾回收时，是会堵塞程序执行的
* 标记增量就是将垃圾回收拆分成多个步骤，然后程序运行组合交替着运行，不会堵塞程序执行

## Performance 工具介绍

### 为什么使用 Performance

---

* GC 的目的是为了实现内存空间的良性循环
* 良性循环的基石是合理使用
* 时刻关注才能确定是否合理
* Performance 提供多种监控方式
* 可以通过 Performance 时刻监控内存

### Performance 的使用步骤

---

* 打开浏览器输入目标网址
* 进入开发人员工具面板，选择性能
* 开启录制功能，访问具体界面
* 执行用户行为，一段时间后停止录制
* 分析界面中记录的内存信息

### 内存问题的外在表现

----

* 页面出现延迟加载或经常性暂停
* 页面持续性出现糟糕的性能
* 页面的性能随时间延长越来越差

### 界定内存问题的标准

---

* 内存泄漏：内存使用持续升高
* 内存膨胀：在多数设备上都存在性能问题
* 频繁垃圾回收：通过内存变化图进行分析

### 监控内存的几种方式

----

**浏览器任务管理器**

![image-20220822054731441](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220822054731441.png)

* 主要用来判断当前的脚本代码是否存在问题
* 如果DOM占用的内存持续变化，说明页面中存在频繁的DOM操作
* 如果JS的内存一直在增加，说明没有产生GC消耗，代表所写的代码可能是有问题的

> 可以配合一下代码，打开任务管理区查看js内存的变化

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
    <button id="btn">ADD</button>
</body>
<script>
    var arr = []
    const zx_btn = document.getElementById("btn");
    zx_btn.onclick = function() {
        var a = new Array(500000).fill('x');
        arr.push(...a);
    }
</script>

</html>
```

**Timeline** **时序图记录**

![image-20220822062345828](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220822062345828.png)

* 主要用来辅助定位问题的所在
* 可以查对应看时间线的页面的渲染状态还有JS和DOM的使用状态
* 如果 JS 堆的时序图是有降有升的，代表是正常的；反之，代码可能存在内存泄漏等问题

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
    <button id="btn">ADD</button>
</body>
<script>
    const arrList = [];
    function test() {
        for(let i = 0;i < 100000;i++) {
            const a = document.createElement("div");
            a.innerHTML = 'GodX'
            document.body.appendChild(a);
        }
        arrList.push(new Array(1000000).join('x'))
    }
    document.getElementById("btn").addEventListener("click", test)
</script>
</html>
```

**堆快照查找分离** **DOM**

* 分离 DOM 就是不在当前的渲染树中存在，但是存在中 JS 堆中的 DOM，属于一种内存泄漏
* 垃圾 DOM 就是既不在当前的渲染树中，也不再 JS 堆中的 DOM
* 可以利用堆快照查找分离DOM

1. 运行以下代码，在浏览器中打开

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
    <button id="btn">ADD</button>
</body>
<script>
    var temp;
    const zx_btn = document.getElementById("btn");
    zx_btn.onclick = function() {
        const ul = document.createElement("ul");
        for(let i = 0; i < 10; i++) {
            let li = document.createElement("li");
            ul.appendChild(li);
        }
        temp = ul;
    }
</script>

</html>
```

2. 打开 edge 浏览器的堆快照进行拍照，然后对快照的内容输入`deta`进行搜索,我们发现此时是没有搜索结果的，说明页面上不存在分离DOM。

![image-20220829160417227](../../Library/Application Support/typora-user-images/image-20220829160417227.png)

3. 随后我们点击页面上的 ADD按钮，然后再进行一次拍照，输入`deta`再次搜索，出现如下结果，说明代码内存的浪费

![image-20220829160933664](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220829160933664.png)

4. 此时我们可以根据按钮触发的事件进行定位到造成分离DOM的代码，然后释放内存，解决内存空间的浪费。

![image-20220829161305846](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220829161305846.png)

**判断是否存在频繁的垃圾回收**

* 为什么需要确定频繁的垃圾回收
  * GC 工作时应用程序时停止的
  * 频繁且过长的 GC 会导致应用假死
  * 用户使用中感知应用卡顿
* 判断有无频繁的垃圾回收的两种方式
  * Timeline 中频繁的上升下降
  * 任务管理器中数据频繁的增加减小

## JavaScript 代码优化

### **如何精准的测试JS性能**

----

* 本质上就是采集大量的执行样本进行数学统计和分析
* 使用基于 Benchmark.js 的 https://jsperf.app/ 完成

### **Jsperf使用流程(官网已经停止维护)**

----

* 使用 GitHub 账号登录
* 填写个人信息（非必须）
* 填写详细的测试用例信息（title、slug）
* 填写准备代码（DOM操作时经常使用）
* 填写必要有 setup 与 teardown 代码
* 填写测试代码片段

### **慎用全局变量**

---

* 全局变量定义在全局执行上下文，是所有作用域链的顶端
* 全局执行上下文一直存在于上下文执行栈，直到程序退出
* 如果某个局部作用域出现了同名变量则会遮蔽或污染全局变量

**利用`Jsperf`工具进行性能对比**

* Ops/sec ：每秒操作数，越高说明性能越好

```js
// 全局变量
var i, str
for (i = 0; 1000；i++){
    str += i;
}

// 局部变量
for (let i = 0; i< 1000; i++) {
    let str = '';
    str += i;
}

```

![image-20220829170843545](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220829170843545.png)

### **缓存全局变量**

----

* 将使用中无法避免的全局变量缓存到局部

**对比**

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
    <input type="button" value="btn" id="btn1">
    <input type="but ton" Value="btn" id="btn2">
    <input type="but ton" value="btn" id="btn3">
    <input type="button" value="btn" id="btn4">
    <p>1111</p>
    <input type="button" Value="btn" id="btn5">
    <input type="button" value="btn" id="btn6">
    <p>222</p>
    <input type="button" value="btn" id="btn7">
    <input type="but ton" value="btn" id="btn8">
    <p>333</p>
    <input type="button" value="btn" id="btn9">
    <input type="button" value="btn" id="btn10">
</body>
<script>
    function getBtn() {
        let oBtn1 = document.getELementById('btn1')
        let oBtn3 = document.getElementByIa('btn3')
        let oBtn5 = document.getElementById('btn5')
        let oBtn7 = document.getElementById('btn7')
        let oBtn9 = document.getElementById('btn9')
    }

    function getBtn() {
        let obj = document;
        let oBtn1 = obj.getELementById('btn1')
        let oBtn3 = obj.getElementByIa('btn3')
        let oBtn5 = obj.getElementById('btn5')
        let oBtn7 = obj.getElementById('btn7')
        let oBtn9 = obj.getElementById('btn9')
    }
</script>

</html>
```

![image-20220829172329859](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220829172329859.png)

### **通过原型新增方法**

-----

**对比**

```js
var fn1 = function () {
  this.foo = function () {
    console.log(11111);
  };
};

let f1 = new fn1();

var fn2 = function () {};
fn2.prototype.foo = function () {
  console.log(11111);
};

let f2 = new fn2();

```

![image-20220829172948230](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220829172948230.png)

### **避开闭包陷阱**

----

**闭包特点**

* 外部具有指向内部的引用
* 在外部作用域访问内部作用域的数据

```js
function foo() {
  var name = "Lg";
  function fn() {
    console.Log(name);
  }
  return fn;
}
var a = foo();
a();
```

**关于闭包**

* 闭包是一种强大的语法
* 闭包使用不当很容易出现内存泄漏
* 不要为了闭包而闭包

**示例**

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
    <button id="btn">ADD</button>
    <script>
        function foo() {
            var el = document.getElementById('btn');
            el.onclick = function () {
                console.log('GodX------>log', el.id);
            }
        }
        foo()

        function clever() {
            var el = document.getElementById('btn');
            el.onclick = function () {
                console.log('GodX------>log', el.id);
            }
            el = null; // 释放内存
        }
        clever()
    </script>
</body>

</html>
```

### **避免属性访问方法使用**

----

* JS 不需要属性的访问方法，所有属性都是外部可见的
* 使用属性访问方法只会增加一层重定义，没有访问的控制能力

**示例**

```js
// 属性访问方法
function Person() {
    this.age = 18;
    this.name = 'xxx';
    this.getAge = () => this.age;
}
const p1 = new Person();
const a = p1.getAge();

// 直接访问
function Person() {
    this.age = 18;
    this.name = 'xxx';
}
const p2 = new Person();
const a = p2.age;


```

**对比**

![image-20220830093549516](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830093549516.png)

### **For 循环优化**

-----

* 长度提前获取，节省计算时间

**示例**

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
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
    <p class="btn">add</p>
</body>
<script>
    var btns = document.querySelectorAll('.btn');

    // 普通 for 循环
    console.time('before')
    for(let i = 0;i < btns.length;i++) {
        console.log('GodX------>log',i);
    }
    console.timeEnd('before')


    // 优化
    console.time('after')
    for(let i = 0,len = btns.length;i < len;i++) {
        console.log('GodX------>log',i);
    }
    console.timeEnd('after')

</script>
</html>
```

**对比**

![image-20220830095107485](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830095107485.png)

### **采用最优循环方式**

----
* 普通遍历获取数据，没有额外的操作时，foreach 性能最好

**示例**

```js
var arr = new Array(1, 2, 3, 4, 5);

arr.forEach((item) => {
  console.log("GodX------>log", item);
});

for (let i = 0, len = arr.length; i < len; i++) {
  console.log("GodX------>log", arr[i]);
}

for (var i in arr) {
  console.log("GodX------>log", arr[i]);
}

```

**对比**

![image-20220830100240490](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830100240490.png)

### **节点添加优化**

-----

* 节点的添加操作必然会有回流和重绘
* 利用文档碎片优化，避免多次回流和重绘

**示例**

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
    <script>
        console.time('before')
        for(let i = 0; i < 1000; i++) {
            let op = document.createElement('p');
            op.innerHTML = i;
            document.body.appendChild(op);
        }
        console.timeEnd('before')

        console.time('before')
        const fragments = document.createDocumentFragment()
        for(let i = 0; i < 1000; i++) {
            let op = document.createElement('p');
            op.innerHTML = i;
            fragments.appendChild(op);
        }
        document.body.appendChild(fragments)
        console.timeEnd('before')
    </script>
</body>
</html>
```

**对比**

![image-20220830104237132](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830104237132.png)

### **克隆优化节点操作**

----

* 克隆节点的效率比创建节点的效率更高

**示例**

```html
// 节点新增操作
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p id="old">old</p>
    <script>
        console.time('before')
        for(let i = 0; i < 100000; i++) {
            let op = document.createElement('p');
            op.innerHTML = i;
            document.body.appendChild(op);
        }
        console.timeEnd('before')

        console.time('after')
        var old = document.getElementById('old');
        for(let i = 0; i < 100000; i++) {
            const newEl = old.cloneNode(false);
          // 1. node.cloneNode(); 括号为空或者里面是false 浅拷贝 只复制标签不复制里面的内容
        	// 2. node.cloneNode(true); 括号为true 深拷贝 复制标签复制里面的内容

            newEl.innerHTML = i;
            document.body.appendChild(newEl);
        }
        console.timeEnd('after')
    </script>
</body>
</html>
```

**对比**

![image-20220830105909444](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830105909444.png)

### **直接量替换 Object操作**

----

**示例**

```js
var a = [1,2,3];

var a1 = new Array(3)
a1[0] = 1;
a1[1] = 2;
a1[2] = 3;
```

**对比**

![image-20220830110508516](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830110508516.png)

### **JSBench 的使用**

---

![image-20220830110802112](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830110802112.png)

* 需要初始化的内容在这里添加，比如一些公用的 html和js

![image-20220830110907785](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830110907785.png)

* 需要添加的测试用例写在这里

<img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830111222343.png" alt="image-20220830111222343"  />

### **堆栈中代码执行流程**

-----

```js
let a = 10;
function foo(b) {
    let a = 2;
    function baz(c) {
        console.log('GodX------>log',a+b+c);
    }
    return baz;
}

let fn = foo(2)
fn(3) // 7
```
![image-20220830220127378](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830220127378.png)

| 简述JavaScript代码在堆栈中的执行过程：                       |
| ------------------------------------------------------------ |
| 1、JavaScript代码在开始执行之后，会在堆内存中创建执行环境栈，用它来存放不同的执行上下文 |
| 2、代码从上向下开始执行，最先创建的是ECG全局执行上下文       |
| 3、在这个ECG里面，将全局作用域下的代码进行声明和存放         |
| 4、其中基本类型值存放在栈里面，引用类型值存放在堆里面        |
| 5、堆里面的数据一般由GC进行处理，栈里面的数据由JavaScript主线程进行管理 |
| 6、在执行过程中，每当遇到函数执行时，就会再生成一个执行上下文进栈 |
| 7、代码执行完成以后，根据是否产生闭包来决定当前上下文引用的堆数据是否进行释放 |

| 一些名词解释：                                               |
| ------------------------------------------------------------ |
| 1、ECS： Execution Context Stack，执行环境栈，遵守先进后出原则 |
| 2、EC(G)：全局执行上下文压，只创建一次，只有一个，页面关闭时才会释放掉 |
| 3、EC(xx): xx函数私有执行上下文，根据是否产生闭包来决定当前上下文引用的堆数据是否进行释放 |
| 4、VO： Variable Object，变量对象，用来保存当前执行上下文中所有变量的一个空间 |
| 5、AO： Active Object，私有变量对象，用来保存当前私有上下文中所有的变量的一个空间 |
| 6、GO： Global Object，全局对象，是预定义的对象 【通过window可以调取所有内置的属性和方法】 |

**参考链接**

* https://zhuanlan.zhihu.com/p/361172960

### **减少判断层级**

----
* 通过提前return的方式，减少层级
* if/else 适用于区间性的条件判断
* swtich/case 适用于固定变量的判断，方便维护

**示例**

```js
// 待优化
function doSomething(part, chapter) {
  const parts = ["ES2016", "工程化", "Vue", "React", "Node"];
  if (part) {
    if (parts.includes(part)) {
      console.log("属于当前课程");
      if (chapter > 5) {
        console.log("您需要提供 VIP 身份");
      }
    }
  } else {
    console.log("请确认模块信息");
  }
}
doSomething("ES2016", 6);

// 优化后
function doSomething(part, chapter) {
  const parts = ["ES2016", "工程化", "Vue", "React", "Node"];
  if (!part) {
    console.log("请确认模块信息");
    return;
  }
  if (!parts.includes(part)) return;
  console.log("属于当前课程");
  if (chapter > 5) {
    console.log("您需要提供 VIP 身份");
  }
}
doSomething("ES2016", 6);

```

**对比**

![image-20220830222706399](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220830222706399.png)

### **减少作用域链查找层级**

----
* 查找的层级越短，越快找到数据
* 内存空间换时间，但是会被GC回收

**示例**

```js
// 待优化
var name = ''
function foo() {
    name = 'xxxx'
    return name;
}
foo()

// 优化后
var name = ''
function foo() {
    const name = 'xxxx'
    return name;
}
foo()

```

**对比**

![image-20220831052941970](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220831052941970.png)

### **减少数据读取次数**

----

* 缓存要使用的数据

**示例**

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
    <div id="pick" class="pick">pick</div>
    <script>
        const pick = document.getElementById("pick");
        // 优化前
        function hasEle(ele,cls) {
            return ele.className == cls
        }

        // 优化后
        function hasEle(ele, cls) {
            const name = ele.className;
            return name == cls
        }
        console.log('GodX------>log', hasEle(pick, 'pick'));
    </script>
</body>

</html>
```

**对比**

![image-20220831054815058](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220831054815058.png)

### **字面量与构造式**

----

* 构造式相当于调用了函数

**示例**

```js
// 待优化
function test() {
  let obj = new Object();
  obj.a = 1;
  obj.b = 2;
  obj.c = 3;
  return obj;
}

// 优化后
function test() {
  let obj = { a: 1, b: 2, c: 3 };
  return obj;
}
```

**对比**

![image-20220831060210408](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220831060210408.png)

### **采用事件委托**

----

* 利用js冒泡的机制，将子元素的事件委托给父元素

**示例**

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
    <ul id="ul">
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        // 优化前
        const list = document.querySelectorAll('li');
        function show(el) {
            console.log('GodX------>log',el.target.innerHTML);
        }
        for(let el of list) {
            el.onclick = show
        }

        // 优化后
        const ul = document.getElementById('ul');
        function show(el) {
            var obj = el.target;
            if(obj.nodeName.toLowerCase() === 'li') {
                console.log('GodX------>log',obj.innerHTML);
            }
        }
        ul.onclick = show
    </script>
</body>
</html>
```

**对比**

![image-20220831063005265](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220831063005265.png)