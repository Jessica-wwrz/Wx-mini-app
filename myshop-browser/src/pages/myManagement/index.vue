<template>
    <div> 
    <div style="height:800rpx">
        <div class="topList">
            <span class="text">{{user}}</span>
            <button class="btn">主单位</button>
        </div>
    </div>
     
     <div class="bottomList" >
         <!-- <span class="text">张正鹏</span> -->
         <button >加入单位</button>
     </div>
    <div class="bottomList" style="background: #fff;">
         <!-- <span class="text">张正鹏</span> -->
         <button >创建单位</button>
     </div>
     <div class="bottomList" style="background: rgb(221, 78, 78);">
         <!-- <span class="text">张正鹏</span> -->
         <button >退出单位</button>
     </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                user:''
            }
        },
        onLoad(){
            console.log(this.globalData.userInfo)
            this.user = this.globalData.userInfo.nickName
        }
    }
</script>
<style scoped>
.topList{
    width: 98%;
    display: flex;
    background: #fff;
    margin: 10px auto;
    height: 50px;
}
.text{
    width: 220px;
    margin-left: 40px;
    margin-top: 10px;
}
.btn{
    border: 1px solid #eee;
    height: 30px;
    font-size: 12px;
    width: 62px;
    margin-top: 17rpx;
}
.bottomList{
    width: 90%;
    display: flex;
    background: #37ADFF;
    margin: 10px auto;
    height: 40px;
    border-radius: 5px;
}
</style>