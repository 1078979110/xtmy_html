<template>
  <div id="login">
    <top @go="go" v-bind="userinfo" ref="top"></top>
    <div class="tab">
      <tab type='2' @search="search"></tab>
    </div>
    <!--  -->
    <div class="content">
      <div class="top d-flex d-flex-middle">
       <img src="../../../static/home.png"/>
       <p>修改密码</p>
      </div>
      <div class="view">
        <div class="viewLi">
          <div class="title d-flex d-flex-middle d-flex-between">
            <p class="titleL">原密码</p>
          </div>
          <input type="password" name="password" v-model="password" />
        </div>
        <div class="viewLi">
          <div class="title d-flex d-flex-middle d-flex-between">
            <p class="titleL">新密码</p>
          </div>
          <input type="password" name="newpassword" v-model.lazy="newpassword" />
        </div>
        <div class="viewLi">
          <div class="title d-flex d-flex-middle d-flex-between">
            <p class="titleL">再次确认密码</p>
          </div>
          <input type="password" name="comfirmpassword" v-model.lazy="comfirmpassword" />
        </div>
        <p class="submit" @click="changepwd">确定</p>
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
    name:'password',
    components:{
      tab
    },
    data(){
      return{
        userinfo:this.$cookies.get('userinfo'),
        password:'',
        newpassword:'',
        comfirmpassword:''
      }
    },
    computed:{
      passwordCheckValidate: function(){
        if(this.comfirmpassword !== this.newpassword){
          this.$message({
            message:'确认密码和新密码不一致!',
            type: 'warning'
          })
          return false;
        }
      }
    },
    methods:{
      search:function(value){
        this.$router.push({path:'/search',query:{value:value}})
      },
      go:function(url){
        if(url != 'password'){
          this.$router.push({path:'/'+url})
        }else{
          this.$refs.top.showFn();
        }
      },
      changepwd: function(){
        this.passwordCheckValidate;
        this.axios.post('/api/changepwd?api_token='+this.userinfo['api_token'],{password:this.password,newpassword:this.newpassword}).then(res=>{

          if(res.data.status ==200){
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.$cookies.remove('mycar');
            this.$cookies.remove('hid');
            this.$cookies.remove('hospital');
            this.$cookies.remove('api_token');
            this.$cookies.remove('userinfo');
            this.$cookies.remove('type');
            this.$router.push({path:'/login'});
          }else{

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
        padding: 60px 340px;
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
