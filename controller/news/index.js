// 新闻列表的控制器 ；
const cons = require("consolidate");
const newModel = require("../../service/news")
module.exports = {
    async showIndex(ctx){
      let page = Number(ctx.query.page) || 1;
      let pageSize = Number(ctx.query.pageSize) || 5;
      let newsData =  await newModel.getData(page, pageSize);
      ctx.status = newsData.status;
      await ctx.render("news/index.pug", newsData);
    },
   async showDetail(ctx){
      let id = ctx.query.id || 1;
      let data =  await newModel.getDetail(id);
      await ctx.render("news/detail.pug", {data});
    }
}