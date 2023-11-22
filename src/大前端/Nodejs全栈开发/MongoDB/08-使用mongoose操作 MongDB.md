---
title: 使用 mongoose 操作 MongDB
order: 8
category:
  - 前端
tag:
  - 数据库
  - noSQL	
---

## 简介

* 之前我们都是通过shell来完成对数据库的各种操作的，在开发中大部分时候我们都需要通过程序来完成对数据库的操作。
* 而Mongoose就是一个让我们可以通过Node来操作MongoDB的模块。
* Mongoose是一个对象文档模型（ODM）库，它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。
* 在大多数情况下，它被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处

## Mongoose 的好处

* 可以为文档创建一个模式结构（Schema）
* 可以对模型中的对象/文档进行验证
* 数据可以通过类型转换转换为对象模型
* 可以使用中间件来应用业务逻辑挂钩
* 比Node原生的MongoDB驱动更容易操作

## 新的对象

**mongoose中为我们提供了几个新的对象：**

* Schema：对象定义约束了数据库中的文档结构
* Model：Model对象作为集合中的所有文档的表示，相当于MongoDB数据库中的集合collection
* Document：表示集合中的具体文档，相当于集合中的一个具体的文档

## 通过mongoose连接MongoDB

* 使用Mongoose必须先安装mongoose包
  ```bash
  npm install mongoose
  ```

* 加载Mongoose

  ```js
  const mongoose = require（"mongoose"）
  ```

* 连接数据库

  ```js
  mongoose.connect（"mongodb://127.0.0.1/mg_test"）
  ```

* 断开连接

  ```js
  mongoose.disconnect()
  ```

## connection

* 一旦连接了MongoDB数据库，底层的Connection对象就可以通过mongoose模块的connection属性来访问。
* connection对象是对数据库连接的抽象，它提供了对象连接、底层的Db对象和表示结合的Model对象的访问。
* 并且可以对connection对象上的一些事件进行监听，来获悉数据库连接的开始与端开。
* 比如，可以通过open和close事件来监控连接的打开和关闭。

## 封装工具类

**connect-mongo.js**

用来连接 mongoDB 数据库

```js
const mongoose = require("mongoose");

async function connectMongo(url) {
  // 连接 mongoDB 数据库
  // mongoose.connect("mongodb://数据库的ip地址:端口号/数据库名");
  // 如果端口号是默认端口号 27017 可以省略不写
  await mongoose.connect(url);
  return mongoose;
}
mongoose.connection.once("open", () => {
  console.log("GodX------>log数据库连接成功");
});

mongoose.connection.once("close", () => {
  console.log("GodX------>log数据库连接已断开");
});

module.exports = connectMongo;

```

## 定义模型

在项目根目录下新建 models 文件夹，在其中定义 schema 模型，例如 students.js：

```js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: "male" // 默认值
  }
});

// 通过 schema 来创建 Model
// Model 代表的是数据库的集合，通过 Model 才能对数据库进行操作
// mongoose 会自动将集合名变成复数 zx ---> zxes / student -----> students
const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;
```

## 基本操作-模型层

### 新增

```js
const connectMongo = require("./tools/connect-mongo.js");
const ZxModel = require("./models/students.js");

async function main() {
  await connectMongo("mongodb://127.0.0.1:27017/test");
  //todo 新增： 向数据库中插入一个文档
    ZxModel.create([
      {
        name: "a",
        age: 18
      },
      {
        name: "b",
        age: 20
      }
    ])
      .then((res) => {
        console.log("GodX------>log插入成功！");
      })
      .catch((err) => {
        console.log("GodX------>log", err);
      });
}
main().catch((err) => console.log(err));
```

### 查询

```js
  // 返回值为数组
  // 投影有两种传递方式
  //* {name:1,_id:0}
  //* "name -_id"
  ZxModel.find({}, "name age -_id", {
    skip: 2,
    limit: 1
  }).then((res) => {
    // console.log("GodX------>logfind", res);
  });
  ZxModel.findOne({}).then((res) => {
    // console.log("GodX------>logfindOne", res);
  });
  ZxModel.findById("652745ec7e83c5bb73097965").then((res) => {
    // 查询出来的结果 document 就是 Model 的实例
    // console.log("GodX------>log", res instanceof ZxModel); // true
    // console.log("GodX------>logfindById", res);
  });
```

### 统计

```js
 ZxModel.count({ name: "zx2" }).then((num) => {
    console.log("GodX------>lognum", num);
  });
```

### 修改

```js
ZxModel.updateOne({ name: "a" }, { $set: { age: 28 } }).then((res) => {
    console.log("GodX------>logupdateOne", res);
  });
  ZxModel.replaceOne({ name: "a" }, { name: "ab", age: 100 }).then((res) => {
    console.log("GodX------>logupdateOne", res);
  });
```

### 删除

```js
 ZxModel.deleteOne({ name: "a" });
 ZxModel.deleteMany({ name: "zx" });
```

## 基本操作-文档层

### 创建文档

```js
const connectMongo = require("./tools/connect-mongo.js");
const StudentModel = require("./models/students.js");
async function main() {
  await connectMongo("mongodb://127.0.0.1:27017/test");
  //todo 创建一个 Document
  let stu = new StudentModel({
    name: "小王",
    age: 18,
    gender: "male"
  });
}

main().catch((err) => console.log(err));
```

### 保存

```js
 //todo 保存
     stu.save().catch((err) => {
       console.log(err);
     });
```

### 格式转换

```js
  //todo JSON转换
     console.log(stu.toJSON());
  //todo Object 转换
     stu = stu.toObject();
     delete stu.age;
     console.log(stu);
```

:::tip

**toJSON**

1. 针对从数据库检索的文档：你可以在从数据库检索的文档上使用`toJSON()`方法，以将这些文档转换为普通的JavaScript对象，便于在应用程序中使用或序列化为JSON格式。
2. 针对未保存的新文档：即使文档尚未保存到数据库，也可以使用`toJSON()`方法将其转换为普通JavaScript对象，以在应用程序中使用。
3. 针对已保存到数据库的文档：同样，已保存到数据库的文档也可以使用`toJSON()`方法，以在应用程序中以普通JavaScript对象的形式使用它们。

**toObject**

以下是一些使用场景，适合使用 `toObject()` 方法：

1. **从 Mongoose 文档中排除一些属性：** 有时，你可能希望从 Mongoose 文档中排除某些属性，以便不会在输出中显示这些属性。`toObject()` 方法允许你将文档转换为不包含这些属性的普通 JavaScript 对象。

   ```
   const document = await MyModel.findById(someId);
   const plainObject = document.toObject(); // 转换为普通对象，不包含 Mongoose 特定属性
   ```

2. **自定义属性添加：** 你可以使用 `toObject()` 方法将文档转换为普通 JavaScript 对象，并添加自定义属性，以满足特定的需求。

   ```
   const document = await MyModel.findById(someId);
   const plainObject = document.toObject();
   plainObject.customProperty = 'Custom Value';
   ```

3. **序列化和数据传输：** 在某些情况下，你可能需要将 Mongoose 文档转换为普通对象，以便于在网络传输或将文档存储在缓存中。`toObject()` 可以帮助你将文档转换为适合这些目的的纯数据对象。

   ```
   const document = await MyModel.findById(someId);
   const plainObject = document.toObject();
   // 将 plainObject 传输到客户端或存储在缓存中
   ```

4. **控制对象的可见性：** 使用 `toObject()` 可以控制对象的可见性。例如，你可以排除某些敏感属性，以便不会被意外地暴露在应用程序的输出中。

   ```
   const document = await MyModel.findById(someId);
   const plainObject = document.toObject();
   delete plainObject.sensitiveField; // 排除敏感字段
   ```

:::

### 修改

```js
StudentModel.findOne({
    name: "小明"
  }).then(async (doc) => {
    //* 第一种
    doc.age = 29;
    doc.save();
    //* 第二种
    doc
      .updateOne({
        $set: {
          age: 24
        }
      })
      //! 必须得有回调，否者修改无效！
      .then((res) => {
        console.log("修改成功！", res);
      })
      .catch((err) => {
        console.log("修改失败！", err);
      });
    //* 第三种
    doc.set("name", "小明2");
    doc.save();
```

### 删除

:::tip

Mongoose 4.x 版本后，只能通过模型上的方法进行删除 remove/deleteOne/deleteMany

:::

### 获取文档的属性值

```js
 //* 第一种
  const age = await doc.get("age");
  console.log(age);
 //* 第二种
  console.log(doc.age);
```

## 完整代码

https://github.com/GodX-18/study-code/tree/master/%E5%A4%A7%E5%89%8D%E7%AB%AF/mongodb/mongoose-demo