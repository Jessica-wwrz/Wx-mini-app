<template>
  <div class="index">
    <!-- 头部搜索 -->
    <!-- <div class="search">
       <div @click="toMappage">{{cityName}}</div>
    </div> -->

    <div id="maxView">
	<image src="https://s1.ax1x.com/2022/03/15/bvUvM4.gif" class="topimage"></image>
	<div class="addOrdersBtn" @click="toPublish" >
		<image src="../../static/images/report.png" class="addlogo"></image>
		我要调机
	</div>

	<div class="orderData">
		<div class="center">
			<div class="mySendOrder" @click="toMyRepair('../myrepair/main')"  >
				<image src="../../static/images/mysendorders.png"></image>
				<span>我的调机</span>
			</div>
			<div class="myOrderOver" @click="toMyRepair('../select/main')" >
				<image src="../../static/images/ordersover.png"></image>
				<span>维修方</span>
			</div>
			<div class="adminShowOrder" @click="toMyRepair('../admin/main')" >
				<image src="../../static/images/adminshowordeer.png"></image>
				<span>管理员</span>
			</div>
		</div>
	</div>

	<div class="orderslist">
		<div class="cu-bar bg-white">
    <div class="action">
      <text class="cuIcon-titles"></text>
      <text class="text-xl text-bold" style="font-size: 18px !important;font-weight: bold;"> 最近报修列表</text>

    </div>
	</div>
	</div>
	<div v-for="(item, idx) in myFixsList" :key="idx" class="mainList">
		<div class="listLeft">
			<image style="width:100%;height:100%;float: left;"  src="../../static/images/myrepair.png" alt />
		</div>
    <div class="listRight">
      <!-- <div>维修人：{{item.name}}</div> -->
      <div style="display:flex">
        <div style="width:165px;text-overflow：ellipsis;overflow：hidden;">
            报修机器：{{item.things}}
        </div>
        <div class="level-tag" :style="statusColor[item.status]" >
            {{state[item.status]}}
        </div>
      </div>
      <!-- <div>维修人电话：{{item.tel}}</div> -->
      <div>申报时间：{{item.time}}</div>
      <div class="item-footer">			
			  <text @click="toDetail(item.idx)" style="border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
			</div>
    </div>
  </div>
  </div>
 
  <div>
		<div class="panel-center item-center ma-t30" style='padding:30rpx;padding-top:0 '>
			<div class='fg1'></div>
			<div class='fg2'>我是有底线的哦</div>
			<div class='fg1'></div>
		</div>
	</div>
    

  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import { mapState , mapMutations} from 'vuex' 
import{ get, post } from '../../utils'
  export default {
    data(){
      return {
        myname:'',
         banner: [],
         channel:[],
         brandList:[],
         newGoods:[],
         hotGoods:[],
         topicList:[],
         newCategoryList:[],
         userInfo:'',
         myFixsList:[],
        state:{
          'loading':'进行中',
          'loaded' :'待验证',
          'isGood' :'已完成'
        },
        statusColor:{
          'loading':'background:#37ADFF',
          'loaded' :'background:#FDC860',
          'isGood' :'background:#07c160'
        }
      }
    },
    computed: {
      ...mapState(['cityName'])
    },
    onLoad() {
      
      this.getUser()
      console.log(this.globalData)
    },
     onShow(){
      this.getTabData(this.globalData.userInfo.nickName)
      this.globalData.role = 'user'
     },
    created(){
      
    },
    mounted(){
      
      this.getData()
      this.getCityNmae()
    },
    methods: {
      ...mapMutations(['update']),
      toMappage(){
        let _this = this
        wx.getSetting({
          success: (res) => {
            console.log(res)
             if(!res.authSetting['scope.userLocation']){
                wx.openSetting({
                  success: res => {
                    _this.getCityNmae()
                  } 
                })
             }else{
               wx.navigateTo({
                 url: '/pages/mappage/main',
               });
              //  _this.getCityNmae()
             } 
          },
          fail: (err) => {
            console.log(err)
          },
          complete:() => {}
        })
      },
      getCityNmae(){
        let _this = this
        var myAmapFun = new amapFile.AMapWX({key:'071ccea5550154f72ed8b323421ad462'});
        myAmapFun.getRegeo({
          success: function(data){
             console.log(data)
          },
          fail: function(info){
            // console.log(info)
            // _this.cityName = '北京'
            _this.update({cityName : '北京'})
          } 
        })
      },
      getUser(){
        const that = this
        wx.showModal({
            title: '请授权登录',
            content: '必须登录才能访问相关功能',
            mask: true,
            success (res) {
              if (res.confirm) {
                 wx.getUserProfile({
                    desc: '必须授权才能使用',
                    success:res=>{
                      console.log(res)
                      that.globalData.userInfo = res.userInfo
                      that.getTabData(that.globalData.userInfo.nickName)
                    },
                    fall:res=>{
                      console.log('失败',res)
                    }
                  })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
       
      },

      getData(){
         wx.login({
            async success (res) {
            if (res.code) {
              //发起网络请求
            const resData = await get('/api/login', {
              code: res.code
            })
            } else {
              console.log('获取code失败！' + res.errMsg)
            }
          }
        })
      },
      toPublish(){
        wx.navigateTo({
          url: "../counter/main"
        });   
      },
      toMyRepair(url){
        wx.navigateTo({
          url: url
        }); 
      },
      toDetail(id){
        wx.navigateTo({
          url: '../detail/main?id=' + id
        })
      },
      async getTabData(name){
        const data = {name:name}
        let res =await get('/api/fixs', data)
        this.myFixsList = res.data
        for(let i = 0;i<this.myFixsList.length;i++){
            this.myFixsList[i].time = this.dateFormat(this.myFixsList[i].time)
        }
        this.globalData.fixsData = this.myFixsList
        // console.log(this.globalData.fixsData)
      },
      dateFormat(date) {
      //日期格式化
      var d = new Date(date)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      month = '0' + month
      month = month.substring(month.length - 2)
      let day = '0' + d.getDate()
      day = day.substring(day.length - 2)
      let hour = '0' + d.getHours()
      hour = hour.substring(hour.length - 2)
      let m = '0' + d.getMinutes()
      m = m.substring(m.length - 2)
      let s = '0' + d.getSeconds()
      s = s.substring(s.length - 2)
      let format = year + '-' + month + '-' + day + ' ' + hour + ':' + m + ':' + s
      return format
    },
      getRandomNum(n = 5) {
          let rdmNum= "";
          for (let i = 0; i < n; i++) {
              rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
          }
          return rdmNum;
      },
      async addFix(){
      const data = {idx:'11111111',name:'hhhhhhh',things:'666666666',photos:'_this.photos',tel:'_this.realPhone',desc:'_this.descThings', time:new Date()}
      const resData = await post('/api/addFixInfo', 'post' , data)
    }
    }
  }  
</script>
<style lang="less" scoped>
@import "./style.less";
.topimage{
  width: 100%;
  height: 185px;
}
.mainList{
  width: 95%;
  background-color: #fff;
  height:240rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 10rpx;
  display: flex;
}
 .listLeft{
  width:180rpx;
  height: 160rpx;
  margin-top: 20rpx;
  margin-left:20rpx;
  overflow: hidden;
  position: relative;
}
.listRight{
  width:450rpx;
  position: relative;
  float: right;
  height: 160rpx;
  margin-top: 20rpx;
  margin-left:40rpx;
}
.addlogo{
 width: 40rpx;
 height: 40rpx;
 vertical-align: middle;
}
.addOrdersBtn{
  width: 60%;
  height: 45px;
  border-radius: 20px;
  background-color: #fff;
  margin: -30px auto;
  box-shadow: 0px 5px 10px rgb(194, 194, 194);
  position: relative;
  text-align: center;
  line-height: 45px;
  z-index: 99;
  font-size: 16px;
  font-weight: bold;
}
.addOrdersBtn:active{
  width: 60%;
  height: 45px;
  border-radius: 20px;
  background-color: rgb(238, 238, 238);
  /* color: #fff; */
  margin: -30px auto;
  box-shadow: 0px 5px 10px rgb(194, 194, 194);
  position: relative;
  text-align: center;
  line-height: 45px;
  z-index: 99;
  font-size: 16px;
  font-weight: bold;
}
.orderData{
  background-color: #fff;
  width: 100%;
  height: 200rpx;
  border-radius: 10px;
  margin: 0px auto;
  padding-top: 45px;
  overflow: hidden;
}
.center{
  margin: 0px auto;
  /* width: 92%; */
  overflow: hidden;
}
.mySendOrder{
  width: 30%;
  height: 70px;
  float: left;
  text-align: center;
  background-color:#37ADFF;
  border-radius: 10px;
  margin: 5px;
  margin-left: 10px;
  line-height: 70px;
  color: #fff;
  font-weight: bold;
}
.mySendOrder:active{
  width: 30%;
  height: 70px;
  float: left;
  text-align: center;
  background-color:#3095dd;
  border-radius: 10px;
  margin: 5px;
  margin-left: 10px;
  line-height: 70px;
  color: #fff;
  font-weight: bold;
}
.mySendOrder image{
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.myOrderOver{
  width: 30%;
  height: 70px;
  float: left;
  text-align: center;
  background-color:#FDC860;
  border-radius: 10px;
  margin: 5px;
  line-height: 70px;
  color: #fff;
  font-weight: bold;
}
.myOrderOver:active{
  width: 30%;
  height: 70px;
  float: left;
  text-align: center;
  background-color:#dbae53;
  border-radius: 10px;
  margin: 5px;
  line-height: 70px;
  color: #fff;
  font-weight: bold;
}
.myOrderOver image{
  width: 35px;
  height: 35px;
  vertical-align: middle;
}

.adminShowOrder{
  width: 30%;
  height: 70px;
  float: left;
  text-align: center;
  background-color:#A1D676;
  border-radius: 10px;
  margin: 5px;
  line-height: 70px;
  color: #fff;
  font-weight: bold;
}
.adminShowOrder:active{
  width: 30%;
  height: 70px;
  float: left;
  text-align: center;
  background-color:#94c56c;
  border-radius: 10px;
  margin: 5px;
  line-height: 70px;
  color: #fff;
  font-weight: bold;
}
.adminShowOrder image{
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

.orderlist_title{
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
}

// @import './card.wxss';

.header-box {
  position: sticky;
  top: 0;
  z-index: 2000;
}

.image_logo{
  vertical-align:middle;
  width: 20px;
  height: 20px;
}

.nav-container {
  padding: 20rpx;
  background-color: var(--color-white);
  color: var(--color-btn-info);
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
}
.nav-container text{
  margin-left: 2px;
  vertical-align:middle;
}

/* 底部 我也是有底线的 */
.fg1{
  width: 80rpx;
  border-bottom: 1px solid #aaaaaa;
  vertical-align: middle;
}
.fg2{
  margin: 0 30rpx;
  font-size: 26rpx;
  color: #888;
  vertical-align: middle;
}
.panel-center{
  display: flex;
  justify-content: center;
}
.panel-center{
  display: flex;
  justify-content: center;
}
.ma-t30{
  margin-top: 30rpx
}
/*分享代码*/
.fenxiang{
  width: 80rpx;
  position: fixed;
  right: 10rpx;
  bottom: 20px;
}
.fenxiang image{
  width: 30px;
  height: 30px;
  max-width: 200%;
}
.fenxiang>button[class="contactusBtn"]{
  background: #0d91dd; 
  color: #fff; 
  height:80rpx; 
  border-radius:50%;
  margin-top: 5px;
}
/* .fenxiang>button[class="fenxiangBtn"]{
  background: #08cc33; 
  color: #fff; 
  height:80rpx; 
  border-radius:50%;
  margin-top: 5px;
} */

.header-tab {
  padding: 10rpx 0;
  background-color: var(--color-white);
}

.orderslist{
    
    // margin-left: 30px !important;
    background-color: #fff;
    
}
.action{
  margin-left:15px !important;
  margin-bottom: 10px;
}
.cu-bar{
  display: flex;
    position: relative;
    align-items: center;
    min-height: 100rpx;
    justify-content: space-between;
}
.cuIcon-titles:before {
  content: "";
  position: absolute;
  bottom: 38rpx;
  left: 15rpx;
  width: 6rpx;
  height: 40rpx;
  background: blue;
  border-radius: 30rpx;
}
.item-footer{
  margin-top: 30rpx;
  margin-left: 270rpx;
}
.level-tag{
    margin-top: 3px;
    height: 17px;
    background-color:#07c160;
    padding:0 5px;
    font-size: 21rpx;
    color: #fff;
}
</style>