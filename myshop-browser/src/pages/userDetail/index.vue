<template>
    <div>
        <div class="font-text">
            除头像昵称外可以直接修改信息
        </div>
        <form bindsubmit="formSubmit">
            <div class='bg-w' style='padding:0 30rpx'>
                <div class='info_li' >
                    <div class='info_prefix_text'>头像</div>
                    <div class='touxiang-img'>
                    <image :src=userInfo.avaterUrl style="width: 120rpx;height: 120rpx;border-radius: 50%;"></image>
                    
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>昵称</div>
                    <div class='info_right'>
                        <input name="nick_name" disabled class='text-right' v-model="userInfo.nickName"  />
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>性别</div>
                    <div class='info_right'>
                        <input name="sex" class='text-right'  v-model="userInfo.sex"/>
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>真实姓名</div>
                    <div class='info_right'>
                        <input name="realName" class='text-right' placeholder="请填写真实姓名(必填)" v-model="userInfo.userName" />
                    </div>
                </div>
                <div class='info_li2'>
                    <div class='info_prefix_text info_left'>手机号</div>
                    <div class='info_right'>
                        <input name="realPhone" class='text-right'  maxlength="11" placeholder="请填写11位手机号(必填)" v-model="userInfo.telNumber" />
                    </div>
                </div>
            </div>

            <div class='submit_button'>
                <button class='btns' @click="saveInfo" >保存修改</button>
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
                   nickName:'',
                   sex:'',
                   userName:'',
                   telNumber:'',
               },
               userDetail:{},
            }
        },
        onLoad(options){
            console.log(options);
            this.getUserInfo(options.id)
            
            // this.userDetail = this.globalData.userDetail
            // console.log(this.globalData.userDetail)
        },
        methods:{
            async getUserInfo(id){
                // const data = {
                //     name : this.globalData.userInfo.nickName
                // }
                // const res = await get('/api/getUser',data)
                // if(res.data.length == 0){
                //     console.log(this.globalData.userInfo.avatarUrl,this.globalData.userInfo.nickName);
                //     this.userInfo.avaterUrl = this.globalData.userInfo.avatarUrl
                //     this.userInfo.nickName = this.globalData.userInfo.nickName
                // }else{
                //     this.userInfo = res.data[0]
                //     console.log(res)
                // }
                const data = {
                    idx:id
                }
                const res = await get('/api/id/getUser',data)
                console.log(res);
                this.userInfo.idx = res.data[0].idx 
                this.userInfo.avaterUrl = res.data[0].avaterUrl
                this.userInfo.nickName = res.data[0].nickName
                this.userInfo.sex = res.data[0].sex
                this.userInfo.userName = res.data[0].userName
                this.userInfo.telNumber = res.data[0].telNumber    
            },
            async saveInfo(){
                const data = {
                    userName:this.userInfo.userName, 
                    telNumber:this.userInfo.telNumber, 
                    sex:this.userInfo.sex, 
                    avaterUrl:this.userInfo.avaterUrl, 
                    nickName:this.userInfo.nickName
                }
                    data.idx = this.userInfo.idx
                    const res = await post('/api/updateUser',data)
                    wx.showToast({
                        title: '更新成功！', // 标题
                        icon: 'success',  // 图标类型，默认success
                        duration: 1500  // 提示窗停留时间，默认1500ms
                    })
                    wx.redirectTo({url:'/pages/adminMans/main'})
            },
            toBack(){
                wx.redirectTo({
                    url: '../adminMans/main'
                });
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


</style>