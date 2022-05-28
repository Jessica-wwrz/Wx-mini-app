<template>
    <div>
        <div class="header-box">
            <div v-if="!isShow" >
                <div class="warring_top">
                    <image src="../../static/images/warringico.png" class="warringico"></image>
                    <div class="warring_text">
                        抱歉，您并未发布任何报修
                    </div>
                    <div class="goToSendText" @click="toPublish('../counter/main')" >
                        前往去发布
                    </div>
                </div>
                <button class="warring_btn" @click="toPublish('../index/main')">确定</button>
            </div>
            <!-- <div v-else class="card-item">
                <div class="item-content border-bottom">
                    <div class="left-box">
                        <image  ></image>
                    </div>
                </div>
            </div> -->
            <div v-for="(item, idx) in myRepair" :key="idx" class="mainList">
                <div class="listLeft">
                    <image style="width:100%;height:100%;float: left;"  src="../../static/images/myrepair.png" alt />
                </div>
                <div class="listRight">
                    <!-- <div>维修人：{{item.name}}</div> -->
                    <div style="display:flex">
                        <div style="width:185px;text-overflow：ellipsis;overflow：hidden;">
                            维修机器：{{item.things}}
                        </div>
                        
                        <div class="level-tag" :style="statusColor[item.status]" >
                            {{state[item.status]}}
                        </div>
                    </div>
                    
                    <div style="width:165px;text-overflow：ellipsis;overflow：hidden;">
                            故障过程：{{item.process}}
                    </div>
                    <div>我的电话：{{item.tel}}</div>
                    <div>工单状态：{{repairStatus[item.status]}}</div>
                    <div>申报时间：{{item.time}}</div>
                    <div class="item-footer">	
                        <text @click="todetele(item.idx,item.name)" style="margin-right:10rpx;font-size: 12px;border: 1px solid red;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;color:red;">取消工单</text>	
                        <text @click="toChangStatus(item.idx,item.name)" style="margin-right:10rpx;font-size: 12px;color: rgb(31, 134, 0);border: 1px solid rgb(31, 134, 0);padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">已经好了</text>		
                        <text @click="toDetail(item.idx)" style="margin-right:10rpx;font-size: 12px;border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {get , post} from '../../utils'
    export default {
        data(){
            return{
                myRepair:[],
                isShow:false,
                state:{
                    'loading':'进行中',
                    'loaded' :'待验证',
                    'isGood' :'已完成'
                },
                repairStatus:{
                    'loading':'派单中',
                    'loaded' :'已接单，在处理',
                    'isGood' :'已完成'
                },
                statusColor:{
                    'loading':'background:#37ADFF',
                    'loaded' :'background:#FDC860',
                    'isGood' :'background:#07c160'
                }
            }
        },
        onLoad(){
            this.getMyRepair()
            this.getTabData(this.globalData.userInfo.nickName)
        },
        onShow () {
            
            // this.getTabData(this.globalData.userInfo.nickName)
        },
        methods:{
            getMyRepair(){
                if(this.globalData.fixsData.length !== 0){
                    this.isShow = true
                    this.myRepair = this.globalData.fixsData
                }
            },
            toDetail(id){
                wx.navigateTo({
                url: '../detail/main?id=' + id
                })
            },
            toChangStatus(id,name){
                const that = this
                wx.showModal({
                    title: '温馨提示',
                    content: '确定机器已经修好了，不需要报修了',
                   async success (res) {
                    if (res.confirm) {
                       const data = {idx:id,status:'isGood'}
                       const res = await post('/api/update', data) 
                        wx.showToast({
                            title: '更新成功！', // 标题
                            icon: 'success',  // 图标类型，默认success
                            duration: 1500  // 提示窗停留时间，默认1500ms
                        })
                        wx.redirectTo({url:'/pages/myOnload/main'})
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                    }
                })
            },
            todetele(id,name){
                const that = this
                wx.showModal({
                    title: '温馨提示',
                    content: '是否确定取消报修',
                   async success (res) {
                    if (res.confirm) {
                       const data = {idx:id}
                       const res = await post('/api/detele', data) 
                        wx.showToast({
                            title: '已取消！', // 标题
                            icon: 'success',  // 图标类型，默认success
                            duration: 1500  // 提示窗停留时间，默认1500ms
                        })
                      await that.sleep(1000)
                      wx.redirectTo({url:'/pages/myrepair/main'}) 
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                    }
                })
            },
            async getTabData(name){
                const data = {name:name}
                let res =await get('/api/fixs', data)
                const myFixsList = res.data
                for(let i = 0;i<myFixsList.length;i++){
                    myFixsList[i].time = this.dateFormat(myFixsList[i].time)
                }
                this.globalData.fixsData = myFixsList
                this.myRepair = this.globalData.fixsData
            },
            async getUserInfo(name){
                const data = {name:name}
                let res =await get('/api/fixs', data)
                const myFixsList = res.data
                for(let i = 0;i<myFixsList.length;i++){
                    myFixsList[i].time = this.dateFormat(myFixsList[i].time)
                }
                this.globalData.fixsData = myFixsList
                this.myRepair = this.globalData.fixsData
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
            sleep(ms) {
                return new Promise(function(resolve, reject) {
                    setTimeout(resolve, ms);
                });
            },
            toPublish(url){
                if(url == '../index/main'){
                    wx.switchTab({
                        url: url
                    });
                }else{
                    wx.navigateTo({
                        url: url
                    });  
                }
                 
            },
        }
    }
</script>
<style scoped>
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
}
.fenxiang>button[class="contactusBtn"]{
  background: #0d91dd; 
  color: #fff; 
  height:80rpx; 
  border-radius:50%;
  margin-top: 5px;
}
.fenxiang>button[class="fenxiangBtn"]{
  background: #08cc33; 
  color: #fff; 
  height:80rpx; 
  border-radius:50%;
  margin-top: 5px;
}

.header-tab {
  padding: 10rpx 0;
  background-color: var(--color-white);
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

.warring_top{
  width: 100%;
  padding: 30rpx;
  background-color: #fff;
}
.warringico{
  width: 120rpx;
  height: 120rpx;
  margin:0px auto;
  display: block;
}
.warring_text{
  margin: 20px auto;
  text-align: center;
}

.goToSendText{
  text-align: center;
  font-size: 25rpx;
  color: #0d91dd;
  font-weight: bold;
}

.warring_btn{
  width: 90%;
  background: linear-gradient(to right, #6496F7, #2F6BE3);
  color: #fff;
  margin-top: 50rpx;
}
.mainList{
  width: 95%;
  background-color: #fff;
  height:380rpx;
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
.item-footer{
    display: flex;
  margin-top: 30rpx;
  
  margin-left: 60rpx;
  
}
.level-tag{
    margin-top: 3px;
    height: 17px;
    background-color:#07c160;
    padding:0 5px;
    font-size: 21rpx;
    color: #fff;
    float:right;
}
</style>