<template>
    <div>
        <div class="font-text">
            除头像昵称外可以直接修改信息
        </div>
        <form bindsubmit="formSubmit">
            <div class='bg-w' style='padding:0 30rpx'>
                <div v-if="isFlag" class='info_li' >
                    <div class='info_prefix_text'>头像</div>
                    <div class='touxiang-img'>
                        <image :src=userInfo.avaterUrl style="width: 120rpx;height: 120rpx;border-radius: 50%;"></image>
                    </div>
                </div>
                <div v-else class="info_li">
                    <label style="width:70px;margin-top: 5px;">上传头像:</label>
                    <label  @click="uploadPicture">
                        <img class="add-img" :src="addimage">
                        </label>
                    <label >
                        <img class="img" :src="src" >
                        </label>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>工程师用户名</div>
                    <div class='info_right'>
                        <input name="nick_name" class='text-right' v-model="userInfo.fixname"  />
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>密码</div>
                    <div class='info_right'>
                        <input name="sex" class='text-right'  v-model="userInfo.fixpassword"/>
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>工龄</div>
                    <div class='info_right'>
                        <input name="realName" class='text-right' placeholder="请填写真实工龄(必填)" v-model="userInfo.fixAge" />
                    </div>
                </div>
                
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>擅长方向</div>
                    <div class='info_right'>
                        <input name="realPhone" class='text-right'   placeholder="擅长方向" v-model="userInfo.goodType" />
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>手机号</div>
                    <div class='info_right'>
                        <input name="realPhone" class='text-right'  maxlength="11" placeholder="请填写11位手机号(必填)" v-model="userInfo.fixtelnumber" />
                    </div>
                </div>
            </div>

            <div class='submit_button'>
                <button v-if="isFlag" class='btns' @click="saveInfo" >保存修改</button>
                <button v-else class='btns' @click="addInfo" >确认添加</button>
                <button class='btns' @click="toBack" >下次一定</button>
            </div>
        </form>
    </div>
</template>

<script>
import { get, post } from '../../utils'
    export default {
        data(){
            return{
               userInfo:{
                   idx:'',
                   avaterUrl:'',
                   fixname:'',
                   fixpassword:'',
                   fixAge:'',
                   fixtelnumber:'',
                   goodType:''
               },
               userDetail:{},
               addimage: '../../static/images/addimage.png',
               src: '',
               isFlag:false,
            }
        },
        onLoad(opinions){
            console.log(opinions.id);
            if(opinions.id){
              this.isFlag = true
              this.getUserInfo(opinions.id)
            }else{
                this.isFlag = false
                this.userInfo.idx = ''
                this.userInfo.avaterUrl = ''
                this.userInfo.fixname = ''
                this.userInfo.fixpassword = ''
                this.userInfo.fixAge = ''
                this.userInfo.fixtelnumber = ''
                this.userInfo.goodType = '' 
            }
            // this.userDetail = this.globalData.userDetail
            // console.log(this.globalData.userDetail)
        },
        methods:{
            async addInfo(){
                 const data = {
                  idx:this.getRandomNum(),
                  username:this.userInfo.fixname,
                  password:this.userInfo.fixpassword,
                  fixtelnumber:this.userInfo.fixtelnumber,
                  fixAge:this.userInfo.fixAge,
                  goodType:this.userInfo.goodType,
                  fixAvatarUrl:this.src
              }
              const res = await post('/api/fix/register',data)
              console.log(res)
              if(res.code == '200'){
                  wx.showToast({
                    title: '添加成功！', // 标题
                    icon: 'success',  // 图标类型，默认success
                    duration: 1500  // 提示窗停留时间，默认1500ms
                  })
              }
              wx.redirectTo({url:'/pages/adminMans/main'})
            },
            getRandomNum(n = 5) {
                let rdmNum= "";
                for (let i = 0; i < n; i++) {
                    rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
                }
                return rdmNum;
            },
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
            async getUserInfo(idx){
                const data = {
                    idx : idx
                }
                const res = await get('/api/id/getRepairMan',data)
                console.log(res);
                this.userInfo.idx = res.data[0].idx 
                this.userInfo.avaterUrl = res.data[0].fixAvatarUrl
                this.userInfo.fixname = res.data[0].fixname
                this.userInfo.fixpassword = res.data[0].fixpassword
                this.userInfo.fixAge = res.data[0].fixAge
                this.userInfo.fixtelnumber = res.data[0].fixtelnumber 
                this.userInfo.goodType = res.data[0].goodType 
               
                
            },
            async saveInfo(){
                const data = {
                    fixname:this.userInfo.fixname, 
                    fixpassword:this.userInfo.fixpassword, 
                    fixtelnumber:this.userInfo.fixtelnumber, 
                    fixAvatarUrl:this.userInfo.avaterUrl, 
                    fixAge:this.userInfo.fixAge,
                    goodType:this.userInfo.goodType
                }
                // if(this.userInfo.idx == ''){
                //     data.idx = this.getRandomNum()
                //     const res = await post('/api/saveUser',data)
                //     wx.showToast({
                //         title: '保存成功！', // 标题
                //         icon: 'success',  // 图标类型，默认success
                //         duration: 1500  // 提示窗停留时间，默认1500ms
                //     })
                // }else{
                    data.idx = this.userInfo.idx
                    const res = await post('/api/updateRepair',data)
                    wx.showToast({
                        title: '更新成功！', // 标题
                        icon: 'success',  // 图标类型，默认success
                        duration: 1500  // 提示窗停留时间，默认1500ms
                    })
                    wx.redirectTo({url:'/pages/adminMans/main'})
                // }
            },
            toBack(){
               wx.redirectTo({url:'/pages/adminMans/main'})
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
page{
  background-color: #f3f3f3
}
.bg-w{
  background-color: #fff;
}
.font-text{
  padding: 10rpx;
  font-size: 25rpx;
  color: rgb(145, 145, 145);
}
.info_li{
  height: 200rpx;
  line-height: 200rpx;
  position: relative;
  border-bottom: 1px solid rgb(214, 214, 214);
}
.touxiang-img{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  position: absolute;
  top: 35rpx;
  right: 30rpx;
  overflow: hidden;
}

.info_li2{
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid rgb(214, 214, 214);
}
.info_left{
  float: left;
  
}
.info_right{
  float: right;
  width: 50%;
  margin-top: 30rpx;
  height: 70rpx;
  font-size: 25rpx;
  text-align: right;
}
.userInfoName{
  display: block;
  font-size: 30rpx;
  float: right;
  margin-top: -30rpx;
}

.submit_button{
  width: 90%;
  margin: 20px auto;
}

.btns{
  color: #fff;
  border-radius: 80rpx;
  background: linear-gradient(to right, #26D9B7, #0ca2dc);
  margin-bottom: 20rpx;
}
.add-img {
      width:80px;
      height:80px;
    margin-left: 100px;
}
.img {
  width:66px;
  height:66px;
  margin-top: 7px;
  margin-left: 10px;
}

</style>