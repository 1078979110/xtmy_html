<template>
  <div class="topbar">
    <div class="content d-flex d-flex-middle d-flex-between">
      <p class="title">您好，欢迎进入协同贸易网</p>
      <div class="right d-flex d-flex-middle d-flex-end">
        <p class="color click" v-if="!api_token" @click="go('login')">登录</p>
        <p class="color click ml0" v-else @click="showFn">{{telephone}}</p>
        <p class="color click" @click="go('order')">我的订单</p>
        <p class="color click" @click="selecth" v-if="type!=1 && hid==0">选择医院</p>
        <p class="color click" @click="selecth" v-if="type!=1 && hid!=0">{{hospital}}</p>
        <div class="hospital" v-if="api_token && showHl" v-loading="loading">
          <p @click="changeh(i)" v-for="(item ,i) in hospitallist" :title="item">{{item}}</p>
        </div>
        <div class="info" v-if="api_token && show">
          <p @click="go('password')">修改密码</p>
          <p @click="logout">退出登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'top',
    props:['api_token', 'telephone','type'],
    data(){
      return{
        hospitallist:[],
        hid:this.$cookies.get('hid')?this.$cookies.get('hid'):0,
        hospital:this.$cookies.get('hospital')?this.$cookies.get('hospital'):'',
        show: false,
        showHl:false,
        api_token_: this.$cookies.get('api_token')?this.$cookies.get('api_token'):'',
        loading: null
      }
    },
    methods:{
      go:function(url){
        this.$emit('go',url)
      },
      showFn:function(){
        this.show = !this.show
        this.showHl = false;
      },
      selecth:function(){
        if(this.api_token_!=''){
          this.showHl = !this.showHl;
          this.show = false;
          this.loading = true
          this.axios.get('/api/hospital?api_token='+ this.api_token).then(res=>{
            if(res.data.status == 200){
              this.hospitallist = res.data.data.hospital
              this.loading = false
            }else{
              this.$message.error(res.data.msg);
            }
          });
        }else{
          this.$message({
            message: '请先登录',
            type: 'warning'
          });
        }

      },
      changeh:function(id){
        this.axios.post('/api/selecthospital?api_token='+this.api_token,{hid:id}).then(res=>{
          if(res.data.status == 200){
            this.hid = id;
            this.$cookies.set('hid',id);
            this.$cookies.set('hospital',this.hospitallist[id]);
            this.showHl = !this.showHl
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.$router.go(0)
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
      logout:function(){
        this.axios.get('/api/logout?api_token='+this.api_token).then(res=>{
          this.$message(res.data.msg);
          this.$cookies.remove('mycar');
          this.$cookies.remove('hid');
          this.$cookies.remove('hospital');
          this.$cookies.remove('api_token');
          this.$cookies.remove('userinfo');
          this.$cookies.remove('type');
          this.$router.push({path:'/login'});
        });
      }
    }
  }
</script>

<style scoped>
.topbar{
  background-color: #EEEEEE;
  height: 34px;
  width: 100%;
  line-height: 34px;
}
.topbar p{
  font-size: 12px;
}
.title{
  color: #888888;
}
.right{
  position: relative;
}
.right .click{
  margin-left: 30px;
}
.info{
  position: absolute;
  top: 34px;
  left: 0;
  width:88px;
  height:80px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  padding: 10px;
  z-index: 999;
}
.info p,.hospital p{
  margin-top: 20rpx;
  font-size:12px;
  font-weight:500;
  color:#333333;
  margin-left: 0 important;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.hospital{
  position: absolute;
  top: 34px;
  right: 0;
  width:120px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  padding: 10px;
  z-index: 999;
}
.hospital p{
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.ml0{
  margin-left: 0 !important;
}
</style>
