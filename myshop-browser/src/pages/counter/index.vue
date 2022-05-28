<template>
  <!-- <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      
      <button @click="decrement">-</button>
      <button @click="addFix">111</button>
      <button @click="increment">+</button>
      <input type="text" v-model="myname" placeholder="5555555555" value="myname" />
    </p>
  </div> -->
  <div>
    <div class="notice-container">
      <van-notice-bar left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" text="请同学们如实填写信息,方便维修人员对应进行维修。请同学们推广使用,谢谢大家。" speed="40" />
    </div>
    <div class="userLogo">
		  <image :src = avatarUrl style=" width: 150rpx;height: 150rpx;"></image>
	  </div>
<!-- 申报项 -->
<div class="declare-input">
	<div class="decare-input-item">
		<text class="itemtext">报修人(必填)：</text>
		<input type="text" class="iteminput" maxlength="8"  placeholder="请输入申请人" v-model="realName"  />
	</div>
	<div class="line"></div>
	<div class="decare-input-item">
		<text class="itemtext" >机器品牌(必填)：</text>
		<!-- <input type="text" @focus="taps" @input.stop="bindkeyinput" style="width:100%;display:block" class="iteminput" maxlength="200" placeholder="请输入要维修的物品"  v-model="goods" /> -->
    <div class="section">
      <picker mode="selector" @change="bindPickerChange" :index="index" :range="array">
        <div>
          <input type="text"  style="width:100%;display:block" class="iteminput" maxlength="200" placeholder="请输入要维修的物品"  v-model="array[index]" />
        </div>
      </picker>
    </div>
	</div>
	<div class="line"></div>
	<div class="decare-input-item">
		<text class="itemtext">联系电话(必填)：</text>
		<input class="iteminput" type="text"  maxlength="11" placeholder="请输入手机号"  v-model="telNumber" />
	</div>
  <div class="line"></div>
  <div class="decare-input-item">
		<text class="itemtext">故障过程(必填)：</text>
		<!-- <input class="iteminput" type="text"  maxlength="11" placeholder="请输入过程"  v-model="telNumber" /> -->
    <div class="section">
      <picker mode="selector" @change="bindTypePickerChange" :index="typeInedx" :range="processType">
        <div>
          <input type="text"  style="width:100%;display:block" class="iteminput" maxlength="200" placeholder="请输入过程"  v-model="processType[typeInedx]" />
        </div>
      </picker>
    </div>
	</div>
	<div class="line"></div>
  <div class="decare-input-item">
		<text class="itemtext">我的地址(必填)：</text>
		<input type="text" class="iteminput" maxlength="100"  placeholder="请输入地址" @click="toMappage" v-model="cityName"  />
	</div>
	<div class="line"></div>
	<div class="decare-input-item">
		<text class="itemtext2">申报描述(必填)：</text>
		<textarea class="textarea" placeholder="请说明要维修的情况、出现状况，如何导致等.."  v-model="descThings" placeholder-style="color:#ccc;font-size:14px;" type="string" maxlength="50"  ></textarea>
	</div>
	<div class="decare-input-item" >
		<text class="itemtext2">故障图片：</text>
		<div style="display:flex">
		<div class="photo" @click="inputPhotos" >
			<image src="../../static/images/photo.png" style="width:100%;height:100%"></image>
		</div>
		<div class="photos" v-for="(item,idx) in photos" :key="idx" >
			<image :src=item  style="width:100%;height:100%;margin-left:30rpx;"></image>
		</div>
	</div>
  <div class="select">
    <radio-group >
		<label class="mySelect" >
			<div class="options-rich-text">
				<rich-text >人工调机</rich-text>
			</div>
      <radio @click="toSelect('person')" style="transform:scale(0.65);margin-left:150px" />
		</label>
    <label class="mySelect" >
			<div class="options-rich-text">
				<rich-text >智能调机</rich-text>
			</div>
      <radio @click="toSelect('smart')" style="transform:scale(0.65);margin-left:150px" />
		</label>
	</radio-group>
  </div>
		
	</div>
	
	<!-- 提交申报 -->
	<div class="apply-btn">
		<button type="primary" @click="addFix" >提交</button>
	</div>
</div>
</div>
</template>

<script>
// Use Vuex
import amapFile from '../../utils/amap-wx.js'
import { mapState , mapMutations} from 'vuex' 
import store from './store'
import {get , post} from '../../utils'
export default {
  computed: {
    ...mapState(['cityName']),
    count () {
      return store.state.count
    }
  },
  data(){
    return{
      array: ['海天国际(海天塑机集团有限公司)', 
              '伊之密YIZUMI(广东伊之密精密机械股份有限公司)', 
              '力劲L.K(力劲科技集团有限公司) ', 
              'KraussMaffei克劳斯玛菲(克劳斯玛菲股份有限公司)',
              'Demag住友德马格(德马格塑料机械(宁波)有限公司)',
              'Husky赫斯基(赫斯基注塑系统(上海)有限公司)',
              '其他（具体描述）'
              ],
      processType:[
        '注射过程动作',
        '加料动作',
        '注射压力',
        '注射速度',
        '顶出型式的选择',
        '料筒各段温度及电流',
        '电压的监控',
        '注射压力和背压压力',
        '其他'
      ],
      typeInedx:0,
      index: 0,
      myname:'',
      realName:'',
      goods:'',
      telNumber:'',
      descThings:'',
      photos:[],
      resData:'',
      avatarUrl:'',
      select:'',
    }
  },
  onLoad(){
     this.realName = this.globalData.userInfo.nickName
     this.avatarUrl = this.globalData.userInfo.avatarUrl
     console.log();
  },
  onShow(){
    // this.getTabData()
  },

  created(){
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
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e)
      this.index = e.mp.detail.value
    },
     bindTypePickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e)
      this.typeInedx = e.mp.detail.value
    },
    taps(){
      console.log(111111111)
    },
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    async addFix(){
      let data = {
        idx:this.getRandomNum(),
        name:this.realName,
        things:this.array[this.index],
        photos:this.photos,
        tel:this.telNumber,
        desc:this.descThings, 
        howToFix:this.select,
        process:this.processType[this.typeInedx],
        address:this.cityName,
        time:this.dateFormat(new Date()),
        
      };
      console.log(data)
      data = JSON.stringify(data)
      data = JSON.parse(data)
      console.log(data)
      const resData = await post('/api/addFixInfo' , data)
      if(resData.code == '200'){
        const that = this
        wx.switchTab({
          url: '/pages/index/main',
          success: function (e) { 
            wx.showToast({
              title: '提交成功！', // 标题
              icon: 'success',  // 图标类型，默认success
              duration: 1500  // 提示窗停留时间，默认1500ms
            })
          } 
        })
      }
      this.photos = ''
      this.telNumber = ''
      this.descThings = ''
      this.select = ''
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
    async getTabData(name){
        let res =await get('/api/fixs')
        this.myFixsList = res.data
        for(let i = 0;i<this.myFixsList.length;i++){
            this.myFixsList[i].time = this.dateFormat(this.myFixsList[i].time)
        }
      },
    toSelect(select){
      this.select = select
    },
    inputPhotos(){
       var that = this
        wx.chooseImage({
          count: 4, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var src = res.tempFilePaths
            that.photos.push(src[0])
          //  需要在这里面调用图片上传的接口
          //  wx.uploadFile()
          }
        })
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.notice-container {
  margin-bottom: 20rpx;
}
input, textarea {
  /* border: 1px solid rgb(196, 196, 196); */
  padding: 10rpx;
}
.line{
  margin: 10px auto;
  width: 99%;
  height: 1rpx;
  background-color: rgb(192, 192, 192);
}
.declare-input{
  width: 90%;
  background-color: #fff;
  margin: -35px auto;
  padding: 20rpx;
  box-shadow: 0rpx 0rpx 30rpx rgb(180, 180, 180);
  border-radius: 15rpx;
 
}
.userLogo{
  text-align: center;
  width: 150rpx;
  height: 150rpx;
  margin:0px auto;
  border: 3px solid orange;
  border-radius: 50%;
  overflow: hidden;
  /* margin-bottom: 30rpx; */
}
.decare-input-item{
  overflow: hidden;
  margin-bottom: 10rpx;
}
.itemtext{
  font-weight: bold;
  font-size: 28rpx;
  width: 36%;
  height: 60rpx;
  line-height: 60rpx;
  float: left;
}
.iteminput{
  width: 60%;
  height: 60rpx;
  float: right;
  text-align: right;
}
.itemtext2{
  font-size: 28rpx;
  font-weight: bold;
  height: 60rpx;
  line-height: 60rpx;
}
.picker-input{
  width: 30%;
  height: 60rpx;
  float: left;
}
.compNumber{
  width: 30%;
  height: 60rpx;
  float: left;
  text-align: right;
}
.text-dorm{
  height: 60rpx;
  line-height: 60rpx;
  margin: 0rpx 10rpx 0rpx;
  float: left;
  font-weight: 300;
  font-size: 28rpx;
}
.textarea{
  width: 95%;
  height:200rpx;
  border: 2rpx solid rgb(196, 196, 196);
}
.apply-btn{
  margin: 20rpx 0rpx 20rpx;
}
.apply-btn button{
  border-radius: 40rpx;
  background:linear-gradient(to right,rgb(1, 156, 218),rgb(3, 94, 197));
  width: 90%;
}
.photo{
	width:150rpx;
	height: 150rpx;
  border: 2rpx solid rgb(161, 159, 159);
  border-radius: 10rpx;
}
.photos{
	width:150rpx;
	height: 150rpx;
  border-radius: 10rpx;
}
.select{
  height: 200rpx;
  /* border: 1px solid #eee; */
  width: 95%;
}
.mySelect{
  display:flex;
  margin-top: 15px;
  /* margin-left: 25px; */
}
.options-rich-text{
  width: 260rpx;
}

</style>
