<template>
  <div id="order" v-loading="loading">
    <top @go="go" v-bind="userinfo"></top>
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
        <div class="d-flex d-flex-middle d-flex-between li" v-for="item in orderlist" >
          <p class="w200 taL">{{item.orderid}}</p>

          <el-popover
            placement="right"
            width="600"
            trigger="click">
            <el-table :data="item.orderinfo" max-height="600">
              <el-table-column width="250" property="medicinal" label="名称"></el-table-column>
              <el-table-column width="100" property="medicinalnum" label="编号"></el-table-column>
              <el-table-column width="150" property="specification" label="规格"></el-table-column>
              <el-table-column width="100" property="price" label="价格"></el-table-column>
            </el-table>
            <div class="w300 listView" slot="reference">
              <p class="taL" v-for="arr in item.orderinfo" >
                <span>{{arr.medicinal}}</span>
                <span>{{arr.medicinalnum}}</span>
                <span>{{arr.specification}}</span>
                <span>￥{{arr.price}}</span>
              </p>
            </div>
          </el-popover>
          <p class="w150 price">￥{{item.totalprice}}</p>
          <p class="w150">{{item.totalnum}}件</p>
          <p class="w300">{{item.created_at}}</p>
          <p class="w60">{{stateList[item.orderstatus]}}</p>
        </div>
      </div>
      <!--  -->
      <div class="none" v-show="orderlist.length==0">
        <img src="../../../static/none.png" />
        <p>暂无订单哦，快去下单吧~</p>
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
    name:'order',
    components:{
      tab
    },
    data(){
      return{
        userinfo:this.$cookies.get('userinfo'),
        api_token: this.$cookies.get('api_token')?this.$cookies.get('api_token'):'',
        orderlist:[],
        loading:false,
        stateList:['待确认','待报价','待报价(批发部)','待审核','待发货','已发货']
      }
    },
    mounted(){
      this.orders();
    },
    methods:{
      search:function(value){
        this.$router.push({path:'/search',query:{value:value}})
      },
      go:function(url){
        if(url!='order'){
          this.$router.push({path:'/'+url})
        }
      },
      orders:function(){
        if(this.api_token != ''){
          this.loading = true
          this.axios.get('/api/order?api_token='+this.userinfo.api_token).then(res=>{
            this.orderlist = res.data.data.order;
            this.loading = false
            for(var i in this.orderlist){
              this.orderlist[i]['orderinfo'] = JSON.parse(this.orderlist[i]['orderinfo']);
              for(var j in this.orderlist[i]['orderinfo']){
                var len = this.orderlist[i]['orderinfo'].length;
                this.orderlist[i].totalnum = len;
              }
            }
          });
        }
      }
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
        .listView{
          height: 110px;
          overflow: hidden;
          cursor: pointer;
          p{
            span{
              margin-right: 3px;
            }
          }
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
