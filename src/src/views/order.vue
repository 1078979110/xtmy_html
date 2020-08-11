<template>
  <div id="order">
    <top @go="go"></top>
    <div class="tab">
      <tab type='2' @search="search"></tab>
    </div>
    <div class="content">
      <div class="list">
        <div class="titleView d-flex d-flex-middle d-flex-between li">
          <p class="w200 taL">订单编号</p>
          <p class="w300">产品信息</p>
          <p class="w150">价格</p>
          <p class="w150">数量</p>
          <p class="w300">交易时间</p>
          <p class="w60 taR">状态</p>
        </div>
        <div class="d-flex d-flex-middle d-flex-between li" v-for="(item,index) in [0,0,0,0]" :key="index">
          <p class="w200 taL">11158649941</p>
          <div class="w300">
            <p class="taL">
              <span>3M</span>
              <span>水胶体敷料</span>
              <span>90022T</span>
            </p>
            <p class="taL">
              <span>3M</span>
              <span>水胶体敷料</span>
              <span>90022T</span>
            </p>
            <p class="taL">
              <span>3M</span>
              <span>水胶体敷料</span>
              <span>90022T</span>
            </p>
          </div>
          <p class="w150 price">￥150.00</p>
          <p class="w150">3件</p>
          <p class="w300">2020-07-13  16:14:32</p>
          <p class="w60">成功</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="bottom">
      <bottom></bottom>
    </div>
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

      }
    },
    methods:{
      search:function(value){
        this.$router.push({name:'search',params:{value:value}})
      },
      go:function(url){
        if(url!='order'){
          this.$router.push({path:'/'+url})
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  $color:#109E89;
  #order{
    .tab{
      margin: 48px 0 80px 0;
    }
    .list{
      margin-bottom: 15px;
      .li{
        border-bottom: 1px solid #F0F0F0;
        min-height: 100px;
        box-sizing: border-box;
        padding: 10px 0;
        p{
          font-size: 16px;
          text-align: center;
        }
        .w300{
          width: 300px;
        }
        .w200{
          width: 200px;
        }
        .w150{
          width: 150px;
        }
        .w60{
          width: 60px;
        }
        .taL{
          text-align: left;
        }
        .taR{
          text-align: right;
        }
        .price{
          color: #FF6700;
        }
      }
      .titleView{
        p{
          color: $color;
          font-size: 30px;
          text-align: center;
        }
      }
    }
    .bottom{
      border-top: 1px solid #F5F7FA;
    }
  }
</style>
