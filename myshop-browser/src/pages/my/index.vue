<template>
  <div class="my">
    <div class="myinfo">
      <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt />
      <img v-else :src="avator" alt />
      <div>
        <p>{{userInfo.nickName}}</p>
        <p v-if="userInfo.nickName">微信用户</p>
        <p v-else @click="getUser">点击登录</p>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.goto)" v-for="(item, index) in listData" :key="index">
        <img :src="item.icon" alt >
        <span>{{item.title}}</span>
        <img class="ic_right"  :src="item.url" alt>
      </div>
    </div>

     <button class="btn" @click="exitLogin">退出登录</button>
  </div>
</template>

<script>
import { get } from '../../utils'
export default {
  data() {
    return {
      listData: [
        {
          title: "个人信息",
          icon: "../../static/images/list.png",
          url: "../../static/images/address_right.png",
          goto:"../info/main"
        },
        {
          title: "我的报修",
          icon: "../../static/images/ic_replay.png",
          url: "../../static/images/address_right.png",
          goto:"../myrepair/main"
        },
        {
          title: "企业管理",
          icon: "../../static/images/enter.png",
          url: "../../static/images/address_right.png",
          goto:"../myManagement/main"
        },
        // {
        //   title: "会员信息修改",
        //   icon: "../../static/images/userchange.png",
        //   url: "../../static/images/address_right.png",
        //   goto:"../myVip/main"
        // },
        {
          title: "支付酬金",
          icon: "../../static/images/pay.png",
          url: "../../static/images/address_right.png",
          goto:"../myOnload/main"
        },
        {
          title: "地址管理",
          icon: "../../static/images/ic_adstress.png",
          url: "../../static/images/address_right.png",
          goto:"../cart/main"
        },
        {
          title: "意见反馈",
          icon: "../../static/images/edit.png",
          url: "../../static/images/address_right.png",
          goto:"../mySug/main"
        },
      ],
      avator: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
      allcheck: false,
      userInfo: {},
      Listids: []
    };
  },
  onLoad(){
    this.userInfo.nickName = this.globalData.userInfo.nickName
    this.userInfo.avatarUrl = this.globalData.userInfo.avatarUrl
  },
  onShow () {
    // if (login()) {
    //   this.userInfo = login()
    //   console.log(this.userInfo)
    //   this.avator = this.userInfo.avatarUrl
    // }
  },
  methods: {
    goTo (url) {
      wx.navigateTo({
        url: url
      });   
    },
    getUser(){
        console.log('点击事件执行了')
        wx.getUserProfile({
          desc: '必须授权才能使用',
          success:res=>{
            let user=res.userInfo
            wx.setStorageSync('user', user)
            console.log('成功',res)
              this.userInfo = user
            },
          fall:res=>{
            console.log('失败',res)
          }
        })
      },
     exitLogin(){
         this.userInfo=''
         wx.setStorageSync('user', null)
    },
  }
};
</script>

<style lang="less" scoped>
.btn{
    color: rgb(188, 55, 55);
    font-size: 30rpx;
    margin-top: 30rpx;
    background-color: #fff;
}
.my {
  .myinfo {
    width: 100%;
    height: 280rpx;
    display: flex;
    align-items: center;
    background: #333;
    padding: 0 30rpx;
    box-sizing: border-box;
    img {
      height: 148rpx;
      width: 148rpx;
      border-radius: 50%
    }
     
    div {
      margin-left: 30rpx;
      p {
        color: #fff;
        font-size: 30rpx;
        margin-bottom: 10rpx
      }
      p:nth-child(2) {
        font-size: 28rpx;
      }
    }
  }
  .iconlist {
    background: #fff;
    div {
        display: flex;
        padding: 25rpx 0;
        // border-right: 1rpx solid rgba(0, 0, 0, .15);
        border-bottom: 1rpx solid rgba(0, 0, 0, .15);
        box-sizing: border-box;
        justify-content: space-between;
      span {
        margin-left:10rpx;
         margin-bottom: 10rpx;
         width: calc(100% - - 50rpx - 100rpx);
      }
      img{
          margin-left:15rpx;
          width:40rpx;
          height: 40rpx;
          
      }
    //   img:nth-child(1){
    //     text-align:right;

    //   }
      .ic_right{
        text-align:right;
        width:40rpx;
        height: 40rpx;
      }
    }
   
  }
}
</style>