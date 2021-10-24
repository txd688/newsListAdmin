const Koa = require("koa");
const static = require("koa-static");
const views = require("koa-views");
const router = require("./router");
const koaBody = require("koa-body");
let app = new Koa();

// 引入静态目录
app.use(static(__dirname + "/static"));
// 引入模板
app.use(views(__dirname + "/views", {
    extension: "pug"
}))
app.use(koaBody({
    multipart:true //允许上传文件
}))
// 引入路由，并使用
router(app);
// node项目启动
app.listen(8887,'127.0.0.9', ()=>{
  console.log('127.0.0.9:8887')
});