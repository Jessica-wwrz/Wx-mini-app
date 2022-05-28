<template>
  <div>
    <div class="container">
      <div class="row">
		    <div class="name">工单号（必填）</div>
		    <input
		      v-model='fixId'
		      class = "wechat-input"
		      maxlength='20'
		      placeholder="如果想要详细交流，可以点击这里留下微信号哦~"
		    />
			</div>
      <div class="row">
        <label class="name">意见与反馈</label>
      </div>
      <div class="row text">
        <div>
          <textarea
            v-model='opinion'
            class = "input"
            maxlength='200'
            placeholder="点击这里填写你的建议、问题反馈、合作等信息，我会认真对待每一条信息~"
          ></textarea> 
          <!-- word_count用来保存实时输入字数的长度 -->
          <label class="word-count">{{word_count}}/200</label>
        </div>
      </div>

      <div class="row">
		    <div>
		      <label class="name">相关截图（选填）</label>
		      <label class="img-count">{{img_count}}/2</label>
		    </div>
		    <!-- v-for是vue的语法，循环语句，循环显示当前上传的照片 -->
		    <label v-for="(item, index) in src" :key="index">
		      <img class="img" :src="item" >
		    </label>
		    <!-- v-if是判断语句，判断当前照片数量如果小于2张，就显示添加照片的按钮；反之就不显示了
		    在这里添加点击事件，点击按钮调用uploadPicture方法上传照片 -->
		    <label v-if="img_count < 2" @click="uploadPicture">
		      <img class="add-img" :src="addimage">
		    </label>
		    </div>
		    <div class="row">
		    <div class="name">微信号（选填）</div>
		    <input
		      v-model='wechat'
		      class = "wechat-input"
		      maxlength='20'
		      placeholder="如果想要详细交流，可以点击这里留下微信号哦~"
		    />
			</div>
  	</div>
    <button @click="summit">提交</button>
  </div>
</template>

<script>
import { post } from '../../utils'
// import {showModal, post} from '@/util'
export default {
  data () {
    return {

    	opinion: '',
      word_count: 0,
      addimage: '../../static/images/addimage.png',
      img_count: 0,
      src: [],
      wechat: '',
      fixId:'',
      // 用三元运算符直接读取缓存里面的用户信息
      userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {}
    }
  },
  watch: {
	  opinion () {
	    this.word_count = this.opinion.length
	  },
	  src () {
		  this.img_count = this.src.length
    }
  },
  methods: {
	  uploadPicture () {
	    let that = this
	    wx.chooseImage({
	      count: 2,
	      sizeType: ['original', 'compressed'],
	      sourceType: ['album', 'camera'],
	      success (res) {
	        // tempFilePath可以作为img标签的src属性显示图片
	        const tempFilePaths = res.tempFilePaths
	        that.src.push(tempFilePaths)
	        console.log('that.src', that.src)
	      }
	    })
	  },
    async summit () {
      console.log( this.getTime());
      const data = {
        idx:this.getRandomNum(),
        fixId:this.fixId,
        wxName:this.wechat,
        opinions:this.opinion,
        photos:this.src,
        time:this.getTime()
      }
      const res = await post('/api/toSuggest',data)
      wx.showToast({
        title: '提交成功', //提示的内容,
        icon: 'success', //图标,
        duration: 1500, //延迟时间,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
      this.wechat= ''
      this.opinion= ''
      this.src = []
    },
    getRandomNum(n = 5) {
      let rdmNum= "";
      for (let i = 0; i < n; i++) {
        rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
      }
      return rdmNum;
    },
    getTime() {
      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };

      var a = new Date().Format("yyyy-MM-dd HH:mm:ss");

      return (this.nowtime = a);
    },

  }
}
</script>

<style>
.container{
  background:#FFFFFF;
  font-size:15px;
  padding: 100rpx 0 !important;
}  
button {
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}
 .row{
    border-bottom: 1px #E8E8E8 solid;
    width: 90%;
    padding: 5px 15px;
}
.text {
    height: 110px;
  }
  .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width:100%;
      height:85px;
      font-size:14px;
      padding-top:5px;
    }
    .word-count {
      float:right;
      color: #808080;
    }
    .img-count {
      float:right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width:80px;
      height:80px;
    }
    .img {
      width:66px;
      height:66px;
      margin-bottom:7px;
      margin-right: 10px;
    }
    .wechat-input{
      font-size:14px;
    }
</style>