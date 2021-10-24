const newRouter = require("./routers/newsRouter");
const adminRouter = require("./routers/adminRouter");
const Router = require("koa-router");
let router = new Router();

module.exports = function(app){
    router.get("/",ctx=>{
        ctx.body = "hello"
    })
    app.use(newRouter.routes());
    app.use(adminRouter.routes());
    app.use(router.routes());
}