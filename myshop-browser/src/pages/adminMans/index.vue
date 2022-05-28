<template>
    <div class="content">
        <div class="coupons-head">
            <div
                :class="tabIndex === index ? 'text active' : 'text'"
                @click="clickTab(index)"
                v-for="(item, index) in tabName"
                :key="index"
            >
                {{ item }}
            </div>
        </div>

        <swiper
            class="swiper"
            :current="tabIndex"
            :style="'height:' + contentH"
            @change="pageChange"
        >
            <!--  页面内容 -->
            <swiper-item class="swiper-item">
                <scroll-view
                    style="height: 100%; width: 100%"
                    scroll-y="true"
                    scroll-x="false"
                >
                <div  class="myItemList">
                    <div class="myitem" v-for="(item , idx) in userData" :key="idx">
                        <div class="myitemPic">
                            <image style="width:100%;height:100%;float: left;" :src="item.avaterUrl" alt />
                        </div>
                        <div class="myitemMessage">
                         <div>真实姓名：{{item.userName}}</div> 
                         <div>昵称：{{item.nickName}}</div>
                         <div>电话：{{item.telNumber}}</div>
                         <div class="item-footer" style="margin-top: 0;margin-left: 180rpx;">
                            <text @click="todetele(item.idx)" style="margin-right:10rpx;font-size: 12px;border: 1px solid red;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;color:red;">删除用户</text>
                            <text @click="toUserDetail(item.idx)" style="margin-right:10rpx;font-size: 12px;border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
                        </div>
                        </div>
                        
                    </div>
                    <!-- <div style="margin-top:18px">
                        <button class="updateBtn" @click="addUser" >新增用户</button>
                    </div>  -->
                </div>
                   
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    style="height: 100%; width: 100%"
                    scroll-y="true"
                    scroll-x="false"
                >
                <div  class="myItemList">
                    <div class="myitem" style="height:150px"  v-for="(item , idx) in fixData" :key="idx">
                        <div class="myitemPic">
                            <image style="width:100%;height:100%;float: left;" :src="item.fixAvatarUrl" alt />
                        </div>
                        <div class="myitemMessage">
                         <div > 真实姓名：{{item.fixname}}</div> 
                         <div >电话：{{item.fixtelnumber}}</div>
                         <div >工龄：{{item.fixAge}}</div> 
                         <div >擅长方向：{{item.goodType}}</div>
                         <div class="item-footer" style="margin-left: 180rpx;">
                            <text @click="deteleRepair(item.idx)" style="margin-right:10rpx;font-size: 12px;border: 1px solid red;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;color:red;">删除人员</text>
                            <text @click="torepairDetail(item.idx)" style="margin-right:10rpx;font-size: 12px;border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
                        </div>
                        </div>
                    </div>
                    <div style="margin-top:18px">
                        <button class="updateBtn" @click="addrepair" >新增维修工程师</button>
                    </div> 
                </div>  
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view
                    style="height: 100%; width: 100%"
                    scroll-y="true"
                    scroll-x="false"
                >
                <div  class="myItemList">
                    <div style="height:170px" class="myitem" v-for="(item , idx) in reportData" :key="idx">
                        <div class="myitemPic">
                            <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
                        </div>
                        <div class="myitemMessage">
                         <div>报修人：{{item.name}}</div>
                            <div>报修机器：{{item.things}}</div> 
                            <div>报修人电话：{{item.tel}}</div>
                            <div>申报时间：{{item.time}}</div>
                         <div class="item-footer">	
                            <text @click="todeteleRepair(item.idx,item.name)" style="border: 1px solid red;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;color:red;">删除工单</text>			
                            <text @click="toDetail(item.idx)" style="border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;margin-left:10px">查看详情</text>
                        </div>
                        </div>
                    </div>
                </div>
                </scroll-view>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>

import {get , post} from '../../utils'
export default {
    data() {
        return {
            tabName: ["用户管理", "维修人员管理",'工单管理'],
            tabIndex: 0,
            scrollHeight: null,
            userData:[],
            fixData:[],
            reportData:[],
        };
    },
    methods: {
        async addrepair(){
            wx.navigateTo({
                url: '../repairDetail/main'
            })
        },
        async deteleRepair(id){
            console.log(id);
            const that = this
                wx.showModal({
                    title: '温馨提示',
                    content: '是否确定删除维修人员',
                   async success (res) {
                    if (res.confirm) {
                       const data = {idx:id}
                       const res = await post('/api/deteleRepair', data) 
                        wx.showToast({
                            title: '已删除！', // 标题
                            icon: 'success',  // 图标类型，默认success
                            duration: 1500  // 提示窗停留时间，默认1500ms
                        })
                      wx.redirectTo({url:'/pages/adminMans/main'}) 
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                    }
                })

        },
        torepairDetail(id){
            wx.navigateTo({
                url: '../repairDetail/main?id=' + id 
            })
        },
        async todeteleRepair(id,name){
            const that = this
                wx.showModal({
                    title: '温馨提示',
                    content: '是否确定删除报修',
                   async success (res) {
                    if (res.confirm) {
                       const data = {idx:id}
                       const res = await post('/api/detele', data) 
                        wx.showToast({
                            title: '已删除！', // 标题
                            icon: 'success',  // 图标类型，默认success
                            duration: 1500  // 提示窗停留时间，默认1500ms
                        })
                      wx.redirectTo({url:'/pages/adminMans/main'}) 
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                    }
                })
        },
        async todetele(idx){
            console.log(idx)
            const data = { idx : idx}
            const res = await post('/api/user/detele', data)
            console.log(res);
             wx.showToast({
                title: '删除成功！', // 标题
                icon: 'success',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
            })
            wx.redirectTo({url:'/pages/adminMans/main'})
        },
        toUserDetail(id){
             wx.navigateTo({
                url: '../userDetail/main?id=' + id 
            })
        },
        toDetail(id){
            wx.navigateTo({
                url: '../detail/main?id=' + id 
            })
        },
        async tabs(){
            const userRes = await get('/api/getAllUser')
            const fixRes = await get('/api/getAllFixpreson')
            const reportRes = await get('/api/all/fixs')
            this.userData = userRes.data
            this.fixData = fixRes.data
            
            for(let i = 0;i<reportRes.data.length;i++){
                reportRes.data[i].time = this.dateFormat(reportRes.data[i].time)
            }
            this.reportData = reportRes.data
            console.log(fixData);
        },
        tabClick(e) {
            console.log(e);
        },
        clickTab(e) {
            // 点击tab切换页面
            this.tabIndex = e;
        },
        pageChange(e) {
            this.tabIndex = e.target.current;
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
        setSwiperHeight() {
            let _this = this;
            let res = wx.getSystemInfoSync();
            console.log(res);
            let winH = res.windowHeight;
            const query = wx.createSelectorQuery();
            query.select(".coupons-head").boundingClientRect();
            query.exec(function (res) {
                console.log(res);
                console.log(res[0].height);
                let h = res[0].height;
                _this.scrollHeight = winH - h; // tab使用fixed固定时  就不用减去h高度了
            });
        },
    },
    mounted() {},
    onLoad(e) {
        this.tabs()
    },
    onShow() {
        this.tabs()
        this.setSwiperHeight();
    },
    computed: {
        contentH() {
            return this.scrollHeight + "px";
        },
    },
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
};
</script>

<style  scoped>
.coupons-head {
    height: 90rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.text {
    padding-bottom: 10rpx;
}
.text.active {
    padding-bottom: 10rpx;
    color: #f60f23;
    border-bottom: 2rpx solid #f60f23;
}

.myItemList{
  width: 100%;
  background-color: #eee;
  height:100%;
  /* margin: 0 auto; */
  /* margin-top: 10rpx; */
  /* border-radius: 10rpx; */
  /* display: flex; */
}

.myitem{
  width: 95%;
  background-color: #fff;
  height:210rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 10rpx;
  display: flex;
}
.myitem .myitemPic{
  width:180rpx;
  height: 160rpx;
  margin-top: 20rpx;
  margin-left:20rpx;
  overflow: hidden;
  position: relative;
}
.myitem .myitemMessage{
  width:450rpx;
  
  position: relative;
  float: right;
  height: 160rpx;
  margin-top: 20rpx;
  margin-left:40rpx;
}
.info{
    width: 20px;
}
.item-footer{
  margin-top: 30rpx;
  margin-left: 120rpx;
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

</style>
