// 连接数据库
const mysql = require("mysql");

const config = {
  // host: "121.5.240.120",
  // user: "root",
  // password: "812875759",
  // database: "zzp",
   host: "127.0.0.1",
   user: "root",
   password: "812875759",
   database: "zzp",
};
const client = mysql.createConnection(config);

// sql语句
function sqlQuery(sql, callback) {
  client.query(sql, (err, result) => {
    if (err) {
      console.log('[SELECT ERROR]:',err.message);
      return console.log("错误");
    }
    callback(result);
  });
}

module.exports = sqlQuery;
