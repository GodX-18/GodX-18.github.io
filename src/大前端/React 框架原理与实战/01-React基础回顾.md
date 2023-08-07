---
title: React 基础回顾
icon: structure
order: 1
category:
  - 前端
tag:
  - React
---

## React 介绍

* React 是一个用来构建用户界面的 JS 库
* 组件化开发

## JSX 语法

* JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签
* 实际上就是 `React.createElement` 语法糖，目的就是让开发人员更加舒适的去构建用户界面代码
* 在 React 代码执行之前，Babel 会将 JSX 语法转换为标准的 JS API

### 如何在 JSX 中使用表达式

**用`{}`包裹**

```jsx
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const element = <h1>Hello, {formatName(user)}!</h1>;
```

**JSX 本身就是一种表达式，可以赋值给变量，也可以当作参数、返回值**

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### 属性

**如果属性为字符串类型，需要加引号，属性名称推荐采用驼峰命名法**

```jsx
const element = <div sendType="hello"></div>;
```

**如果属性值为 JS 表达式，属性值外面加大括号**

```jsx
const element = <img src={user.avatarUrl} />;
```

:::tip

注意大括号外面不能加引号，JSX 会将引号当中的内容识别为字符串而不是表达式

:::

### JSX 单标签必须闭合

**如果 JSX 是单标签，必须闭合，否则报错。**

```jsx
const element = <img src={user.avatarUrl} />
const element = <input type="text"/>
```

### className

JSX 中标记类名需要使用`className`，而不是`class`

```jsx
const element = <img src={user.avatarUrl} className="rounded"/>;
```

### JSX 自动展开数组

```jsx
const ary = [<p>哈哈</p>, <p>呵呵</p>, <p>嘿嘿</p>];
const element = (
	<div>{ary}</div>
);
// 解析后
/*
	<div>
		<p>哈哈</p>
		<p>呵呵</p>
		<p>嘿嘿</p>
	</div>
*/
```

### 三元运算

```jsx
{ boolean ? <div>Hello React</div> : null }
{ boolean && <div>Hello React</div> }
```

:::tip

JSX 中 布尔值和 `null` 还有 `undefined`不会在页面中显示

:::

### 循环

**React 中没有指令，直接使用 JS 原生方法**

```jsx
const persons = [{
  id: 1,
  name: '张三',
  age: 20
}, {
  id: 2,
  name: '李四',
  age: 15
}, {
  id: 3,
  name: '王五',
  age: 22
}]

<ul>
  { persons.map(person => <li key={person.id}> {person.name} {person.age} </li>) }
</ul>
```

### 事件

> 函数组件用法比价简单，这里主要介绍一下类组件。

**方式一：在回调函数中使用箭头函数，直接在 render() 里写行内的箭头函数(不推荐)**

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Box extends Component {
  handleClick(e,val){
  	console.log(e,val);
  }
  render() {
    return (
      <button onClick={(e)=>this.handleClick(e,'aa')}>添加</button>
    );
  }
}

ReactDOM.render(
  <Box />,
  document.getElementById('root')
);
```

:::tip

这种写法存在的问题就是，当每次执行render() 的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。

:::

**方式二：在 render() 方法中，使用 bind 绑定 this(不推荐)**

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Box extends Component {
	handleClick(val,e) {	//事件对象e要放在最后
		console.log(val,e);
	}
	render() {
		return (
			<button onClick={this.handleClick.bind(this, 'aa')}>添加</button>
		);
	}
}

ReactDOM.render(
  <Box />,
  document.getElementById('root')
);
```

:::tip

直接在组件内定义一个非箭头函数的方法，然后在render里直接使用`onClick={this.handleClick.bind(this)}`，这种方式的缺点是，每次都使用 bind 绑定 this，代码会冗余

:::

**方式三：使用属性初始化器来正确的绑定回调函数(推荐)**

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Box extends Component {
	handleClick =(e)=>{
		console.log(e);
	}
	render() {
		return (
			<button onClick={this.handleClick}>添加</button>
		);
	}
}

ReactDOM.render(
  <Box />,
  document.getElementById('root')
);
```

:::tip

在组件内使用箭头函数定义一个方法，这种方式的缺点是不能自定义传参

:::

**方法四：直接在组件内定义一个非箭头函数的方法，然后在constructor里bind(this)(推荐)**

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Box extends Component {
	constructor(){
		super();
		this.myhandleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		console.log(e);
	}
	render() {
		return (
			<button onClick={this.myhandleClick}>添加</button>
		);
	}
}

ReactDOM.render(
  <Box />,
  document.getElementById('root')
);
```

:::tip

这种方式的优点是性能比较好，不管render()执行多少次，最终都指向同一个引用。这种方式的缺点是不能自定义传参。

:::

### 样式

**行内样式**

```jsx
class App extends Component {
  render() {
    const style = {width: 200, height: 200, backgroundColor: 'red'};
    return <div style={style}></div>
  }
}
```

**外链样式（样式分离）**

```jsx
// Button.js
import styles from './Button.module.css';
class Button extends Component {
  render() {
    return <button className={styles.error}>Error Button</button>;
  }
}
```

**全局样式**

```js
import './styles.css'
```

### ref 属性

**createRef**（获取元素）

```jsx
class Input extends Component {
  constructor() {
    super()
    this.inputRef = React.createRef()
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <button onClick={() => console.log(this.inputRef.current)}> button </button>
      </div>
    )
  }
}
```

**函数参数**（获取元素）

```jsx
class Input extends Component {
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={() => console.log(this.input)}>button</button>
      </div>
    )
  }
}
```

**ref 字符串**（获取元素）

不推荐使用，在严格模式下报错。

```jsx
class Input extends Component {
  render() {
    return (
      <div>
        <input type="text" ref="username" />
        <button onClick={() => console.log(this.refs.username)}>button</button>
      </div>
    )
  }
}
```

**获取组件实例**

```jsx
// Input.js
class Input extends Component {
  constructor() {
    super()
    this.inputRef = React.createRef()
    this.focusInput = this.focusInput.bind(this)
  }
  focusInput() {
    this.inputRef.current.focus()
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
      </div>
    )
  }
}
```

```jsx
// App.js
class App extends Component {
  constructor() {
    super()
    this.InputComponentRef = React.createRef()
  }
  render() {
    return (
      <div className="App">
        <Input ref={this.InputComponentRef} />
        <button onClick={() => this.InputComponentRef.current.focusInput()}>button</button>
      </div>
    )
}
```

![5](https://raw.githubusercontent.com/GodX-18/picBed/main/5.gif)

## 组件

### 什么是组件

React 是基于组件的方式进行用户界面开发的. 组件可以理解为对页面中某一块区域的封装。

![image-20230708064941642](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230708064941642.png)

### 创建组件

**类组件**

```jsx
import React, { Component } from 'react';
class App extends Component {
    render () {
        return <div>Hello, 我是类组件</div>
    }
}
```

**函数组件**

```jsx
import React, { Component } from 'react';
class App extends Component {
    render () {
        return <div>Hello, 我是类组件</div>
    
}
```

::: tip

1. 组件名称首字母必须大写，用以区分组件和普通标签。
2. jsx语法外层必须有一个根元素

:::

### 设置默认 props 值

**函数组件**

```jsx
function ThemedButton(props) {
}
ThemedButton.defaultProps = {
  theme: "secondary",
  label: "Button Text"
};
```

**类组件**

```jsx
class App extends Component {
    static defaultProps = {}
}
```

### 组件 children (插槽)

**通过 props.children 属性可以获取到在调用组件时填充到组件标签内部的内容。**

```jsx
<Person>组件内部的内容</Person>
```

```jsx
const Person = (props) => {
    return (
    	<div>{props.children}</div>
    );
}
```

### 单项数据流

1. 在React中, 关于数据流动有一条原则, 就是单向数据流动, 自顶向下, 从父组件到子组件.
2. 单向数据流特性要求我们共享数据要放置在上层组件中.
3. 子组件通过调用父组件传递过来的方法更改数据.
4. 当数据发生更改时, React会重新渲染组件树.
5. 单向数据流使组件之间的数据流动变得可预测. 使得定位程序错误变得简单.

![image-20230708073735407](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230708073735407.png)

### 类组件状态

**定义组件状态**

类组件除了能够从外部 (props) 接收状态数据以外还可以拥有自己的状态 (state)，此状态在组件内部可以被更新，状态更新 DOM 更新。

组件内部的状态数据被存储在组件类中的 state 属性中，state 属性值为对象类型，属性名称固定不可更改。

```jsx
class App extends Component {
  constructor () {
    super()
    this.state = {
      person: { name: '张三', age: 20 },
    }
  }
  render () {
    return (
      <div>
        {this.state.person.name}
        {this.state.person.age}
      </div>
    );
  }
}
```

**更改组件状态**

state 状态对象中的数据不可直接更改，如果直接更改 DOM 不会被更新，要更改 state 状态数据需要使用 setState方法。

```jsx
class App extends Component {
  constructor () {
    this.state = {
      person: { name: '张三', age: 20 },
    }
    this.changePerson = this.changePerson.bind(this)
  }
	changePerson () {
    this.setState({
      person: {
        name: '李四',
        age: 15
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.person.name}
        {this.state.person.age}
        <button onClick={this.changePerson}>按钮</button>
      </div>
    );
  }
}
```

**双向数据绑定**

双向数据绑定是指，组件类中更新了状态，DOM 状态同步更新，DOM 更改了状态，组件类中同步更新。组件 <=> 视图。

要实现双向数据绑定需要用到表单元素和 state 状态对象。

```jsx
class App extends Component {
  constructor () {
    this.state = {
      name: "张三"
    }
    this.nameChanged = this.nameChanged.bind(this)
  }
  nameChanged (event) {
    this.setState({name: event.target.value});
  }
  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <Person name={this.state.name} changed={this.nameChanged}/>
      </div>
    )
  }
}
```

```jsx
const Person = props => {
	return <input type="text" value={props.name} onChange={props.changed}/>;
}
```

### 类组件生命周期函数

![image-20230711090754008](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230711090754008.png)

- constructor：构造函数，初始化 state 和绑定方法。
- render：渲染函数，返回一个 React 元素。
- shouldComponentUpdate：组件更新前的钩子函数，返回一个布尔值，表示是否需要更新组件。
- componentDidMount：组件挂载后的钩子函数，一般用于获取数据。
- componentDidUpdate：组件更新后的钩子函数，一般用于更新数据。
- componentWillUnmount：组件卸载前的钩子函数，一般用于清理定时器等。

**在组件完成更新之前需要做某种逻辑或者计算，就需要用到快照**

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {}
```

**getSnapshotBeforeUpdate 方法会在组件完成更新之前执行，用于执行某种逻辑或计算，返回值可以在 componentDidUpdate 方法中的第三个参数中获取，就是说在组件更新之后可以拿到这个值再去做其他事情。**

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  return 'snapshot'
}
```

### Context

通过 Context 可以跨层级传递数据

![image-20230711095213559](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230711095213559.png)

**第一种用法：使用 Consumer 组件**

```jsx
// userContext.js
import React from "react"

const userContext = React.createContext("default value")
const UserProvider = userContext.Provider
const UserConsumer = userContext.Consumer

export { UserProvider, UserConsumer }
```

```jsx
// App.js
import { UserProvider } from "./userContext"
class App extends Component {
  render() {
    return (
      <UserProvider value="Hello React Context">
        <A />
      </UserProvider>
    )
  }
}
```

```jsx
// C.js
import { UserConsumer } from "./userContext"

export class C extends Component {
  render() {
    return (
      <div>
        <UserConsumer>
          {username => {
            return <div>{username}</div>
          }}
        </UserConsumer>
      </div>
    )
  }
}
```

**第二种用法**

```jsx
// userContext.js
import * as React from "react";

const userContext = React.createContext("default value");

export default userContext;
```

```jsx
// App.js
import UserContext from "./userContext"
class App extends Component {
  render() {
    return (
      <UserContext.Provider value="Hello React Context">
        <A />
      </UserContext.Provider>
    )
  }
}
```

```jsx
import * as React from "react";
import userContext from "./utils/context";

export function Child2() {
  const user = React.useContext(userContext);
  return <div>{user}孙子</div>;
}
```

## 表单回顾

### 受控表单

**表单控件中的值由组件的 state 对象来管理，state对象中存储的值和表单控件中的值时同步状态的**

```jsx
class App extends Component {
  constructor () {
    this.state = { username: "" }
    this.nameChanged = this.nameChanged.bind(this)
  }
  
  nameChanged (e) {
    this.setState({username: e.target.value})
  }
  render() {
    return (
      <form>
        <p>{this.state.username}</p>
        <input type="text" value={this.state.username} onChange={this.nameChanged}/>
      </form>
    )
  }
}
```

### 非受控表单

**表单元素的值由 DOM 元素本身管理。**

```jsx
class App extends Component {
  constructor () {
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    console.log(this.username.value)
    e.preventDefault();
  }
  render(
    <form onSubmit={this.onSubmit}>
      <input type="text" ref={username => this.username = username}/>
    </form>
  )
}
```

