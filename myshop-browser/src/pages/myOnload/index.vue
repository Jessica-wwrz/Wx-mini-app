<template>
    <div>
      <div class="maxview">
        <div class="userinfo">
            <div class="userlogo">
            <image :src="userinfo.avatarUrl" style="width: 150rpx;height: 150rpx;"></image>
            </div>
            <div class="username">
            {{userinfo.nickName}}
            </div>
            <div class="usertext">尊贵报修的用户</div>
        </div>

        <div class="giveMoneyArea">
            <div class="give_money_text">支付酬金</div>
            <div class="input_logo">
                <image src="../../static/images/money.png"></image>
            </div>
            <input type="number" v-model="principal_money" class="give_money_input"/>
        </div>
        <div class='panel-around'>
            <div v-for="(item, idx) in kdtype" :key="idx" :class="[idx == flag ? 'fgh2' : 'fgh']" @click="change(idx)">{{item.la}}</div>
        </div>
      </div>
        <div class="giveyou">
            <button @click="goPay">确认支付</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                principal_money:1,
                flag:0,
                userinfo:{},
                kdtype: [{ la: '1元', price: 1 }, { la: '5元', price: 5 }, { la: '10元', price: 10 }, { la: '20元', price: 20 }, { la: '30元', price: 30 },{ la: '50元', price: 50 }],
            }
        },
        onLoad(){
            console.log()
            this.userinfo = this.globalData.userInfo
        },
        methods:{
            change(idx){
                this.principal_money= this.kdtype[idx].price
                this.flag = idx
            },
             //支付方法
            goPay(){
            let that = this;
                wx.showModal({
                cancelColor: 'cancelColor',
                title:"支付成功",
                content:"感谢您的支付，我们会继续努力的！",
                showCancel:false
                })
            },
        }
    }
</script>
<style scoped>
.maxview{
  background-color: #fff;
  overflow: hidden;
}
.userinfo{
  padding: 20rpx;
}
.userlogo{
  text-align: center;
  width: 150rpx;
  height: 150rpx;
  margin:20px auto;
  border: 3px solid orange;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10rpx;
}
.username{
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
}
.usertext{
  text-align: center;
  font-size: 25rpx;
  color: rgb(128, 127, 127);
}

.giveMoneyArea{
  padding: 20rpx;
  overflow: hidden;
}
.give_money_text{
  font-size: 25rpx;
  color: rgb(128, 127, 127);
}
.input_logo{
  font-style: 30rpx;
  float: left;
  width: 10%;
  
}
.input_logo image{
  width: 60rpx;
  height: 60rpx;
  margin-top: 20rpx;
}
.give_money_input{
  width: 86%;
  float: right;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 50rpx;
  text-align: right;
  padding-right: 25rpx;
  border-bottom: 1rpx solid #ccc;
}

/* 选择金额 */
.panel-around{
  overflow: hidden;
  padding-bottom: 50rpx;
}
.panel-around view{
  float: left;
  margin-left: 16rpx;
  width: 30%;
}
.fgh{
  width: 190rpx;
  height: 80rpx;
  border: 1px solid #e1e1e1;
  font-size: 30rpx;
  text-align: center;
  line-height: 80rpx;
  margin-top: 30rpx;
  color: #888
}
.fgh2{
  width: 190rpx;
  height: 80rpx;
  border: 1px solid #ff6633;
  font-size: 30rpx;
  text-align: center;
  line-height: 80rpx;
  margin-top: 30rpx;
  color: #ff6633
}

.giveyou{
  width: 60%;
  margin: 100rpx auto;
}

/* 分享月老 */
.giveyou button{
  width: 100% !important;
  background-color: #FB6E74;
  color: #fff;
  border-radius: 20rpx;
}
.giveyou button:active{
  width: 100% !important;
  background-color: #ff444d;
  color: #fff;
  border-radius: 20rpx;
}
</style>