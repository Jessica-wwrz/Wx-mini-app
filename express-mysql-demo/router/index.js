const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql/mysql");
const config = require('./config.json');
const request = require('request');const { status } = require("express/lib/response");
;

appId = config.appId;
appScrect = config.appScrect;


//设置跨域访问
router.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.sendStatus(200);
  //让options尝试请求快速结束
  else next();
});

router.get("/index/index", (req, res) => {
  res.send({
    code: "200",
    message: "hhhhh",
    data:{'res':'123'},
  });
});
// 查询userinfo表
router.get("/", (req, res) => {
  const sql = "select * from users";
  sqlQuery(sql, (data) => {
    console.log(data)
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 查询报修表
router.get("/api/fixs", (req, res) => {
  const name = req.query.name
  const sql = `select * from fixs where name = '${name}'`;
  sqlQuery(sql, (data) => {
    // console.log(data)
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 按照id查询报修表
router.get("/api/id/fixs", (req, res) => {
  const idx = req.query.id
  const sql = `select * from fixs where idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    // console.log(data)
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 查询所有报修表
router.get("/api/all/fixs", (req, res) => {
  const sql = `select * from fixs`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 按状态查询所有报修表
router.get("/api/status/fixs", (req, res) => {
  const status = req.query.status
  const sql = `select * from fixs where status = '${status}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 按状态和维修人员查询所有报修表
router.get("/api/fixname/fixs", (req, res) => {
  console.log(req.query)
  const {status, fixname} = req.query
  const sql = `select * from fixs where status = '${status}' and repairMan = '${fixname}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 新增维修数据
router.post("/api/addFixInfo", (req, res) => {
    const { idx, name, things, photos, tel, desc, howToFix , process, address, time } = { ...req.body };
    const sql = `insert into fixs values('${idx}', '${name}', '${things}','${photos}', 'loading','${tel}' ,'${desc}' , '${howToFix}' , '${process}','','', '${address}', '${time}')`;
    sqlQuery(sql, (data) => {
      
      res.send({
        code: "200",
        message: "提交成功",
      });
    })
});

// 变更数据状态
router.post("/api/update", (req, res) => {
  const { idx, status} = { ...req.body };
  const sql = `UPDATE fixs SET status = '${status}' WHERE idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "更新成功",
    });
  })
});
// 变更维修数据
router.post("/api/getRepair", (req, res) => {
  const { idx, status, repairMan, fixtelnumber} = { ...req.body };
  const sql = `UPDATE fixs SET status = '${status}' , repairMan = '${repairMan}' , repairManTel = '${fixtelnumber}'  WHERE idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "更新成功",
    });
  })
});
// 删除工单数据
router.post("/api/detele", (req, res) => {
  const { idx } = { ...req.body };
  const sql = `DELETE from fixs where idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "取消成功",
    });
  })
});

//存储用户信息
router.post("/api/saveUser", (req, res) => {
  console.log(req.body)
  const { idx, userName, telNumber, sex, avaterUrl, nickName} = { ...req.body };
  const sql = `insert into fixuser values('${idx}', '${userName}', '${telNumber}','${sex}' , '${avaterUrl}' , '${nickName}')`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "保存成功",
    });
  })
});

// 更新用户信息

router.post("/api/updateUser", (req, res) => {
  console.log(req.body)
  const { idx, userName, telNumber, sex, avaterUrl, nickName} = { ...req.body };
  const sql = `UPDATE fixuser set userName = '${userName}', telNumber = '${telNumber}', sex = '${sex}', avaterUrl =  '${avaterUrl}', nickName = '${nickName}' where idx =  '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "更新成功",
    });
  })
});

// 获取用户信息
router.get("/api/getUser", (req, res) => {
  const name = req.query.name
  const sql = `select * from fixuser where nickName = '${name}'`;
  sqlQuery(sql, (data) => {
    // console.log(data)
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 按照id获取用户信息
router.get("/api/id/getUser", (req, res) => {
  const idx = req.query.idx
  const sql = `select * from fixuser where idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    // console.log(data)
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 获取全部用户信息
router.get("/api/getAllUser", (req, res) => {
  const sql = `select * from fixuser`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 删除用户数据
router.post("/api/user/detele", (req, res) => {
  const { idx } = { ...req.body };
  const sql = `DELETE from fixuser where idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "删除成功",
    });
  })
});
// 小程序登录
router.get("/api/login", (req, res) => {
  console.log(req.query)
  var data = {
    'appid': appId,
    'secret': appScrect,
    'js_code': req.query.code,
    'grant_type': 'authorization_code'
};
var url = 'https://api.weixin.qq.com/sns/jscode2session?' + 'appid=' + data.appid +'&secret=' + data.secret +'&js_code=' +data.js_code +'&grant_type=' + data.grant_type
request.get({
  'url': url
  }, (error, response, body) => {
    // if (!error && response.statusCode === 200) {
    //   let { openid, session_key } = JSON.parse(body)
    //   if ( openid && session_key ){
    //       // let user = await dao.getUserByOpenid(openid) // 查询是不是新用户
    //       let session_id = crypto.createHash('md5').update(openid+session_key).digest('hex')
    //       res.cookie('session_id', session_id, {maxAge: 20*60*1000})
    //       if (user){
    //           req.session.openid = openid
    //           req.session.session_key = session_key
    //           req.session.user = user
    //           res.send(Result.OK)
    //       }else {
    //           res.send(Result.NEW_USER)
    //       }
    //   }else {
    //       res.send(Result.TOKEN_EXPIRED)
    //   }
  // }
  // 将body的内容解析出来
  let abody = JSON.parse(body);
  // 将请求的内容返回给前端
  // res.json(abody)
  // console.log(abody)
  res.send({
      code: "200",
      message: "登录成功",
      data:abody,
    });
})
});

// 维修人员登录
router.post("/api/fix/login", function (req, res) {
  const { username, password } = { ...req.body };
  const sql = `select * from fixpreson where fixname='${username}' and fixpassword='${password}'`;
  sqlQuery(sql, (data) => {
    if (data.length > 0)
      return res.send({
        code: "200",
        result: { token: "4291d7da9005377ec9aec4a71ea837f" },
        message: "登录成功",
      });

    res.send({
      code: "500",
      message: "用户不存在",
    });
  });
});

// 维修人员注册
router.post("/api/fix/register", function (req, res) {
  const {idx, username, password, fixtelnumber, fixAge, goodType, fixAvatarUrl} = { ...req.body };
  const sql = `insert into fixpreson values('${idx}', '${username}', '${password}', '${fixtelnumber}', '${fixAge}', '${goodType}', '${fixAvatarUrl}' )`;;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "注册成功",
    })
  });
});
// 获取全部维修人员信息
router.get("/api/getAllFixpreson", (req, res) => {
  const sql = `select * from fixpreson`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});

// 获取当前维修人员信息
router.get("/api/getRepairMan", (req, res) => {
  const name = req.query.name
  console.log(name)
  const sql = `select * from fixpreson where fixname = '${name}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});
// 获取id维修人员信息
router.get("/api/id/getRepairMan", (req, res) => {
  const idx = req.query.idx
  const sql = `select * from fixpreson where idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});

// 更新维修人员信息
router.post("/api/updateRepair", (req, res) => {
  const { idx, fixname, fixpassword, fixtelnumber, fixAvatarUrl, fixAge,goodType} = { ...req.body };
  const sql = `UPDATE fixpreson set fixname = '${fixname}', fixpassword = '${fixpassword}', fixtelnumber = '${fixtelnumber}', fixAvatarUrl =  '${fixAvatarUrl}', fixAge = '${fixAge}', goodType = '${goodType}' where idx =  '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "更新成功",
    });
  })
});
// 删除维修人员数据
router.post("/api/deteleRepair", (req, res) => {
  const { idx } = { ...req.body };
  const sql = `DELETE from fixpreson where idx = '${idx}'`;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "删除成功",
    });
  })
});
// 管理员登录
router.post("/api/auth/login", function (req, res) {
  const { username, password } = { ...req.body };
  const sql = `select * from users where user='${username}' and password='${password}'`;
  sqlQuery(sql, (data) => {
    if (data.length > 0)
      return res.send({
        code: "200",
        result: { token: "4291d7da9005377ec9aec4a71ea837f" },
        message: "登录成功",
      });

    res.send({
      code: "500",
      message: "用户不存在",
    });
  });
});

// 意见反馈
router.post("/api/toSuggest", function (req, res) {
  const {idx, fixId, wxName, opinions, photos, time} = { ...req.body };
  const sql = `insert into fixopinion values('${idx}','${fixId}', '${wxName}', '${opinions}', '${photos}',  '${time}')`;;
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "评论成功",
    })
  });
});

// // 注册
// router.post("/api/register", (req, res) => {
//   const { username, password } = { ...req.body };
//   const sql = `select * from userinfo where username='${username}'`;

//   sqlQuery(sql, (data) => {
//     if (data.length == 0) {
//       const sql = `insert into userinfo values('${username}',null,'${password}')`;
//       sqlQuery(sql, (data) => {
//         res.send({
//           code: "200",
//           message: "注册成功",
//         });
//       });
//     } else {
//       res.send({
//         code: "500",
//         message: "用户已经存在",
//       });
//     }
//   });
// });

// // 修改密码
// router.post("/api/passwordChange", (req, res) => {
//   const { username, password, newPassword } = { ...req.body };
//   const sql = `select * from userinfo where username='${username}' AND password='${password}' `;
//   sqlQuery(sql, (data) => {
//     if (data.length != 0) {
//       const sql = `update userinfo set password='${newPassword}' where username = '${username}'`;
//       sqlQuery(sql, (data) => {
//         res.send({
//           code: "200",
//           message: "修改成功",
//         });
//       });
//     } else {
//       res.send({
//         code: "500",
//         message: "用户名或原密码不正确",
//       });
//     }
//   });
// });

module.exports = router;
