## node 新闻列表和新闻后管

MVC架构模式，它将应用抽象为3个部分：模型（数据）、视图、控制器（分发器）。

pug 模板引擎  
MySQL  
koa 框架

### 项目使用的插件

 1. koa
 2. koa-router
 3. koa-static
 4. koa-views
 5. axios
 6. pug
 7. mysql2

#### 先依赖安装

npm install

#### 数据库配置

1. 数据库安装：
    可以使用xampp、phpstudy等相关软件安装mysql环境
2. 导入数据库  
    在sql文件夹中的newslist.sql文件
3. 数据库配置：
    在service文件夹中admin/index.js 和 news/index.js 根据自己数据库配置对应账号密码。  
    注：这里sql语句的数据库名是newslist，如果不一致，需要自己修改。

#### 项目启动

node app.js

### 项目说明

实现新闻列表、详情页：

  1. 首页地址：<http://127.0.0.9:8887/news/index>

实现新闻后管页面：新闻添加、新闻列表（带删除功能）  

 1. 首页地址：<http://127.0.0.9:8887/admin/index>
