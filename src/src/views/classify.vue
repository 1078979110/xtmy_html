<template>
  <div id="classify">
    <top @go="go" v-bind="userinfo"></top>
    <div class="tab bgF">
      <tab @search="search" @shopCart="shopCart"></tab>
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
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
    <!-- bottom -->
    <bottom></bottom>
    <!--  -->
    <div class="addShopCartAlert" v-if="alert">
      <addShopCart @hideFn="alertHide" @addFn="addFn"></addShopCart>
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
        userinfo:this.$cookies.get('userinfo'),
        list:[],
        tabs:[
          {
            name:'厂家',
            activeIndex: 0,
            list:['全部厂家','贝朗','3M','纽迪希亚']
          },
          {
            name:'产品线',
            activeIndex: 0,
            list:['全部产品线','SIVT','二级市场']
          },
          {
            name:'分类',
            activeIndex: 0,
            list:['全部分类','安全留置针','接头','泵用耗材']
          }
        ],
        alert:false
      }
    },
    mounted:function(){
      this.filter();
      this.pid = this.$route.params.pid?this.$route.params.pid:'';
      this.lid = this.$route.params.lid?this.$route.params.lid:'';
      console.log(this.pid);
      console.log(this.lid);
      var index0 = this.tabs[0].list.indexOf(this.pid);
      this.tabs[0].activeIndex = index0;
      var index1 = this.tabs[1].list.indexOf(this.lid);
      this.tabs[1].activeIndex = index1;
      this.getList(this.pid,this.lid,this.cid);
    },
    methods:{
      filter:function(){
        this.axios.get('/api/filter').then(res=>{
          for(var i in res.data.data ){
            this.tabs[i].list = res.data.data[i]
          }
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
        
        this.getList(this.pid,this.lid,this.cid);
      },
      getList:function(pid,lid,cid){
        var url = '/api/index';
        url = url+'?pid='+this.pid+'&lid='+this.lid+'&cid='+this.cid;
        this.axios.get(url).then(res=>{
          this.list = res.data.data.list.data
        });
      },
      search:function(value){
        this.$router.push({name:'search',params:{value:value,pid:this.pid,lid:this.lid,cid:this.cid}})
      },
      add:function(data){ //弹窗显示
        this.alert = true
      },
      alertHide:function(data){
        this.alert = false
      },
      addFn:function(data){ //加入购物车
        this.alert = false
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
