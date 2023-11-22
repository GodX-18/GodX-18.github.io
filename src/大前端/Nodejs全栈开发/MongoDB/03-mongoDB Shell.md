---
title: mongoDB Shell
order: 3
category:
  - 前端
tag:
  - 数据库
  - noSQL	
---

MongoDB Shell是`mongosh`一个功能齐全的 JavaScript 和 Node.js 16.x REPL环境，用于与 MongoDB 部署交互。您可以使用MongoDB Shell直接对数据库测试查询和操作。

## MongoDB Shell与旧版`mongo`Shell

旧版`mongo`shell 在 MongoDB 5.0 中已弃用，并在 MongoDB 6.0 中删除。与旧版 Shell 相比，新的 MongoDB Shell`mongosh`具有许多优势。新外壳改进了：

- Node.js 与 MongoDB 的兼容性
- 语法高亮
- 命令历史
- 记录

一些旧方法不可用或已被`mongosh`. 为了保持向后兼容性，支持的旧方法`mongosh`使用与 shell 中相应方法相同的语法`mongo`。

## 启动 mongo Shell 并连接到 MongoDB

**连接默认端口上的本地 MongoDB 服务**

您可以在没有任何命令行选项的情况下运行 mongo shell，以使用默认端口 `27017` 连接到在本地主机上运行的 MongoDB 实例： 

```bash
mongosh
```

这相当于以下命令：

```bash
mongosh "mongodb://localhost:27017"
```

**连接非默认端口上的本地 MongoDB 服务**

要指定要连接到本地主机的端口，您可以使用：

- 连接字符串与所选端口
- `--port`命令行选项

例如，以下命令连接到在本地主机端口 28015 上运行的部署：

```bash
mongosh "mongodb://localhost:28015"
# 简写
mongosh --port 28015
```

**连接远程主机上的 MongoDB 服务**

要指定远程主机和端口，您可以使用：

- 连接字符串与所选的主机和端口。
- 和命令行选项`--host`。`--port`如果省略该 `--port`选项，`mongosh`则使用默认端口 27017。

例如，以下命令连接到在主机`mongodb0.example.com`和端口 28015 上运行的 MongoDB 部署：

```bash
mongosh "mongodb://mongodb0.example.com:28015"
# 另一种写法
mongosh --host mongodb0.example.com --port 28015
```

**[指定连接选项](https://www.mongodb.com/docs/mongodb-shell/connect/#specify-connection-options)**

指定不同的连接选项以连接到不同类型的部署。官网目前有六种连接选项，这里只列举其中一个说明。

**通过身份验证连接**

要连接到需要身份验证的 MongoDB 部署，请使用 [`--username`](https://www.mongodb.com/docs/mongodb-shell/reference/options/#std-option-mongosh.--username)和[`--authenticationDatabase`](https://www.mongodb.com/docs/mongodb-shell/reference/options/#std-option-mongosh.--authenticationDatabase)选项。`mongosh`提示您输入密码，密码会在您键入时隐藏。

例如，要以数据库用户身份进行身份验证`alice`，`admin` 请运行以下命令：

```bash
mongosh "mongodb://mongodb0.example.com:28015" --username alice --authenticationDatabase admin --password
```

:::tip

注意：如果您指定--password而不输入用户密码，则外壳程序将提示您输入密码。

:::

## 断开连接

要断开与部署的连接并退出`mongosh`，请执行以下操作之一：

- 输入`.exit`、`exit`、 或`exit()`。
- 键入`quit`或`quit()`。
- 按`Ctrl`+ `D`。
- 按`Ctrl`+`C`两次。

## 常用命令

MongoDB Shell是一个交互式的JavaScript接口，可以用来操作MongoDB数据库。以下是一些常用的MongoDB Shell命令的总结：

- 数据库操作
  - `show dbs`：显示所有数据库
  - `db`：显示当前使用的数据库
  - `use <db>`：切换到指定的数据库，如果不存在则创建
  - `db.dropDatabase()`：删除当前数据库
  - `db.copyDatabase(fromdb, todb, fromhost)`：从指定的主机上复制一个数据库到另一个数据库
  - `db.cloneDatabase(fromhost)`：从指定的主机上克隆一个数据库
  - `db.stats()`：显示当前数据库的状态信息
  - `db.version()`：显示当前数据库的版本信息
  - `db.getMongo()`：显示当前数据库的连接机器地址
  - `db.repairDatabase()`：修复当前数据库，清除数据碎片，释放空间
- 集合操作
  - `show collections`：显示当前数据库中的所有集合
  - `db.createCollection(name, options)`：创建一个集合，可以指定选项，如大小、最大文档数等
  - `db.<collection>.drop()`：删除一个集合
  - `db.<collection>.renameCollection(newname)`：重命名一个集合
  - `db.<collection>.stats()`：显示一个集合的状态信息
- 文档操作
  - `db.<collection>.find(query, projection)`：查询一个集合中的文档，可以指定查询条件和投影字段
  - `db.<collection>.findOne(query, projection)`：查询一个集合中的第一个文档，可以指定查询条件和投影字段
  - `db.<collection>.insert(doc)`：向一个集合中插入一个或多个文档
  - `db.<collection>.update(query, update, options)`：更新一个集合中的一个或多个文档，可以指定更新条件、更新内容和选项，如是否多条、是否插入等
  - `db.<collection>.remove(query, justOne)`：删除一个集合中的一个或多个文档，可以指定删除条件和是否只删除一条
  - `db.<collection>.count(query)`：统计一个集合中符合条件的文档数
  - `db.<collection>.distinct(field, query)`：查询一个集合中某个字段的去重值，可以指定查询条件
  - `db.<collection>.aggregate(pipeline, options)`：对一个集合中的文档进行聚合操作，可以指定管道阶段和选项
- 索引操作
  - `db.<collection>.createIndex(keys, options)`：为一个集合创建一个或多个索引，可以指定索引键和选项，如唯一性、过期时间等
  - `db.<collection>.dropIndex(name)`：删除一个集合中的指定索引
  - `db.<collection>.dropIndexes()`：删除一个集合中的所有索引
  - `db.<collection>.getIndexes()`：获取一个集合中的所有索引信息
- 用户操作
  - `show users`：显示当前数据库中的所有用户
  - `show roles`：显示当前数据库中的所有角色
  - `db.createUser(user)`：创建一个用户，可以指定用户名、密码、角色等信息
  - `db.dropUser(username)`：删除一个用户
  - `db.auth(username, password)`：对当前数据库进行认证

以上是一些常用的MongoDB Shell命令，更多详细信息可以参考[官方文档](https://www.cnblogs.com/zhangyangdev/p/11546063.html)或者[这篇文章](https://zhuanlan.zhihu.com/p/101297478)。