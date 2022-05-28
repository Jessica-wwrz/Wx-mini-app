<template>
  <div>
    <div class="tab">
      <div class="title" @click="handleChange">
        <!-- Vue模板中支持小程序原生组件 -->
        <button data-index="0" :class="{active: currentIndex===0}">进行中</button>
        <button data-index="1" :class="{active: currentIndex===1}">待验收</button>
        <button data-index="2" :class="{active: currentIndex===2}">已完成</button>
      </div>
      <div :class="['item', {active: currentIndex===0}]" >
        <div v-if="item1Flag" class="myItemList">
          <div class="myitem" v-for="(item , idx) in loadData" :key="idx">
            <div class="myitemPic">
              <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
            </div>
            <div class="myitemMessage">
              <!-- <div>维修人：{{item.name}}</div> -->
              <div style="display:flex">
                <div style="width:165px;text-overflow：ellipsis;overflow：hidden;">
                    报修物品：{{item.things}}
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
        <img :src="url" alt style="height:100%;width:100%" v-else />
      </div>
      <div :class="['item', {active: currentIndex===1}]">
        <div v-if="item2Flag" class="myItemList">
          <div class="myitem" v-for="(item , idx) in loadedData" :key="idx">
            <div class="myitemPic">
              <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
            </div>
            <div class="myitemMessage">
              <!-- <div>维修人：{{item.name}}</div> -->
              <div style="display:flex">
                <div style="width:165px;text-overflow：ellipsis;overflow：hidden;">
                    报修物品：{{item.things}}
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
        <img :src="url" alt style="height:100%;width:100%" v-else />
      </div>
      <div :class="['item', {active: currentIndex===2}]">
        <div v-if="item3Flag" class="myItemList">
          <div class="myitem" v-for="(item , idx) in isGoodData" :key="idx">
            <div class="myitemPic">
              <image style="width:100%;height:100%;float: left;" src="../../static/images/myrepair.png" alt />
            </div>
            <div class="myitemMessage">
              <!-- <div>维修人：{{item.name}}</div> -->
              <div style="display:flex">
                <div style="width:165px;text-overflow：ellipsis;overflow：hidden;">
                    报修物品：{{item.things}}
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
        <img :src="url" alt style="height:100%;width:100%" v-else />
      </div>
    </div>
  </div>
</template>
<script>
import {get} from '../../utils'
export default {
  data() {
    return {
      currentIndex: 0,
      winWidth: 0,
      winHeight: 0,
      url: "../../static/images/nodata.png",
      item1Flag:false,
      item2Flag:false,
      item3Flag:false,

      loadData:[],
      loadedData:[],
      isGoodData:[],
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

    };
  },
  onLoad () {
   this.isShow()
  },
  mounted() {
    this.getMyPhone();
    this.getHeight();
  },
  methods: {
    handleChange(e) {
      let index = e.target.dataset.index;
      //字符串转换为数字
      this.currentIndex = parseInt(index);
    },
    getMyPhone() {
      let that = this;
      wx.getSystemInfo({
        success: function(res) {
          console.log(res)
            that.winWidth = res.windowWidth,
            that.winHeight = res.windowHeight - 41;
        }
      });
    },
    async getTabData(){
        let res =await get('/api/fixs')
        console.log(res)
    },
    isShow(){
      if( this.globalData.fixsData.length !== 0 ){
          for(let i = 0;i<this.globalData.fixsData.length;i++){
              if(this.globalData.fixsData[i].status == 'loading'){
                this.loadData.push(this.globalData.fixsData[i]);
              }else if(this.globalData.fixsData[i].status == 'loaded'){
                this.loadedData.push(this.globalData.fixsData[i])
              }else{
                this.isGoodData.push(this.globalData.fixsData[i])
              }
          }
          if(this.loadData.length !== 0){
            this.item1Flag = true
          } 
          if(this.loadedData.length !== 0){
            this.item2Flag = true

          }
          if(this.isGoodData.length !== 0){
            this.item3Flag = true

          }
      }
    },
     toDetail(id){
        wx.navigateTo({
          url: '../detail/main?id=' + id
        })
      },
    getHeight() {
    //   const item = document.getElementsByClassName("item");
    //   console.log(item);
    var query = wx.createSelectorQuery();
    query.select('.item').boundingClientRect();
    query.exec(function (res) {
      //res就是 所有标签为v1的元素的信息 的数组
      console.log(res);  
      //取高度
      console.log(res[0].height);
      })
    }
  }
};
</script>
<style scoped>
.tab .title.data-v-59930eaa {
  display: flex;
}
.tab .title ._button.data-v-59930eaa {
  flex: 1;
}
.tab .title ._button.active.data-v-59930eaa {
  background: #eee;
}
.tab .item.data-v-59930eaa {
  width: 750rpx;
  height: 1028rpx;
  /* line-height: 400rpx; */
  /* text-align: center; */
  background: #eee;
  display: none;
}
.tab .item.active.data-v-59930eaa {
  display: block;
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
  height:240rpx;
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

</style>
