const Router = require("koa-router");
const adminController = require("../controller/admin");

let router = new Router({
    prefix:"/admin" // 添加前缀
});

router.get("/index",adminController.showIndex);
router.get("/addNews",adminController.showAddPage);
router.get("/showNewsList",adminController.newsListEdit);
router.post("/addNewsData",adminController.addNewsData);
router.get("/delList",adminController.delList);
module.exports = router;