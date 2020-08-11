<template>
  <div id="topbar">
    <div class="content d-flex d-flex-middle d-flex-between">
      <p class="title">您好，欢迎进入协同贸易网</p>
      <div class="right d-flex d-flex-middle d-flex-end">
        <p class="color click" v-if="!info" @click="go('login')">登录</p>
        <p class="color click" v-else>15584523523</p>
        <p class="color click" @click="go('order')">我的订单</p>
        <p class="color click" v-if="type!=1">选择医院</p>
        <div class="info" v-if="info">
          <p @click="go('password')">修改密码</p>
          <p>退出登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
/*    props:{
      info: {
        default: this.$cookies.get('user'),
      }
    },*/
    data(){
      return{
        info:this.$cookies.get('user'),
        type:this.$cookies.get('type'),
      }
    },
    methods:{
      go:function(url){
        this.$emit('go',url)
      }
    }
  }
</script>

<style scoped>
#topbar{
  background-color: #EEEEEE;
  height: 34px;
  width: 100%;
  line-height: 34px;
}
#topbar p{
  font-size: 12px;
}
.title{
  color: #888888;
}
.right{
  position: relative;
}
.right p{
  margin-left: 30px;
}
.info{
  position: absolute;
  top: 34px;
  width:88px;
  height:80px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  padding: 0 20rpx 20rpx 20rpx;
}
.info p{
  margin-top: 20rpx;
  font-size:12px;
  font-weight:500;
  color:#333333;
}
</style>
