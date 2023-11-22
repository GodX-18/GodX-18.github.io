---
title: 在 Node.js 中操作 MongoDB
order: 6
category:
  - 前端
tag:
  - 数据库
  - noSQL	
---

参考：

- 在服务端操作 MongoDB：https://www.mongodb.com/docs/drivers/
- 在 Node.js 中操作 MongoDB：https://www.mongodb.com/docs/drivers/node/current/usage-examples/

## 初始化示例项目

```shell
mkdir node-mongodb-demo

cd node-mongodb-demo

npm init -y

npm install mongodb
```

## 连接到 MongoDB

```javascript
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
```

## CRUD 操作

CRUD（创建，读取，更新，删除）操作使您可以处理存储在 MongoDB 中的数据。

### 创建文档

插入一个：

```javascript
const pizzaDocument = {
  name: "Neapolitan pizza",
  shape: "round",
  toppings: [ "San Marzano tomatoes", "mozzarella di bufala cheese" ],
};

const result = await pizzaCollection.insertOne(pizzaDocument);

console.dir(result.insertedCount);
```

插入多个：

```javascript
const pizzaDocuments = [
  { name: "Sicilian pizza", shape: "square" },
  { name: "New York pizza", shape: "round" },
  { name: "Grandma pizza", shape: "square" },
];

const result = pizzaCollection.insertMany(pizzaDocuments);

console.dir(result.insertedCount);
```

### 查询文档

```javascript
  const query = { name: "zx" };
  // 查询所有，返回值为 promise 对象
  const data = await testDb.find(query);
  console.log(await data.toArray());
  // 查询单个（只返回查到的第一个值）
  const data2 = await testDb.findOne(query);
  console.log(data2);
```

### 删除文档

```javascript
const doc = {
  pageViews: {
    $gt: 10,
    $lt: 32768
  }
};

// 删除符合条件的单个文档
const deleteResult = await collection.deleteOne(doc);
console.dir(deleteResult.deletedCount);

// 删除符合条件的多个文档
const deleteManyResult = await collection.deleteMany(doc);
console.dir(deleteManyResult.deletedCount);
```

### 修改文档

更新1个文档：

```javascript
const filter = { _id: 465 };
// update the value of the 'z' field to 42
const updateDocument = {
   $set: {
      z: 42,
   },
};

// 更新多个
const result = await collection.updateOne(filter, updateDocument);

// 更新多个
const result = await collection.updateMany(filter, updateDocument);
```

替换文档：

```javascript
const filter = { _id: 465 };
// replace the matched document with the replacement document
const replacementDocument = {
   z: 42,
};
const result = await collection.replaceOne(filter, replacementDocument);
```