<template>
    <div>
        <div class="topImage">
            <div v-if="status == 'loading'">
                <image src="../../static/images/dingdanerror.png"></image>
            </div>
            <div v-if="status == 'loaded'">
                <image src="../../static/images/dingdandata.png"></image>
            </div>
            <div v-else-if="status == 'isGood'">
                <image src="../../static/images/dingdansucces.png"></image>
            </div>

            <div class="topImageUpTitle">
                <div v-if="status == 'loading'">
                    <image src="../../static/images/cuo.png"></image>
                    <text>工单正在等待接单</text>
                </div>
                <div v-if="status == 'loaded'">
                    <image src="../../static/images/toload.png" style="margin-right:5rpx"></image>
                    <text>工单已接单</text>
                </div>
                <div v-else-if="status == 'isGood'">
                    <image src="../../static/images/dui.png"></image>
                    <text>工单已处理完毕</text>
                </div>
            </div>
        </div>
        <div class="orderView">
            <div class="apply-table" >
                <div class="title-img"></div>
                <div class='apply-title'>工单详情</div>
                <div class="apply-item" >
                    <div>
                        <text class="apply-item-title">调机人：{{itemData.name}}</text>
                        <!-- <text class="apply-item-data">号机房号机</text> -->
                    </div>
                    <div>
                        <text class="apply-item-title">维修机器：{{itemData.things}}</text>
                        <!-- <text class="apply-item-data">号机房号机</text> -->
                    </div>
                    <div>
                        <text class="apply-item-title" >维修地址：{{itemData.address}}</text>
                        <!-- <text class="apply-item-data">号机房号机</text> -->
                    </div>
                    <div>
                        <!-- <text class="apply-item-title">故障级别：</text> -->
                        <text class="apply-item-data"></text>
                    </div>
                    <div>
                        <text class="apply-item-title">处理状态：{{state[itemData.status]}}</text>
                        <text class="apply-item-data"></text>
                    </div>
                    <div>
                        <text class="apply-item-title">提交日期：{{itemData.time}}</text>
                        <text class="apply-item-data"></text>
                    </div>
                    <div>
                        <text class="apply-item-title">详细描述：{{itemData.desc}}</text>
                        <text class="apply-item-data"></text>
                    </div>
                    <div  style="display:flex">
                        <text class="apply-item-title">故障图片：</text>
                        <div class="photos">
                            <image :src=itemData.picture  style="width:100%;height:100%;margin-left:20rpx;margin-top:5px"></image>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="apply-table">
                <div class="title-img"></div>
                <div class='apply-title'>维修人</div>
                <div class="apply-item" v-if="flag">
                    <div>
                        <text class="apply-item-title">工程师姓名：{{itemData.repairMan}}</text>
                        <text class="apply-item-data"></text>
                    </div>
                    <!-- <div >
                        <text class="apply-item-title">联系电话： {{itemData.tel}}</text>
                        <text class="apply-item-data" style="color: rgb(0, 81, 255);" ></text>
                    </div> -->
                    <div >
                        <text class="apply-item-title">工程师电话： </text>
                        <text class="apply-item-data"  >{{itemData.repairManTel}}</text>
                    </div>
                </div>
                <div v-else style="margin-top:15px">
                    暂无分配工程师
                </div>
            </div>
            <div v-if="role == 'repair'" >
                <button v-if="itemData.status == 'loading'" class="updateBtn" @click="submit" >接受工单</button>
                <!-- <button class="deleteBtn" bindtap="deleteApplyData" data-id="{{data._id}}">删除工单</button> -->
            </div>
            <div v-if="role == 'repair'">
                <button v-if="itemData.status == 'loaded'" class="updateBtn" @click="isOk" >确认修复</button>
                <!-- <button class="deleteBtn" bindtap="deleteApplyData" data-id="{{data._id}}">删除工单</button> -->
            </div>
            <div style="margin-top:10px">
                <button class="updateBtn" @click="toBack" >返回首页</button>
                <!-- <button class="deleteBtn" bindtap="deleteApplyData" data-id="{{data._id}}">删除工单</button> -->
            </div>
        </div>

    </div>
</template>

<script>
   import{ get, post } from '../../utils'
    export default {
        data(){
            return {
              itemData:[],
              status:'',
              state:{
                'loading':'进行中',
                'loaded' :'待验证',
                'isGood' :'已完成'
              },
              flag:false,
              fixId:'',
              role:''
            }
        },
        async onLoad(options){
            this.role = this.globalData.role
            console.log(this.role)
            this.fixId = options.id
            const data = {id:options.id}
            const res =  await get('/api/id/fixs',data)
            console.log(res)
            this.itemData = res.data[0]
            if(this.itemData.repairMan == '' || this.itemData.repairMan == null){
                this.flag = false
            }else{
              this.flag = true
            }
            this.itemData.time = this.dateFormat(this.itemData.time)
            this.status = this.itemData.status
        },
        methods:{
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
            isOk(){
               const that = this
              const data ={idx:that.fixId, status:'isGood'}
              const res = post('/api/update',data)
              wx.redirectTo({url:'/pages/repairMan/main?name=' + that.globalData.repair.fixname}) 
              console.log(res)
            },
            toBack(){
                wx.switchTab({ url: '../index/main' });
            },
            async updateData(){
               const that = this
               const data = {
                      idx: that.fixId,
                      status:'loaded',
                      repairMan:that.globalData.repair.fixname,
                      fixtelnumber:that.globalData.repair.fixtelnumber
                    }
                    const res = await post('/api/getRepair', data)
                    wx.redirectTo({url:'/pages/repairMan/main?name=' + that.globalData.repair.fixname}) 
                    console.log(res);
            },
            submit(){
              const that = this
               wx.showModal({
                title: '是否确认接受工单',
                content: '确认工单后不可修改',
                mask: true,
                async success (res) {
                  if (res.confirm) {
                   that.updateData()
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
        }
    }
</script>
<style scoped>
.topImage{
  width: 100%;
  position: relative;
  z-index: -1;
}
.topImage image{
  width: 100%;
}
.topImageUpTitle{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  position: fixed;
  top: 120rpx;
  left: 0;
  right: 0;
  margin:0 auto;
}
.topImageUpTitle image{
  width: 80rpx;
  height: 80rpx;
  vertical-align: middle;
}
.topImageUpTitle text{
  color:#fff;
  font-size: 28rpx;
  font-weight: bold;
}

/* 工单详情 */
.orderView{
  margin:-120px auto;
}
.apply-table{
  z-index: 1;
  width: 90%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  background-color: #fff;
  padding: 20rpx;
  
  border-radius: 10rpx;
  position: relative;
  margin: 10px auto;
}
.apply-title{
  font-weight: bolder;
  font-size: 30rpx;
  height: 30rpx;
  line-height: 30rpx;

}
.title-img{
  width: 10rpx;
  height: 30rpx;
  background-color:rgb(26, 147, 247);
  vertical-align: middle;
  margin-right: 10rpx;
  position: absolute;
  left: 0rpx;
}
.apply-item{
  margin-top: 10rpx;
}
.apply-item-title{
  font-weight: 500;
  font-size: 28rpx;
}
.apply-item-data{
  font-size: 28rpx;
  color: rgb(102, 100, 100);
}
.updateBtn{
  background-color: rgb(9, 112, 247);
  color: #fff;
  width: 80%;
}
.updateBtn:active{
  background-color:#fff;
  color: rgb(9, 112, 247);
  border: 1px solid rgb(9, 112, 247);
  width: 80%;
}

.deleteBtn{
  margin-top: 20rpx;
  background-color: rgb(230, 74, 74);
  color: #fff;
  width: 80%;
}
.deleteBtn:active{
  margin-top: 20rpx;
  background-color:#fff;
  color: rgb(230, 74, 74);
  border: 1px solid  rgb(230, 74, 74);
  width: 80%;
}
.photos{
	width:150rpx;
	height: 150rpx;
  border-radius: 10rpx;
}
</style>