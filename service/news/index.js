const mysql2 = require("mysql2");

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
  async getDetail(id){
    let sql = "SELECT * FROM newslist where id=?";
    try{
      // 查询数据库
      let [rows, fields] = await connection.promise().query(sql, [id]);
      return rows[0]

    }catch(e){
      return {
        status:500
      }
    }
  }
}