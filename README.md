# 在线demo
[在线体验](http://admin.coco-h5.cn/#/)

## 本地部署
本小册介绍的所有代码后面我们会部署到云端，这样就可以在线演示。但是这个可能需要花费一段时间，不过好在我们的代码会逐步完善，我们可以先通过本地模式来部署我们的可视化搭建体系。

## 准备工作
在开始安装之前，请确保你的本地已经安装好了以下工具：
1. [mysql](https://www.runoob.com/mysql/mysql-tutorial.html) 安装使用教程
2. [node](https://www.runoob.com/nodejs/nodejs-tutorial.html) 安装使用教程
3. [git](https://www.runoob.com/git/git-tutorial.html) 安装使用教程

然后我们打开本小册涉及到的所有代码空间[coco-h5](https://github.com/coco-h5)，然后分别 `clone` 以下这些项目：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57bd4df4b71c48d59a0548904e20a317~tplv-k3u1fbpfcp-watermark.image)

* coco-web: 可视化编辑器
* coco-server: 可视化编辑器后台服务，用于模板编译、发布、管理等操作
* coco-template: 基于 `coco` 解耦后的模板
* coco-cli: `coco` 脚手架项目，便捷生成模板、组件
* coco-global-banner: `coco` 体系全局组件，可跨模板使用

## coco-server 部署
server 端部署需要先创建一个数据库 `coco`：
```shell
$ mysql -u root -p

// create database coco;
```
然后装一下依赖：
```shell
$ cd coco-server & npm i
```
接着修改一下我们的数据库配置，可以根据本地 `mysql` 配置来调整：
```js
module.exports = {
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'coco',
    username: 'root',
    password: 'root1234',
    logging: false
  }
};
```
最后:
```shell
$ npm run dev
```
会自动创建 `project`、`template` 数据表。正常启动后，可以看到我们的服务启动 `http://localhost:70001`。

## 发布模板
然后我们需要创建一个模板，用于可视化编辑器选用。找到我们的 `coco-template` 模板，这里我已经创建好了一个简单模板。我们要做的就是发布他：
```shell
$ cd coco-template && npm i
$ npm run release
```

然后我们可以看到经过编译后，代码被发布：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7098693c1e9241c3ba2a3e5081782bc0~tplv-k3u1fbpfcp-watermark.image)

发布完成后，再启动一下预览服务，提供给可视化编辑器 `iframe` url 使用，**注意现在模板服务暂时还没有部署，所以无法使用在线 url**:
```shell
$ npm run serve
// http://localhost:8081
```

**PS: 这里是我自己的演示，我可以发布提交到我自己的 github，你们可以 fork 出来跑这个命令**

## 运行可视化编辑器
最后我们需要对模板页面进行编辑，这里我们需要跑起来 `coco-web` 项目。
```shell
$ cd coco-web && npm i
$ npm run serve
```

然后打开我们的页面 `http://localhost:8080`:

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c9ec2ede5784329a3b9b9aec92c8354~tplv-k3u1fbpfcp-watermark.image)

然后选择刚才发布的模板，输入相关信息：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeb3fc2efad64e9a9eba3b8355cf99d3~tplv-k3u1fbpfcp-watermark.image)

最后就可以看到我们的编辑页了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f379edd62804e5f9f7bbb8cd4b4a92a~tplv-k3u1fbpfcp-watermark.image)

然后我们可以愉快的编辑操作。

## 注意事项：
1. 预览编辑器是通过 `iframe` 的形式引入本地项目，所以确保你的模板服务已经开启：`http://localhost:8081`
2. server 端创建页面依赖于 [github API](https://docs.github.com/en/rest/reference/repos#create-an-organization-repository) 所以我们需要替换一下自己的 `github token`：
```js
// coco-server/app/service/project.js
const octokit = new Octokit({ auth: 'youapitoken' });
```




