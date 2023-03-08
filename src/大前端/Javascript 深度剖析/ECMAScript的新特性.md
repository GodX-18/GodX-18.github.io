## var 、let 和 const



![img](https://cdn.nlark.com/yuque/0/2021/png/12533255/1613632433111-36f600d9-2d25-411c-a2de-bc33556938f7.png)



**注意：**



- const定义的值不可改值的是指向的内存地址不可更改，对于数据成员的修改是没有问题的



```javascript
const obj = {};
obj.name = true;
console.log(obj);  // {name : true}
```



- 在一个大括号中   使用let关键字声明的变量才具有块级作用域 var关键字是不具备这个特点的

- 防止循环变量变成全局变量

```javascript
 let arr = [];
for (var i = 0; i < 2; i++) {
    arr[i] = function () {
        console.log(i); 
    }
}
arr[0](); // 2
arr[1](); // 2
```

- 使用let关键字声明的变量没有变量提升

- [使用let关键字声明的变量具有暂时性死区特性:](https://www.cnblogs.com/ricoliu/p/6149912.html)
  只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
   tmp = 'abc'; // ReferenceError
   let tmp;
}
```



## 数组的解构赋值



- 解构赋值就是把数据结构分解，然后给变量进行赋值.数组解构用中括号包裹，多个变量用逗号隔开

```javascript
const arr = [100, 200, 300];
const [a, b, c] = arr;
consoel.log(a, b, c); // 100, 200, 300
```

- 如果结构不成功，变量跟数值个数不匹配的时候，变量的值为undefined

```javascript
const arr = [100, 200, 300];
const [a, b, c, d] = arr;
console.log(d); // undfined
```

- 剩余参数 ... 和解构赋值的配合使用

```javascript
const arr = [100, 200, 300];
const [a, ...b] = arr;
console.log(b); // [200, 300]
```

- 结构赋值可以设置默认值

```javascript
const arr = [100, 200, 300];
const [a, b, c = 123, d = "default"] = arr;
console.log(d); //  300 default
```



## 对象的解构赋值



- 对象的解构方式与数组的不同，对象解构用花括号包裹，多个变量用逗号隔开，其中**花括号中的值对应对象的属性值**

```javascript
const obj = {
    a : '1',
    b : '2'
};

const { a, b } = obj;
console.log(a,b); // 1 2
```

- 解构赋值的重命名: 冒号右边为重命名的名称，左边为对象的属性值

```javascript
const obj = {
    a : '1',
    b : '2'
};

const { a : res } = obj;
console.log(res); // 1
```

- 利用解构赋值能够让我们方便的去取对象中的属性跟方法

```javascript
const { log } = console;
log('666'); // 666
```

- 其他用法和数组的用法基本相同



## 模板字符串



- 模板字符串用“ ` ” 包裹

```javascript
const str = `Hello world!`;
console.log(str); // Hello world!
```

- 允许换行

```javascript
const str = `Hello
 world!`;
console.log(str);
// Hello
// world!
```

- 可以通过 ${} 插入变量或表达式，表达式的执行结果将会输出到对应位置

```javascript
// 变量
const i = "world";
const str = `Hello ${i}!`;
console.log(str); // Hello world!
// 表达式
const str = `Hello ${1 + 2}! ----------- ${Math.random()}`;
console.log(str); // Hello 3! ----------- 0.7605924553022982模板字符串标签函数
```



## 模板字符串标签函数



- 模板字符串的标签就是一个特殊的函数，使用这个标签就是调用这个函数

```javascript
const a = 'tom';
const b = true;
function tagFn(strings, ...varValue) {
  console.log(strings, varValue);
}
const result = tagFn`hello ${a} is a ${b}`;
console.log(result); // [ 'hello ', ' is a ', '' ] [ 'tom', true ]
```

- 可以实现文本的翻译或者小型的模板引擎



## 字符串的扩展方法



- **startsWith**:判断字符串是否以某字符串开头

- **endsWith**:判断字符串是否以某字符串结尾

- **includes**:判断字符串是否包含某字符串



```javascript
const str = 'xuan shen zui shuai';
console.log(str.startsWith('xuan')); // true
console.log(str.endsWith('shuai')); // true
console.log(str.includes('shen')); // true
```



## 默认参数值



- 短路运算很多情况下是不适合判断默认参数的，例如 0 '' false null



```javascript
function foo (enable) {
  // enable = enable || true (短路运算)
  enable = enable === undefined ? true : enable
  console.log('foo invoked - enable: ')
  console.log( enable)
}
```



- 默认参数一定是在形参列表的最后



```javascript
function foo (enable = true) {
  console.log(enable)
}

foo() // true
foo(false) // false
foo(0) // 0
foo(null) // null
foo(undefined) // true
```



## 剩余参数



- arguments参数是伪数组
  **伪数组**：

无法直接调用数组方法或期望length属性有什么特殊的行为，不具有数组的push,pop等方法，但仍可以对真正数组遍历方法来遍历它们。

典型的是函数的argument参数，还有像调用getElementsByTagName,document.childNodes之类的,它们都返回NodeList对象都属于伪数组。可以使用Array.prototype.slice.call(fakeArray)将数组转化为真正的Array对象。



```javascript
function foo (a,b) {
  console.log(arguments); // [Arguments] { '0': 2, '1': 3 }
  console.log(Array.prototype.slice.call(arguments)) // [ 2, 3 ]
}
foo(2,3)
```



- 剩余参数只能够使用一次，并且只能放在最后

```javascript
function foo (first,...args) {
  console.log(args) // [2, 3, 4]
}

foo(1, 2, 3, 4)
```



## 展开数组/对象



- 数组参数展开

```javascript
const arr = ['foo', 'bar', 'baz']

console.log.apply(console, arr) // foo bar baz

console.log(...arr) // foo bar baz
```

- 对象展开

```javascript
    let json = {
        a: 1,
        b: 2,
        c: 3
    };

    let json2 = {
        ...json,
        d: 999
    };
 console.log(json2);//{a:1,b:2,c:3,d:999}
```



## 箭头函数



- 单个参数可以省略括号，函数体多条语句，返回值仍需 return，反之可以省略



```javascript
const arr = [1, 2, 3, 4, 5, 6, 7]

 arr.filter(function (item) {
   return item % 2
 })

// 常用场景，回调函数
arr.filter(i => i % 2)
```



- 箭头函数不会改变this的指向，也就是说箭头函数this指向是父级作用域的this

```javascript
const person = {
  name: 'tom',
  test: function() {
    console.log(`${this.name}`); // tom
  }
    test : () => {
    console.log(`${this.name}`); // undfined
  }
}

person.test()
```

- 箭头函数可以避免使用闭包机制的使用

```javascript
const person = {
  name: 'tom',
  asyncTest: function() {
    setTimeout(function() {
      console.log(this.name); // undfined
    },1000)
  },
  asyncTest2: function() {
    const _this = this;
    setTimeout(function() {
      console.log(_this.name); // tom
    },1000)
  },
  asyncTest3: function() {
    setTimeout(() => {
      console.log(this.name); // tom
    },1000)
  }
}
person.asyncTest3()
```



## 对象字面量增强



```javascript
const test = '123';
const obj = {
  // 属性名与属性值相同时，可以简写 ==============================
  test, // 等同于 test: test,
	
  // 定义函数可以省略'：function' =================================
  // method: function() {
  //   console.log(this);
  // }
  method() {
    console.log(this);
  },
   // 计算属性名，用方括号包裹 ===================================
  [1+2] : 3,
  [Math.random()] : 'hh'
};

console.log(obj);
```



## 对象扩展方法



### Object.assign



- 用于克隆和合并一个对象, 如果被拷贝的属性的属性名已经存在，那么它会被覆盖



```javascript
const source1 = {
  a: 123,
  b: 123
}

const source2 = {
  b: 789,
  d: 789
}

const target = {
  a: 456,
  c: 456
}

const result = Object.assign(target, source1, source2)

console.log(target) // { a: 123, c: 456, b: 789, d: 789 }
console.log(result === target) // true 
// 注意：所克隆的对象指向并未改变，可以使用空对象作为目标对象改变指向

const result2 = Object.assign({},target,source1,source2)

console.log(result2) //  { a: 123, c: 456, b: 789, d: 789 }
console.log(result === result2) // fasle
```



## Proxy



一个 `Proxy` 对象包装另一个对象并拦截诸如读取/写入属性和其他操作，可以选择自行处理它们，或者透明地允许该对象处理它们。



### Proxy的基本使用



```javascript
const person = {
  name : '小明',
  age: 18
}

const personProxy = new Proxy(person,{
  get(target,property) {
    console.log(target,property);
    return 100;
  },
  set(target,property,value) {
    console.log(target,property,value);
  }
});

console.log(personProxy.name); // { name: '小明', age: 18 } name
personProxy.age = 20; // { name: '小明', age: 18 } age 20
```



### 与Object.defineProerty()的对比

![img](https://cdn.nlark.com/yuque/0/2021/png/12533255/1613723152546-3acedae4-9105-496c-9078-445e5246e046.png)

#### Proxy 可以监视到读写以外的其他操作

```javascript
const person = {
  name: 'zce',
  age: 20
}

const personProxy = new Proxy(person, {
  deleteProperty (target, property) {
    console.log('delete', property)
    delete target[property]
  }
})

delete personProxy.age // delete age
console.log(person) // { name: 'zce' }
```

#### Proxy 可以很方便的监视数组操作

```javascript
const list = []

const listProxy = new Proxy(list, {
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
    return true // 表示设置成功
  }
})

listProxy.push(100); 
// set 0 100
// set length 1
console.log(listProxy); // [100]
```

#### Proxy 不需要侵入对象

```javascript
// Object.definePorerty需要侵入对象 =================================================
const person = {}

Object.defineProperty(person, 'name', {
  get () {
    console.log('name 被访问')
    return person._name
  },
  set (value) {
    console.log('name 被设置')
    person._name = value
  }
})
Object.defineProperty(person, 'age', {
  get () {
    console.log('age 被访问')
    return person._age
  },
  set (value) {
    console.log('age 被设置')
    person._age = value
  }
})

person.name = 'jack' 
// name 被设置

console.log(person.name)
// name 被访问
// jack

// 使用Proxy更为合理 =========================================================
const person2 = {
  name: 'zce',
  age: 20
}

const personProxy = new Proxy(person2, {
  get (target, property) {
    console.log('get', property)
    return target[property]
  },
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
  }
})

personProxy.name = 'jack'
// set name jack

console.log(personProxy.name)
// get name
// jack
```

## Reflect

Reflect 是一个内建对象，可简化 Proxy 的创建。

前面所讲过的内部方法，例如 [[Get]] 和 [[Set]] 等，都只是规范性的，不能直接调用。

Reflect 对象使调用这些内部方法成为了可能。它的方法是内部方法的最小包装

统一的对象操作API,具体请见

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect静态方法

#### `Apply`

```
Reflect.apply(target, thisArgument, argumentsList)
```

对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 `Function.prototype.apply()` 功能类似。

```javascript
let age = 18;
function zx() {
  console.log(this.age);
}
const obj2 = {
  age: 13
}

Reflect.apply(zx,obj2,[]) // 13
```

#### `construct`

```
Reflect.construct(target, argumentsList[, newTarget])
```

对构造函数进行 `new`[ ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)操作，相当于执行 `new target(...args)`。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  test(e) {
    console.log(e);
  } 
}

let zx = Reflect.construct(Person,['rrr'])

console.log(zx); // {name: 'rrr'}
zx.test('dddd'); // dddd
```

#### `defineProperty`

```
Reflect.defineProperty(target, propertyKey, attributes)
```

和 `Object.defineProperty()` 类似。如果设置成功就会返回 `true`

```javascript
const obj = {
  name: "圣诞节",
  age: 20
}

Reflect.defineProperty(obj,'sex',{value :'man'})
console.log(obj.sex); // man
```

#### `get`

```
Reflect.get(target, propertyKey[, receiver])
```

获取对象身上某个属性的值，类似于 `target[name]。`

```javascript
// Object
const obj = {
  name: 'zx',
  age: 18
}

console.log(Reflect.get(obj,'age'));  // 18

// Array
console.log(Reflect.get([1,2],1)); // 2 第二个参数为数组下标

//
const objProxy = new Proxy(obj, {
  get(target,property) {
    return target[property] + 'jjj'
  }
})

console.log(Reflect.get(objProxy,'age')); // 18 2 18jjj
```

#### deleteProperty

Reflect.deleteProperty(target, propertyKey)

静态方法 `**Reflect**``**.deleteProperty()**` 允许用于删除属性。它很像 `delete`[ operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) ，但它是一个函数。

语法

Reflect.deleteProperty(target, propertyKey)



参数

`target`删除属性的目标对象。`propertyKey`需要删除的属性的名称。

返回值

`Boolean` 值表明该属性是否被成功删除。

异常

抛出一个 `TypeError`，如果`target`不是 `Object`。

描述

`Reflect.deleteProperty` 允许你删除一个对象上的属性。返回一个 `Boolean` 值表示该属性是否被成功删除。它几乎与非严格的 `delete`[ operator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 相同。

示例

```javascript
var obj = { x: 1, y: 2 };
Reflect.deleteProperty(obj, "x"); // true
obj; // { y: 2 }

var arr = [1, 2, 3, 4, 5];
Reflect.deleteProperty(arr, "3"); // true
arr; // [1, 2, 3, , 5]

// 如果属性不存在，返回 true
Reflect.deleteProperty({}, "foo"); // true

// 如果属性不可配置，返回 false
Reflect.deleteProperty(Object.freeze({foo: 1}), "foo"); // false
```

## class 类

```javascript
// 传统创建构造函数方法

function Person(name) {
  this.name = name;
}

Person.prototype.sing = function() {
  console.log('我爱唱歌');
}

// 用class类创建构造函数的方法

class Person {
  constructor(name) {
    this.name = name;
  }

  sing() {
  console.log('我爱唱歌');
  }
}
```

## 静态成员

基本用法

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sing() {
  console.log('我爱唱歌');
  }
  
  static look() {
    console.log('dasdsad');
  }
}



const a = new Person('hh')

Person.look() // dasdsad  

// 注意：不能够用实例对象调用 
```

## 类的继承

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    song() {
        console.log(this.name);
    }
}

class Son extends Person {
    constructor(name, age) {
        super(name); // 调用父亲的构造函数
        this.age = age;
    }
    son() {
        // super.song();
        console.log(this.name,this.age);
    }
}
const test = new Son('zhangsan',14);
test.son(); // zhangsan 14
```

## set数据结构

```javascript
const set = new Set();
// 添加成员====================
set.add(1).add('dasd').add(898)

// 遍历成员======================
// 第一种
set.forEach(item => console.log(item));
//第二种
for(let i of set) {
    console.log(i);
}
console.log(set);

// 获取成员的数量=======================
console.log(set.size); // 3

// 判断是否有无成员======================
console.log(set.has(898)); // true

// 删除成员==============================

console.log(set.delete(1)); // true
console.log(set); // {'dasd', 898}

// 删除所有成员=============================

set.clear();
console.log(set);


// 清除数组或对象的重复成员=========================

const arr = [ 1,1,5,56,5,952,25,25]; 

let arr2 = new Set(arr)

console.log(arr2); // Set(5) { 1, 5, 56, 952, 25 }

// 将set类型转换为数组==========================
// 第一种
const result = Array.from(set);
// 第二种
const result = [...set];

console.log(result); 
```

## Map数据结构

### 基本使用

- `**map[key]**` **不是使用** `**Map**` **的正确方式**

虽然 `map[key]` 也有效，例如我们可以设置 `map[key] = 2`，这样会将 `map` 视为 JavaScript 的 plain object，因此它暗含了所有相应的限制（没有对象键等）。

所以我们应该使用 `map` 方法：`set` 和 `get` 等。

- 每一次 `map.set` 调用都会返回 map 本身，所以我们可以进行“链式”调用

```javascript
// 普通对象的键只能为字符串 =========================
const obj = {};
obj[[123, 8]] = 8;
obj[{ a: 5 }] = 8;
obj[true] = 8;
console.log(obj); //{ '123,8': 8, '[object Object]': 8, true: 8 }

//创建Map =====================================
const map = new Map();

// 根据键存储值（链式调用）=====================================
const key = {a: 'hhhh'};
map.set(key,88).set(true,88);


// 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。====================
console.log(map.get(key)); // 88

// 如果 key 存在则返回 true，否则返回 false。========================
console.log(map.has(key)); // true

// 删除指定键的值。==========================
map.delete(key);
console.log(map); // Map(1) { true => 88 }

// 清空 map =========================
map.clear();
console.log(map); // Map(0) {}

// 返回当前元素个数。====================
console.log(map.size); // 0
```

### [Map 迭代](https://zh.javascript.info/map-set#map-die-dai)

```javascript
const map = new Map();
map.set(true,55).set(false,88).set({a:666},666);

// 遍历所有的值 ====================
for (let i of map.values()) {
    console.log(i);
}
// 55
// 88
// 666

// 遍历所有的键 =========================
for (let i of map.keys()) {
    console.log(i);
}
// true
// false
// { a: 666 }

// 遍历所有的实体 ============================
for (let i of map) {
    console.log(i);
}
// [ true, 55 ]
// [ false, 88 ]
// [ { a: 666 }, 666 ]
```

### 将普通对象转换成Map结构

```javascript
const obj = {
    name : 'zx',
    age : 18
};
 
// 将普通对象转换成Map格式
let map = new Map(Object.entries(obj));

console.log(map);  // Map(2) { 'name' => 'zx', 'age' => 18 }
```

### 将 Map 转换成对象

```javascript
const map = new Map()
map.set('name', '林三心')
map.set('age', 22)
map.set('gender', '男')

console.log(map) // Map(3) { 'name' => '林三心', 'age' => 22, 'gender' => '男' }

const obj = Object.fromEntries(map)
console.log(obj) // { name: '林三心', age: 22, gender: '男' }
```

## Symbol

最主要的作用就是为对象添加独一无二的属性名

```javascript
 // 创建一个Symbol ==============================
let id = Symbol();
let id2 = Symbol();
console.log(id === id2); // false

// 全局Symbol ==================================
let id3 = Symbol.for('zx');
let id4 = Symbol.for('zx');
console.log(id3 === id4); // true

const obj = {
    [id] : 66,
    [id2] : 88,
    [id3] : 77
};

// Symbol.for:获取Symbol的键值,如果注册表中没有就创建 ============================
console.log(Symbol.for('zx2')); // Symbol(zx)

// Symbol的描述会自动转换成字符串 ==========================================
console.log(Symbol.for(true) === Symbol.for('true')); // true

// Symbol.keyFor：获取Symbol的描述 ======================
console.log(Symbol.keyFor(id3));// zx

// 可以用Reflect.ownKeys()获取所有的键值 =====================
console.log(Reflect.ownKeys(obj));

// 可以用Object.getOwnPropertySymbols() 获取所有的Symbol ===========================
console.log(Object.getOwnPropertySymbols(obj));

// 自定义对象的toString标签 ====================================
const obj2 = {
    [Symbol.toStringTag] : 'zx'
};

console.log(obj2.toString()); // [object zx]
```

总结

- `Symbol` 是唯一标识符的基本类型
- Symbol 是使用带有可选描述（name）的 `Symbol()` 调用创建的。
- Symbol 总是不同的值，即使它们有相同的名字。如果我们希望同名的 Symbol 相等，那么我们应该使用全局注册表：`Symbol.for(key)` 返回（如果需要的话则创建）一个以 `key` 作为名字的全局 Symbol。使用 `Symbol.for` 多次调用 `key` 相同的 Symbol 时，返回的就是同一个 Symbol。
- Symbol 有两个主要的使用场景：

1. “隐藏” 对象属性。 如果我们想要向“属于”另一个脚本或者库的对象添加一个属性，我们可以创建一个 Symbol 并使用它作为属性的键。Symbol 属性不会出现在 `for..in` 中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的 symbol。因此，该属性将受到保护，防止被意外使用或重写。
   因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的对象中，但其他地方看不到它。
2. JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 `Symbol.*` 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 `Symbol.iterator` 来进行 [迭代](https://zh.javascript.info/iterable) 操作，使用 `Symbol.toPrimitive` 来设置 [对象原始值的转换](https://zh.javascript.info/object-toprimitive) 等等。

- 从技术上说，Symbol 不是 100% 隐藏的。有一个内置方法 [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 允许我们获取所有的 Symbol。还有一个名为 [Reflect.ownKeys(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) 的方法可以返回一个对象的 **所有** 键，包括 Symbol。所以它们并不是真正的隐藏。但是大多数库、内置方法和语法结构都没有使用这些方法。



## ES2015 可迭代接口

```javascript
const arr = [1,2,3,4];
const set = new Set(arr);

const iterator = arr[Symbol.iterator]();

console.log(iterator.next());// { value: 1, done: false }
console.log(iterator.next());// { value: 2, done: false }
console.log(iterator.next());// { value: 3, done: false }
console.log(iterator.next());// { value: 4, done: false }
console.log(iterator.next());// { value: undefined, done: true }
console.log(iterator.next());// { value: undefined, done: true }
```

### 实现可迭代接口

```javascript
const obj = {
    store: ['foo','bar','baz'],
    [Symbol.iterator]: function() {
        let index = 0;
        return {
            next : () => {
                const result = {
                    value: this.store[index],
                    done: index >= this.store.length
                };
                index++;
                return result;
            }
        }
    }
}

for (const i of obj) {
    console.log(i);
}
// foo
// bar
// baz
```

## 迭代器模式

可迭代（Iterable） 对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 `for..of` 循环中使用的对象。

数组是可迭代的。但不仅仅是数组。很多其他内建对象也都是可迭代的。例如字符串也是可迭代的。

如果从技术上讲，对象不是数组，而是表示某物的集合（列表，集合），`for..of` 是一个能够遍历它的很好的语法，因此，让我们来看看如何使其发挥作用。      

```javascript
const obj = {
    arr1: [1, 2, 3],
    arr2: [4, 5, 6],
    arr3: [7, 8, 9],
    each: function (callback) {
        const all = [].concat(this.arr1, this.arr2, this.arr3);
        for (let i of all) {
            callback(i)
        }
    },
    [Symbol.iterator]: function () {
        const all = [...this.arr1, ...this.arr2, ...this.arr3];
        let index = 0;
        return {
            next: function() {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }
}

obj.each(function (item) {
    console.log(item);
})
console.log('=========================');

for (let i of obj) {
    console.log(i);
}
```

## ES2015 [Generator 函数](https://zh.javascript.info/generators#generator-han-shu)

```javascript
function* mm() {
    yield 1;
    yield 2;
    yield 3;
};

const dd = mm();

// ======================================
console.log(dd.next());// { value: 1, done: false }
console.log(dd.next());// { value: 2, done: false }
console.log(dd.next());// { value: 3, done: false }

// ========================================
for(let i of dd) {
    console.log(i); // 1 2 3
}

// =========================================
console.log([...dd]); // [1,2,3]
```



### 生成器应用

- `**function\* f(…)**` **或** `**function \*f(…)**`**？**

这两种语法都是对的。

但是通常更倾向于第一种语法，因为星号 `*` 表示它是一个 generator 函数，它描述的是函数种类而不是名称，因此 `*` 应该和 `function` 关键字紧贴一起。

- 

```javascript
const obj = {
    arr1: [1, 2, 3],
    arr2: [4, 5, 6],
    arr3: [7, 8, 9],
    each: function (callback) {
        const all = [].concat(this.arr1, this.arr2, this.arr3);
        for (let i of all) {
            callback(i)
        }
    },
  // 普通迭代代码 ===============================
  [Symbol.iterator]: function () {
        const all = [...this.arr1, ...this.arr2, ...this.arr3];
        let index = 0;
        return {
            next: function() {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }
  //简化了迭代代码 ============================================
    *[Symbol.iterator]() {
        const all = [...this.arr1,...this.arr2,...this.arr3];
        for(let i of all) {
            yield i
        }
    }

}

obj.each(function (item) {
    console.log(item);
})
console.log('=========================');

for (let i of obj) {
    console.log(i);
}
```

## ECMAScript 2016

```javascript
// ===================================================================
// Array.prototype.includes:用来检测一个数组种是否存在某个成员,返回布尔值
const arr = [0, NaN, true, false];

// 之前的方法 Array.indexOf():获取成员下表，没有就返回-1
console.log(arr.indexOf(NaN)); // -1  (不能返回NaN得下标)

// incluedes方法
console.log(arr.includes(NaN)); // true


// ======================================================================
// 指数操作符

// 之前的方法 Math.pow()

console.log(Math.pow(2,3)); // 8

// ** 方法

console.log(2 ** 3); // 8
```

## ECMAScript 2017

```javascript
// Object得三个扩展方法=========================================

const obj = {
    a: 1,
    b: 2,
    c: 3
}

// Object.values(obj): 返回对象得键值数组 ============================
console.log(Object.values(obj)); // [1,2,3]

// Object.entries(): 以数组的形式返回对象得键值对=============================
console.log(Object.entries(obj)); // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

for (const [key, value] of Object.entries(obj)) {
    console.log(key,value);
}

// 将普通对象转换成Map类型对象 ==================================
const map = new Map(Object.entries(obj));
console.log(map);// Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }   

// ==========================================================
// Object.getOwnPropertyDescriptors（）获取对象得完整描述信息 
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//  a: { value: 1, writable: true, enumerable: 
//    true, configurable: true },
//      b: { value: 2, writable: true, enumerable: 
//    true, configurable: true },
//      c: { value: 3, writable: true, enumerable: 
//    true, configurable: true }
//    }

// 使用场景：复制对象得get()和set()属性 ========================================

const obj2 = {
    a: 1,
    b: 2,
    get zx () {
        return this.a + this.b;
    }
};
// Object.assign()方法不能复制对象的get()和set()属性============================
const p = Object.assign({},obj2);
p.b = 3
console.log(p.zx); // 3

// ====================================================================
// Object.defineProperties()配合Object.getOwnPropertyDescriptors进行复制
const p2 = Object.getOwnPropertyDescriptors(obj2);
const p3 = Object.defineProperties({},p2)
p3.b = 5;
console.log(p3.zx); // 6

// 字符串填充方法 ===================================================
const books = {
    html :5 ,
    css: 16,
    java: 128
};
// padStart()和padStart()一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
for(const [name,count] of Object.entries(books)) {
    console.log(`${name.padEnd(16,'=')}|${count.toString().padStart(3,'0')}`);
}
// html============|005
// css=============|016
// java============|128

// 允许在函数参数和对象种添加伪逗号 ============================================

function zx(a,) {
    console.log(a);
}

const obj9 = {
    a: 5,
}
```