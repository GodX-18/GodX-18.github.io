---
title: MongoDB 数据库结合 Web 服务
order: 7
category:
  - 前端
tag:
  - 数据库
  - noSQL	
---

![image-20231011151405107](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231011151405107.png)

在这次演示中，我们来搭建一个支持 MongoDB 数据库 CRUD 操作的 Web 接口服务，用来进行博客文章的管理。

通过本实战案例，希望你会对数据库及 Web 开发有更深一步的理解。

## 接口设计

基于 RESTful 接口规范。

- [理解 RESTful 架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

### 创建文章

- 请求路径：`POST` /articles
- 请求参数：Body

- title
- description
- body
- tagList
- 数据格式：application/json

请求体示例：

```json
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

返回数据示例：

- 状态码：201
- 响应数据：

```json
{
  "article": {
    "_id": 123,
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z"
  }
}
```

### 获取文章列表

- 请求路径：`GET` /articles
- 请求参数（Query）
- _page：页码_
- size：每页大小

响应数据示例：

- 状态码：200
- 响应数据：

```json
{
  "articles":[{
    "_id": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z"
  }, {
    "_id": "how-to-train-your-dragon-2",
    "title": "How to train your dragon 2",
    "description": "So toothless",
    "body": "It a dragon",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z"
  }],
  "articlesCount": 2
}
```

### 获取单个文章

- 请求路径：`GET` /articles/:id

响应数据示例：

- 状态码：200
- 响应数据：

```json
{
  "article": {
    "_id": "dsa7dsa",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z"
  }
}
```

### 更新文章

- 请求路径：`PATCH` /artilces/:id
- 请求参数（Body）
- title
- description
- body
- tagList

请求体示例：

- 状态码：201
- 响应数据：

```json
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

响应示例：

```json
{
  "article": {
    "_id": 123,
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z"
  }
}
```

### 删除文章

- 接口路径：`DELETE` /articles/:id

响应数据：

- 状态码：204
- 数据：

```json
{}
```

## 准备工作

```shell
mkdir article-bed

cd api-serve

npm init -y

npm i express mongodb
```

### 使用 Express 快速创建 Web 服务

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### 路由设计

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/articles', (req, res) => {
  res.send('post /articles')
})

app.get('/articles', (req, res) => {
  res.send('get /articles')
})

app.get('/articles/:id', (req, res) => {
  res.send('get /articles/:id')
})

app.patch('/articles/:id', (req, res) => {
  res.send('patch /articles/:id')
})

app.delete('/articles/:id', (req, res) => {
  res.send('delete /articles/:id')
})
```

### 处理 Body 请求数据

```javascript
// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
// 注意：一定要在使用之前就挂载这个中间件
app.use(express.json())
```

### 错误处理

```js
// 它之前的所有路由中调用 next(err) 就会进入这里
//! 注意: 4个参数，缺一不可，否则会当作普通的路由处理
app.use((err, req, res, next) => {
  res.status(500).json({
    code: 500,
    msg: err.message
  });
});
```

## 创建文章

```javascript
app.post('/articles', async (req, res, next) => {
  try {
    // 1. 获取客户端表单数据
    const { article } = req.body

    // 2. 数据验证
    if (!article || !article.title || !article.description || !article.body) {
      return res.status(422).json({
        error: '请求参数不符合规则要求'
      })
    }

    // 3. 把验证通过的数据插入数据库中
    //    成功 -> 发送成功响应
    //    失败 -> 发送失败响应
    await dbClient.connect()

    const collection = dbClient.db('test').collection('articles')

    article.createdAt = new Date()
    article.updatedAt = new Date()
    const ret = await collection.insertOne(article)

    article._id = ret.insertedId
    
    res.status(201).json({
      article
    })
  } catch (err) {
    // 由错误处理中间件统一处理
    next(err)
    // res.status(500).json({
    //   error: err.message
    // })
  }
})
```

## 获取文章列表

```javascript
app.get('/articles', async (req, res, next) => {
  try {
    let { _page = 1, _size = 10 } = req.query
    _page = Number.parseInt(_page)
    _size = Number.parseInt(_size)
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const ret = await collection
      .find() // 查询数据
      .skip((_page - 1) * _size) // 跳过多少条 10 1 0 2 10 3 20 n
      .limit(_size) // 拿多少条
    const articles = await ret.toArray()
    const articlesCount = await collection.countDocuments()
    res.status(200).json({
      articles,
      articlesCount
    })
  } catch (err) {
    next(err)
  }
})
```

## 获取单个文章

```javascript
app.get('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')

    const article = await collection.findOne({
      _id: ObjectID(req.params.id)
    })

    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
})
```

## 更新文章

```javascript
app.patch('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')

    await collection.updateOne({
      _id: ObjectID(req.params.id)
    }, {
      $set: req.body.article
    })

    const article = await await collection.findOne({
      _id: ObjectID(req.params.id)
    })

    res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
})
```

## 删除文章

```javascript
app.delete('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    await collection.deleteOne({
      _id: ObjectID(req.params.id)
    })
    res.status(204).json({})
  } catch (err) {
    next(err)
  }
})
```

## 完整代码

```js
// 后端入口模块
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const connectUri = "mongodb://127.0.0.1:27017";
const dbClient = new MongoClient(connectUri);

const app = express();

// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
//! 注意：一定要在使用之前挂载这个中间件
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 新增文章
app.post("/articles", async (req, res, next) => {
  try {
    //* 1. 获取客户端表单数据
    const { article } = req.body;
    //* 2. 数据验证
    if (!article || !article.title || !article.description || !article.body) {
      return res.status(422).json({
        error: "请求参数格式错误！"
      });
    }
    //* 3. 把验证通过的数据插入数据库中
    //  成功 ---> 发送成功响应
    //  失败 ---> 发送失败响应
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    const { acknowledged, insertedId } = await collection.insertOne(article);
    if (acknowledged) {
      res.status(200).json({
        code: 200,
        article: {
          ...article,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }
  } catch (error) {
    // 由错误路由中间件统一处理
    next(error);
  }
});

// 获取文章-分页
app.get("/articles", async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query;
    console.log("GodX------>log", page, size);
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    const ret = await collection
      .find() // 查询数据
      .skip(size * (page - 1)) // 跳过多少条
      .limit(Number(size)); // 拿多少条
    const data = await ret.toArray();
    const total = await collection.countDocuments();
    res.status(200).json({
      code: 200,
      data: {
        list: data,
        total
      }
    });
  } catch (error) {
    // 由错误路由中间件统一处理
    next(error);
  }
});

// 根据ID获取单个文章
app.get("/articles/:id", async (req, res, next) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    const ret = await collection.findOne({
      _id: new ObjectId(req.params.id)
    });
    res.status(200).json({
      code: 200,
      data: ret
    });
  } catch (error) {
    next(error);
  }
});

// 更新文章
app.patch("/articles/:id", async (req, res, next) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    await collection.replaceOne(
      {
        _id: new ObjectId(req.params.id)
      },
      //* 替换
      req.body
      //* 融合
      // {
      //   $set: req.body,
      //   $currentDate: { lastModified: true }
      // }
    );

    res.status(200).json({
      code: 200,
      msg: "更新成功！"
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/articles/:id", (req, res) => {
  res.send("delete /articles/:id");
});

// 它之前的所有路由中调用 next(err) 就会进入这里
//! 注意: 4个参数，缺一不可，否则会当作普通的路由处理
app.use((err, req, res, next) => {
  res.status(500).json({
    code: 500,
    msg: err.message
  });
});

app.listen(3000, () => {
  console.log("GodX------>log服务启动在3000端口");
});

```

