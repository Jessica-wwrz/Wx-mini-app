<template>
  <div class="login">
    <div style="width:80%">
      <div class="main" >
          <image style="width:100%;height:100%" src="../../static/images/admin.png" />
      </div>
      <div class="form-group">
        <label style="width:60px;margin-top: 5px;">用户名:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px"  v-model="username" placeholder="请输入用户名" />
      </div>
      <div class="form-group">
        <label style="width:60px;margin-top: 5px;">密码:</label>
        <input style="border: 1px solid #eee;flex:1;height:35px" type="password" v-model="password" placeholder="请输入密码"/>
      </div>
      <div class="section">
        <button style="color:#fff" @click="login">登录</button>
      </div>
    </div>
    <!-- <div class="header-tab">
        <div ></div>
    </div>
    <block >
        <div class="card-item">
            <div class="item-content border-bottom">
                <div class="left-box">
                    <image  mode="aspectFill"></image>
                </div>
                <div class="right-box">
                    <div class="floor">
                        <div >
                            {{item.level}}</div>
                    </div>
                    <text class="date">{{item.createTime}}</text>
                    <text class="desc">{{item.desc}}</text>
                    <van-tag >{{item.status}}</van-tag>

                </div>
            </div>
            <div class="item-footer">
                <text  style="border: 1px solid red;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;color:red;">删除工单</text>
                <text class="confirm-text-btn" style="color: rgb(31, 134, 0);border: 1px solid rgb(31, 134, 0);padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">确认处理</text>
                <text style="border: 1px solid #1989FA;padding:5rpx 10rpx 5rpx 10rpx;border-radius: 15rpx;">查看详情</text> -->
                <!-- <text class="delete-text-btn" data-id="{{item._id}}" wx:if="{{item.status === '已处理'}}" bindtap="deleteApplyData">删除</text> -->
            <!-- </div>

            <div >
                <div class="cu-dialog">
                    <div class="cu-bar bg-white justify-end">
                        <div class="content">维修反馈</div>
                        <div class="action" >
                            <text class="cuIcon-close text-red"></text>
                        </div>
                    </div>
                    <div class="padding-xl">
                        <div style="margin-bottom: 20rpx;font-weight: bold;">
                            <text>机器：</text>
                            <text style="color: rgb(0, 102, 255);">{{nowOrderData.floor}}机房{{nowOrderData.dorm}}机器</text>
                        </div>
                        <textarea name="" id="" cols="30" rows="10" placeholder="简单描述一下你是怎么修好的(用户不可见，仅供存档使用)" class="weixiuText" bindinput="setadminTallText"></textarea>
                    </div>
                    <div class="cu-bar bg-white justify-end">
                        <div class="action">
                            <button class="cu-btn line-green text-green" >取消</button>
                            <button class="cu-btn bg-green margin-left" >确定</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </block> -->
  </div>
</template>

<script>
  import {get , post} from '../../utils'
  export default {
      
    name: 'login',
    data: () => ({
         tabList: [{
      name: '当前未处理',
      status: '未处理'
    }, {
      name: '当前已处理',
      status: '已处理'
    }],
      
        username: '',
        password: ''
    }),
    methods: {
      async login () {
        const data = {
            username:this.username,
            password:this.password
        }
        let res = await post('/api/auth/login',data)
        console.log(res)
        if(res.code == '200'){
             wx.navigateTo({ url: '../adminMans/main' });
             wx.showToast({
              title: '登录成功！', // 标题
              icon: 'success',  // 图标类型，默认success
              duration: 1500  // 提示窗停留时间，默认1500ms
            })
        }else {
             wx.showToast({
              title: '暂无此管理员！', // 标题
              icon: 'error',  // 图标类型，默认success
              duration: 1500  // 提示窗停留时间，默认1500ms
            })
        }

      }
    }
  }
</script>

<style scoped>
.main{
    width: 100px;
    height: 100px;
    margin: 30px auto;
}
.form-group{
    display: flex;
    margin-top: 25px;
}
  .login {
   background: #fff;
   height: 100%;
   display: flex;
   justify-content: center;
   /* align-items: center; */
  }
  .section{
      border: 1px solid #eee;
      width: 60%;
      margin:30px auto;
      background-color:#A1D676;
      color: #fff;
  }
  form-control{
      border: 1px solid #eee !important;
  }
  .header-box {
  position: sticky;
  top: 0;
  z-index: 2000;
}

.header-tab {
  padding: 10rpx 0;
  background-color: var(--color-white);
}
.weixiuText{
  border: 1px solid #ccc;
  width: 100%;
  height: 300rpx;
  padding: 10rpx;
  background-color: #fff;
  text-align: left;
}
.card-item {
  background-color: var(--color-white);
  margin: 20rpx;
  border-radius: 10rpx;
  position: relative;
}

.card-item .item-content {
  display: flex;
  padding: 20rpx;
  position: relative;
}

.left-box>image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  border: 2px solid rgb(209, 209, 209);
}

.right-box {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 20rpx;
}

.right-box .floor {
  font-weight: bold;
  font-size: 32rpx;
}

.right-box .desc {
  font-size: 28rpx;
  margin: 5rpx 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.right-box .date {
  font-size: 25rpx;
  color: var(--color-text-second);
  margin-top: 5rpx;
}

.card-item .item-footer {
  font-size: 28rpx;
  padding: 10rpx;
  text-align: right;
  color: var(--color-btn-info);
}

.item-footer>text {
  margin-left: 20rpx;
}

.confirm-text-btn {
  color: var(--color-btn-primary);
}

.delete-text-btn {
  color: var(--color-btn-danger);
}

/* .level-tag {
  font-size: 20rpx;
  color: var(--color-white);
  padding: 5rpx 10rpx;
  border-radius: 0 999px 999px 0;
  display: inline-block;
  background-color: var(--color-btn-danger);
  position: absolute;
  top: 20rpx;
  left: 0;
} */
.level-tag {
  font-size: 23rpx;
  color: var(--color-white);
  padding: 5rpx 10rpx;
  /* border-radius: 0 999px 999px 0; */
  display: inline-block;
  background-color: var(--color-btn-danger);
  width: 60px;
  text-align: center;
  /* position: absolute;
  top: 20rpx;
  left: 0; */
}

.flag{
  position: absolute;
  right: 10px;
  top: 10px;
}

</style>