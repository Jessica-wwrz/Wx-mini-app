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
                    <div class="myitem" v-for="(item , idx) in loadData" :key="idx">
                        <div class="myitemPic">
                            <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
                        </div>
                        <div class="myitemMessage">
                            <div>报修人：{{item.name}}</div>
                            <div>报修物品：{{item.things}}</div> 
                            <div>报修人电话：{{item.tel}}</div>
                            <div>申报时间：{{item.time}}</div>
                        <div class="item-footer">			
                            <text @click="toDetail(item.idx)" style="border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
                        </div>
                        </div>
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
                    <div class="myitem" v-for="(item , idx) in loadedData" :key="idx">
                        <div class="myitemPic">
                            <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
                        </div>
                        <div class="myitemMessage">
                            <div>报修人：{{item.name}}</div>
                            <div>报修物品：{{item.things}}</div> 
                            <div>报修人电话：{{item.tel}}</div>
                            <div>申报时间：{{item.time}}</div>
                         <div class="item-footer">			
                            <text @click="toDetail(item.idx)" style="border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
                        </div>
                        </div>
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
                    <div class="myitem" v-for="(item , idx) in isGoodData" :key="idx">
                        <div class="myitemPic">
                            <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
                        </div>
                        <div class="myitemMessage">
                            <div>报修人：{{item.name}}</div>
                            <div>报修物品：{{item.things}}</div> 
                            <div>报修人电话：{{item.tel}}</div>
                            <div>申报时间：{{item.time}}</div>
                         <div class="item-footer">			
                            <text @click="toDetail(item.idx)" style="border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text>
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
            tabName: ["新报工单", "我的工单",'历史工单'],
            tabIndex: 0,
            scrollHeight: null,
            loadData:[],
            loadedData:[],
            isGoodData:[],
            repairManData:{},
        };
    },
 
    methods: {
        toDetail(id){
            wx.navigateTo({
                url: '../detail/main?id=' + id 
            })
        },
        async getData(name){
            const data1 = {status:'loading'}
            const data2 = {status:'loaded', fixname:name}
            const data3 = {status:'isGood',fixname:name}

            const res1 = await get('/api/status/fixs',data1)
            const res2 = await get('/api/fixname/fixs',data2)
            const res3 = await get('/api/fixname/fixs',data3)
            for(let i = 0;i<res1.data.length;i++){
                res1.data[i].time = this.dateFormat(res1.data[i].time)
            }
            for(let i = 0;i<res2.data.length;i++){
                res2.data[i].time = this.dateFormat(res2.data[i].time)
            }
            for(let i = 0;i<res3.data.length;i++){
                res3.data[i].time = this.dateFormat(res3.data[i].time)
            }
            this.loadData = res1.data
            this.loadedData = res2.data
            this.isGoodData = res3.data
    
            
        },
        tabClick(e) {
            console.log(e);
        },
        async clickTab(e) {
            // 点击tab切换页面
            this.tabIndex = e;
        },
        pageChange(e) {
            this.tabIndex = e.target.current;    
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
    },
    mounted() {},
    async onLoad(e) {
        this.globalData.role = 'repair'
        const data = {
            name: e.name
        }
      const res = await get('/api/getRepairMan', data)
      this.globalData.repair = res.data[0]
      console.log(this.globalData.repair.fixname)
      this.getData(this.globalData.repair.fixname)
    },
    onShow() {
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
  height:350rpx;
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
.list{
    width: 95%;
    height: 150px;
    background: #fff;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 10rpx;
    display: flex;
}
</style>
