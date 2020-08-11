<template>
  <div id="placeOrder">
    <top @go="go"></top>
    <div class="tab">
      <tab type="2"></tab>
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
            <p class="color">545155222</p>
          </div>
          <div class="viewLi d-flex d-flex-middle">
            <p>数量：</p>
            <p>1片</p>
          </div>
          <div class="viewLi d-flex d-flex-middle">
            <p>价格：</p>
            <p>￥1049</p>
          </div>
          <div class="viewLi d-flex d-flex-middle">
            <p>下单时间：</p>
            <p>2020-07-13  16:14:32</p>
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
        value:''
      }
    },
    mounted() {

    },
    methods:{
      search:function(value){
        this.$router.push({path:'/shopCart',params:{value:value}})
      },
      go:function(url){
        this.$router.push({path:'/'+url})
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
