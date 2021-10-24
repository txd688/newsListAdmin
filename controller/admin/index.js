// 新闻后管 ；
const adminModel = require("../../service/admin");

module.exports = {
  async showIndex(ctx) {
    await ctx.render("admin/index.pug");
  },
  async showAddPage(ctx) {
    await ctx.render("admin/addNews.pug")
  },
  async newsListEdit(ctx){
    let page = Number(ctx.query.page) || 1;
    let pageSize = Number(ctx.query.pageSize) || 5;
    let newsData =  await adminModel.getData(page, pageSize);
    ctx.status = newsData.status;
    await ctx.render("admin/newsListEdit.pug", newsData);
  },
  // 添加数据接口
  async addNewsData(ctx){
    let res = await adminModel.addNewsData(ctx.request);
    let info;
    if(res[0].affectedRows>0){
        info = {
            status:1,
            message:"添加成功"
        }
    }else{
        info = {
            status:1,
            message:"添加失败"
        }
    }
    ctx.body = info;
  },
  // 删除新闻列表接口
  async delList(ctx){
    let id = Number(ctx.query.id);
    if(!id){
      console.log('没有id');
      return;
    }
    let res = await adminModel.delList(id);
    let info;
    if(res[0].affectedRows>0){
        info = {
            status:1,
            message:"删除成功"
        }
    }else{
        info = {
            status:1,
            message:"删除失败"
        }
    }
    ctx.body = info;
  }
}