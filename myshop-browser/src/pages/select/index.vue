<template>
  <div class="login">
    <div v-if="!isRegister" style="width:80%">
      <div class="main" >
          <image style="width:100%;height:100%" src="../../static/images/fixPre.png" />
      </div>
      <div class="form-group">
        <label style="width:60px;margin-top: 5px;">用户名:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" v-model="username" placeholder="请输入用户名" />
      </div>
      <div class="form-group">
        <label style="width:60px;margin-top: 5px;">密码:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" type="password" v-model="password" placeholder="请输入密码"/>
      </div>
      <div class="section">
          <div style="background-color:#A1D676;border: 1px solid #eee;width:100px">
              <button style="color:#fff" @click="login(username)">登录</button>
          </div>
          <div style="background-color:#A1D676;border: 1px solid #eee;margin-left:30px;width:100px">
              <button style="color:#fff" @click="toRegister">注册</button>
          </div>
        
      </div>
    </div>
    <div v-else style="width:80%;">
      <div class="main" >
          <image style="width:100%;height:100%" src="../../static/images/fixPre.png" />
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">用户名:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" v-model="regUsername" placeholder="请输入用户名" />
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">密码:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" type="password" v-model="regpassword" placeholder="请输入密码"/>
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">验证密码:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" type="password" v-model="repassword" placeholder="请再次输入密码"/>
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">工龄:</label>
        <div style="width:230px">
          <picker mode="selector" @change="bindAgeChange" :index="ageIndex" :range="ageArray">
            <div>
              <input style="border: 1px solid #eee;flex:1;height:35px" maxlength="11" v-model="ageArray[ageIndex]" placeholder="请输入擅长方向"/>
              <!-- <input type="text"  style="width:100%;display:block" class="iteminput" maxlength="200" placeholder="请输入要维修的物品"  v-model="array[index]" /> -->
            </div>
          </picker>
        </div>
        <!-- <input style="border: 1px solid #eee;flex:1;height:35px" maxlength="11" v-model="telNumber" placeholder="请输入工龄"/> -->
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">擅长方向:</label>
        <div style="width:230px">
          <picker mode="selector" @change="bindPickerChange" :index="index" :range="goodArray">
            <div>
              <input style="border: 1px solid #eee;flex:1;height:35px" maxlength="11" v-model="goodArray[index]" placeholder="请输入擅长方向"/>
              <!-- <input type="text"  style="width:100%;display:block" class="iteminput" maxlength="200" placeholder="请输入要维修的物品"  v-model="array[index]" /> -->
            </div>
          </picker>
        </div>
        <!-- <input style="border: 1px solid #eee;flex:1;height:35px" maxlength="11" v-model="telNumber" placeholder="请输入擅长方向"/> -->
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">手机号:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" maxlength="11" v-model="telNumber" placeholder="请输入手机号"/>
      </div>
      <div class="form-group">
        <label style="width:70px;margin-top: 5px;">上传头像:</label>
        <label  @click="uploadPicture">
		      <img class="add-img" :src="addimage">
		    </label>
        <label >
		      <img class="img" :src="src" >
		    </label>
      </div>
      <div class="section">
          <div style="background-color:#A1D676;border: 1px solid #eee;width:100px">
              <button style="color:#fff" @click="tologin">去登录</button>
          </div>
          <div style="background-color:#A1D676;border: 1px solid #eee;margin-left:30px;width:100px">
              <button style="color:#fff" @click="register">提交</button>
          </div>
        
      </div>
    </div>
    </div>
</template>

<script>
  import {get , post} from '../../utils'
  export default {
      
    name: 'login',
    data: () => ({
        
        goodArray:[
          '射台装置',
          '锁模装置',
          '液压系统',
          '电器系统',
          '润滑系统'
        ],
        index:0,
        ageArray:[
          '0-5年',
          '5-10年',
          '10-15年',
          '15年以上'
        ],
        ageIndex:0,
        isRegister:false,
        username: '',
        regUsername:'',
        password: '',
        regpassword: '',
        repassword:'',
        telNumber:'',
        addimage: '../../static/images/addimage.png',
        src: '',

    }),
    onLoad(){
      this.globalData.role = 'user'
    },
    methods: {
       uploadPicture () {
            let that = this
            wx.chooseImage({
            count: 2,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                that.src = tempFilePaths
                console.log('that.src', that.src)
            }
            })
        },
      bindAgeChange: function (e) {
        this.ageIndex = e.mp.detail.value
      },
      bindPickerChange: function (e) {
        this.index = e.mp.detail.value
      },
      async login (name) {
        const data = {
            username:this.username,
            password:this.password
        }
        let res = await post('/api/fix/login',data)
        console.log(res)
        if(res.code == '200'){
             wx.navigateTo({ url: '../repairMan/main?name=' + name });
             wx.showToast({
              title: '登录成功！', // 标题
              icon: 'success',  // 图标类型，默认success
              duration: 1500  // 提示窗停留时间，默认1500ms
            })
        }else {
             wx.showToast({
              title: '用户未注册！', // 标题
              icon: 'error',  // 图标类型，默认success
              duration: 1500  // 提示窗停留时间，默认1500ms
            })
        }

      },
      toRegister(){
          this.isRegister = true
      },
      tologin(){
          this.isRegister = false
      },
      async register(){
          if(this.regpassword !== this.repassword){
            wx.showToast({
              title: '密码验证失败！', // 标题
              icon: 'error',  // 图标类型，默认success
              duration: 1500  // 提示窗停留时间，默认1500ms
            })
          }else{
              const data = {
                  idx:this.getRandomNum(),
                  username:this.regUsername,
                  password:this.regpassword,
                  fixtelnumber:this.telNumber,
                  fixAge:this.ageArray[this.ageIndex],
                  goodType:this.goodArray[this.index],
                  fixAvatarUrl:this.src
              }
              const res = await post('/api/fix/register',data)
              console.log(res)
              if(res.code == '200'){
                  wx.showToast({
                    title: '注册成功！', // 标题
                    icon: 'success',  // 图标类型，默认success
                    duration: 1500  // 提示窗停留时间，默认1500ms
                  })
                  this.isRegister = false
              }
          }
      },
      getRandomNum(n = 5) {
      let rdmNum= "";
      for (let i = 0; i < n; i++) {
        rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
      }
      return rdmNum;
    },

    }
  }
</script>

<style scoped>
.main{
    width: 100px;
    height: 100px;
    margin: 30px auto;
}
.form-group{
    display: flex;
    margin-top: 25px;
}
  .login {
   background: #fff;
   height: auto;
   display: flex;
   justify-content: center;
   /* align-items: center; */
  }
  .section{
      
      width: 60%;
      margin:30px auto;
      display: flex;
      color: #fff;
  }
  form-control{
      border: 1px solid #eee !important;
  }
  .header-box {
  position: sticky;
  top: 0;
  z-index: 2000;
}

.header-tab {
  padding: 10rpx 0;
  background-color: var(--color-white);
}
.weixiuText{
  border: 1px solid #ccc;
  width: 100%;
  height: 300rpx;
  padding: 10rpx;
  background-color: #fff;
  text-align: left;
}
.card-item {
  background-color: var(--color-white);
  margin: 20rpx;
  border-radius: 10rpx;
  position: relative;
}

.card-item .item-content {
  display: flex;
  padding: 20rpx;
  position: relative;
}

.left-box>image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  border: 2px solid rgb(209, 209, 209);
}

.right-box {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 20rpx;
}

.right-box .floor {
  font-weight: bold;
  font-size: 32rpx;
}

.right-box .desc {
  font-size: 28rpx;
  margin: 5rpx 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.right-box .date {
  font-size: 25rpx;
  color: var(--color-text-second);
  margin-top: 5rpx;
}

.card-item .item-footer {
  font-size: 28rpx;
  padding: 10rpx;
  text-align: right;
  color: var(--color-btn-info);
}

.item-footer>text {
  margin-left: 20rpx;
}

.confirm-text-btn {
  color: var(--color-btn-primary);
}

.delete-text-btn {
  color: var(--color-btn-danger);
}

/* .level-tag {
  font-size: 20rpx;
  color: var(--color-white);
  padding: 5rpx 10rpx;
  border-radius: 0 999px 999px 0;
  display: inline-block;
  background-color: var(--color-btn-danger);
  position: absolute;
  top: 20rpx;
  left: 0;
} */
.level-tag {
  font-size: 23rpx;
  color: var(--color-white);
  padding: 5rpx 10rpx;
  /* border-radius: 0 999px 999px 0; */
  display: inline-block;
  background-color: var(--color-btn-danger);
  width: 60px;
  text-align: center;
  /* position: absolute;
  top: 20rpx;
  left: 0; */
}

.flag{
  position: absolute;
  right: 10px;
  top: 10px;
}
.add-img {
      width:80px;
      height:80px;
}
.img {
  width:66px;
  height:66px;
  margin-top: 7px;
  margin-left: 10px;
}
</style>