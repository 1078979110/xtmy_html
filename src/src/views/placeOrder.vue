<template>
  <div id="placeOrder">
    <top @go="go" v-bind="userinfo"></top>
    <div class="tab">
      <tab type="2" :value_search='value' @search="search"></tab>
    </div>
    <!--  -->
    <div class="content centerView bgF">
      <div class="stateView">
        <img src="../../../static/success.png" />
        <p>下单成功</p>
      </div>
      <div class="orderInfo">
        <p class="title">下单信息</p>
        <div class="d-flex d-flex-middle d-flex-wrap d-flex-between">
          <div class="viewLi d-flex d-flex-middle">
            <p>订单编号：</p>
            <p class="color click" @click="go('order')">{{info.orderid}}</p>
          </div>
          <div class="viewLi d-flex d-flex-middle">
            <p>数量：</p>
            <p>{{info.totalnum}}片</p>
          </div>
          <div class="viewLi d-flex d-flex-middle">
            <p>价格：</p>
            <p>￥{{info.totalprice}}</p>
          </div>
          <div class="viewLi d-flex d-flex-middle">
            <p>下单时间：</p>
            <p>{{info.created_at}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <bottom></bottom>
  </div>
</template>

<script>
  import tab from '../../components/tab.vue'
  export default{
    components:{
      tab
    },
    data(){
      return{
        value:'',
        info:'',
        id:'',
        userinfo: this.$cookies.get('userinfo')?this.$cookies.get('userinfo'):[],
        api_token: this.$cookies.get('api_token')?this.$cookies.get('api_token'):'',
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.getInfo()
    },
    methods:{
      search:function(value){
        this.$router.push({path:'/search',query:{value:value}})
      },
      go:function(url){
        this.$router.push({path:'/'+url})
      },
      getInfo:function(){
        if(this.api_token!=''){
          var url = '/api/orderinfo?api_token='+this.api_token+'&oid='+this.id
          this.axios.get(url).then(res=>{
            if(res.data.status==200){
              var info = res.data.data.info
              this.info = JSON.parse(info)
              // console.log(JSON.parse(this.info.orderinfo))
              console.log(this.info)
            }else{
              this.$message.error(res.data.msg)
            }
            console.log(res)
          });
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  $color:#109E89;
  #placeOrder{
    background-color: #F5F7FA;
    .tab{
      margin: 48px 0;
    }
    .centerView{
      border-radius: 10px 10px 0 0;
      overflow: hidden;
      margin-bottom: 40px;
      .stateView{
        height: 380px;
        background-color: $color;
        box-sizing: border-box;
        padding: 112px 0 0 0;
        text-align: center;
        img{
          width: 88px;
          height: 88px;
          margin-bottom: 53px;
        }
        p{
          font-size:48px;
          font-weight:500;
          color: #fff;
        }
      }
      .orderInfo{
        width: 930px;
        height: 260px;
        margin: 167px auto 167px auto;
        border:1px solid rgba(240,240,240,1);
        box-sizing: border-box;
        padding: 0 154px;
        .title{
          font-size: 24px;
          text-align: center;
          margin: 44px 0 66px 0;
        }
        .viewLi{
          width: 50%;
          height: 40px;
          line-height: 40px;
          p{
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
