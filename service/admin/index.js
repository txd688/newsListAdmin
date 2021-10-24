const mysql2 = require("mysql2");
const fs = require("fs");

// 连接数据库(根据自己数据库进行配置)
const connection = mysql2.createConnection({
  host: 'localhost', // 地址
  user: 'root', // 账号
  password:"",  // 密码
  database: 'test', // 数据库名
  charset:"utf8"
});

module.exports = {
  async getData(page, pageSize){
    let sql = "SELECT * FROM newslist LIMIT ?,?";
    try{
      // 查询数据库
      let [rows, fields] = await connection.promise().query(sql, [(page - 1) * pageSize, pageSize]);
      let count =  await connection.promise().query('SELECT COUNT(id)  FROM newslist');
      count = count?.[0]?.[0]?.['COUNT(id)'] || 0;
      let data = {
        newsData:rows,
        count,
        pageSize,
        page,
        status:200
      };
      return data;
    }catch(e){
      return {
        status:500
      }
    }
  },
  async addNewsData(request){
    // 文件如何存数据库；
    // 把临时路径进行转存；
    if(!fs.existsSync("static/uploads/")){
        fs.mkdirSync("static/uploads/");
    }
    let imgUrl = "无";
    if(request.files.img.name){
      let fileName = Date.parse(new Date()) + '.' + request.files.img.name.split(".")[1];
      fs.writeFileSync("static/uploads/" + fileName, fs.readFileSync(request.files.img.path));
      imgUrl = "/uploads/" + fileName;
    }
    let dateTime = getNowFormatDay(new Date());
    let { title , content, author } = request.body;
    let res = await connection.promise().query("INSERT INTO newslist (title,content,author,imgUrl,addTime) VALUES (?,?,?,?,?)",[title , content, author, imgUrl, dateTime]);
    return res;
  },
  async delList(id){
    let res = await connection.promise().query("DELETE FROM newslist WHERE ID = ?", [id]);
    return res;
  }
}

function getNowFormatDay(nowDate) {
  var char = "-";
  if(nowDate == null){
      nowDate = new Date();
  }
  var day = nowDate.getDate();
  var month = nowDate.getMonth() + 1;//注意月份需要+1
  var year = nowDate.getFullYear();
  //补全0，并拼接
  return year + char + completeDate(month) + char +completeDate(day);
}

function completeDate(value) {
  return value < 10 ? "0"+value:value;
}