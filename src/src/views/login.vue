<template>
  <div id="login">
    <top @go="go" v-bind="userinfo"></top>
    <div class="tab">
      <tab type='2' @search="search"></tab>
    </div>
    <!--  -->
    <div class="content">
      <div class="top d-flex d-flex-middle">
       <img src="../../../static/home.png"/>
       <p>登录协同贸易</p>
      </div>
      <div class="view">
        <div class="viewLi">
          <div class="title d-flex d-flex-middle d-flex-between">
            <p class="titleL">手机号</p>
          </div>
          <input type="tel" name="telephone" v-model="telephone" />
        </div>
        <div class="viewLi">
          <div class="title d-flex d-flex-middle d-flex-between">
            <p class="titleL">密码</p>
            <p class="titleR click" @click="toast">忘记密码</p>
          </div>
          <input type="password" name="password" v-model="password" />
        </div>
        <p class="submit" @click="auth">登录</p>
      </div>
    </div>
    <div class="bottom">
      <bottom></bottom>
    </div>
  </div>
</template>

<script>
  import tab from '../../components/tab.vue'
  export default{
    name: 'login',
    components:{
      tab
    },
    data(){
      return{
        telephone:'',
        password:'',
        userinfo:this.$cookies.get('userinfo')
      }
    },
    mounted(){
      this.chechAuth();
    },
    methods:{
      toast:function(){
        this.$message({
          message: '请联系平台客服',
          type: 'warning'
        });
      },
      chechAuth:function(){
        if(this.userinfo){
          this.$message.error('已经登陆，请不要重复登陆');
          this.$router.push({path:'/'});
        }
      },
      search:function(value){
        this.$router.push({path:'/search',query:{value:value}})
      },
      go:function(url){
        if(url!='login'){
          this.$router.push({path:'/'+url})
        }
      },
      shopCart:function(data){
        this.$router.push({path:'/shopCart'})
      },
      auth:function(){
        if(this.telephone.trim() == ''){
          this.$message.error('请输入手机号！')
          return
        }
        if(this.password.trim() == ''){
          this.$message.error('请输入密码！')
          return
        }
        this.axios.post('/api/login',{telephone:this.telephone, password:this.password}).then(res=>{
          if(res.data.status == 200){
            this.$cookies.set('api_token',res.data.data.user.api_token);
            this.$cookies.set('type',res.data.data.user.type);
            this.$cookies.set('userinfo',res.data.data.user);
            this.type = res.data.data.user.type;
            this.userinfo = this.$cookies.get('userinfo');
            this.api_token = this.$cookies.get('api_token');
            if(this.type == 2){
              // this.$message('请在右上角进行选择医院');
            }
            this.$router.push({path:'/'})
          }else{
            this.$message.error(res.data.msg)
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
 $color:#109E89;
  #login{
    .tab{
      margin: 48px 0 80px 0;
    }
    .content{
      .top{
        margin-bottom: 40px;
        img{
          width: 35px;
          height: 37px;
          margin-right: 18px;
        }
        p{
          font-size: 24px;
        }
      }
      .view{
        width:1200px;
        height:806px;
        border:2px solid rgba(240,240,240,1);
        box-sizing: border-box;
        padding: 160px 340px;
        .viewLi{
          margin-bottom: 70px;
          width: 520px;
          .title{
            margin-bottom: 30px;
            p{
              font-size: 24px;
            }
            .titleR{
              color: #FF6700;
            }
          }
          input{
            height: 70px;
            line-height: 70px;
            text-indent: 10px;
            background-color: #F0F0F0;
            border-radius: 8px;
            width: 100%;
            font-size: 24px;
          }
        }
        .submit{
          color: #fff;
          width: 520px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          font-size: 24px;
          border-radius: 8px;
          margin-top: 80px;
          background-color: $color;
        }
      }
    }
    .bottom{
      border-top: 1px solid #F5F7FA;
    }
  }
</style>
