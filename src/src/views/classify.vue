<template>
  <div id="classify" v-loading="loading">
    <top @go="go" v-bind="userinfo"></top>
    <div class="tab">
      <tab @search="search" @shopCart="shopCart" :value_search='value' ref="tab"></tab>
    </div>
    <!-- 筛选 -->
    <div class="filterView">
      <div class="content bgF d-flex d-flex-middle" v-for="(item,index) in tabs" :key="index">
        <p class="click" v-for="(item_,index_) in item.list" :key="index_" :class="{'color':index_==item.activeIndex}" @click="choose(index,index_)">{{item_}}</p>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="productList content d-flex d-flex-middle d-flex-wrap">
      <div class="productLi" v-for="item in list">
        <product-item @add="add" v-bind:item="item"></product-item>
      </div>
    </div>
    <div class="none" v-show="list.length==0">
      <img src="../../../static/none.png" />
      <p>暂无信息哦，换个产品试试~</p>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="20"
        :current-page="page"
        :total="total"
        @current-change="changePage">
      </el-pagination>
    </div>
    <!-- bottom -->
    <bottom></bottom>
    <!--  -->
    <div class="addShopCartAlert" v-if="alert">
      <addShopCart @hideFn="alertHide" @addFn="addFn" :info="info"></addShopCart>
    </div>
  </div>
</template>

<script>
  import tab from '../../components/tab.vue'
  import productItem from '../../components/productItem.vue'
  import addShopCart from '../../components/addShopCart.vue'
  export default{
    name:'classify',
    components:{
      tab,
      productItem,
      addShopCart
    },
    data(){
      return{
        pid:'',
        lid:'',
        cid:'',
        userinfo:this.$cookies.get('userinfo')?this.$cookies.get('userinfo'):'',
        list:[],
        tabs:[
          {
            name:'厂家',
            activeIndex: 0,
            list:[]
          },
          {
            name:'产品线',
            activeIndex: 0,
            list:[]
          },
          {
            name:'分类',
            activeIndex: 0,
            list:[]
          }
        ],
        alert:false,
        loading: null,
        info:'',
        value:'',
        api_token: this.$cookies.get('api_token')?this.$cookies.get('api_token'):'',
        page:1,
        total: 0
      }
    },
    mounted:function(){
      this.pid = this.$route.query.pid?this.$route.query.pid:'';
      this.lid = this.$route.query.lid?this.$route.query.lid:'';
      this.filter();
    },
    methods:{
      filter:function(){
        this.axios.get('/api/filter').then(res=>{
          for(var i in res.data.data ){
            this.tabs[i].list = res.data.data[i];
          }
          var index0 = this.tabs[0].list.indexOf(this.pid);
          this.tabs[0].activeIndex = index0;
          var index1 = this.tabs[1].list.indexOf(this.lid);
          this.tabs[1].activeIndex = index1;
          this.getList();
        });
      },
      choose:function(index,index_){
        if(index==0){
          this.pid = this.tabs[index].list[index_];
        }else if(index==1){
          this.lid = this.tabs[index].list[index_];
        }else{
          this.cid = this.tabs[index].list[index_];
        }
        this.tabs[index].activeIndex = index_;

        this.getList();
      },
      changePage(e){
        this.page = e
        this.getList()
      },
      getList:function(){
        var url = '/api/index';
        if(this.userinfo != '' && this.$cookies.get('userinfo').type == 2){
          if(this.$cookies.get('hid')){
            url = url+'?api_token='+this.api_token+'&pid='+this.pid+'&lid='+this.lid+'&cid='+this.cid+'&hid='+this.$cookies.get('hid')+'&page='+this.page;
          }else{
            this.$message({
              type:'warning',
              message:'请在右上角进行选择医院'
            });
            return
          }
        }else{
          url = url+'?api_token='+this.api_token+'&pid='+this.pid+'&lid='+this.lid+'&cid='+this.cid+'&page='+this.page;
        }
        this.loading = true
        this.axios.get(url).then(res=>{
          this.list = res.data.data.list.data
          this.total = res.data.data.list.total
          this.loading = false
          console.log(res)
        });
      },
      search:function(value){
        this.$router.push({path:'/search',query:{value:value}})
      },
      add:function(data){ //弹窗显示
        this.alert = true
        this.info = data
      },
      alertHide:function(data){
        this.alert = false
      },
      addFn:function(data){ //加入购物车
        this.alert = false
        this.$refs.tab.getCart()
      },
      shopCart:function(data){
        this.$router.push({path:'/shopCart'})
      },
      go:function(url){
        this.$router.push({path:'/'+url})
      }
    }
  }
</script>

<style lang="scss">
  $color:#109E89;
  #classify{
    background-color: #F5F7FA;
    overflow: hidden;
    .tab{
      box-sizing:border-content;
      padding:48px 0 46px 0;
    }
    .filterView{
      .content{
        box-sizing: border-box;
        padding: 10px 30px;
        p{
          margin-right: 10px;
        }
        p:nth-of-type(1){
          width: 100px;
          height: 30px;
          line-height: 30px;
          margin-right: 30px;
        }
      }
    }
    .productList{
      padding-bottom: 45px;
      .productLi{
        margin: 30px 26px 0 0;
      }
      div:nth-of-type(4n){
        margin-right: 0;
      }
    }
    .pagination{
      margin-bottom: 58px;
      text-align: center;
    }
  }
  .el-pager .active{
    background-color: $color !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: $color !important;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #fff;
  }
</style>
