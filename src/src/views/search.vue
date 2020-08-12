<template>
  <div id="classify">
    <top @go="go" v-bind="userinfo"></top>
    <div class="tab bgF">
      <tab :searchValue='value' @search="search" @shopCart="shopCart"></tab>
    </div>
    <!-- 商品列表 -->
    <div class="productList content d-flex d-flex-middle d-flex-wrap">
      <div class="productLi" id="productLi" v-bind="list" v-show="list.length>0" v-for="(item,indexP) in list" :key="indexP">
        <product-item v-bind:item="item"  @add="add"></product-item>
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
    name:'search',
    components:{
      tab,
      productItem,
      addShopCart
    },
    data(){
      return{
        value:'',
        list:[],
        alert:false,
        userinfo:this.$cookies.get('userinfo'),
        type: this.$cookies.get('type'),
      }
    },
    mounted() {
      this.value = this.$route.params.value,
      this.getList();
    },
    methods:{
      search:function(value){
        this.value = value
        this.getList()
      },
      getList:function(){
        var url = '/api/index';
        if(this.value != '' && this.vue != undefined){
          url = url + '?q='+this.value
        }
        console.log(this.value);
        this.axios.get(url).then(res=>{
          this.list = res.data.data.list.data
        });
      },
      shopCart:function(data){
        this.$router.push({path:'/shopCart'})
      },
      go:function(url){
        this.$router.push({path:'/'+url})
      },
      alertHide:function(data){
        this.alert = false
      },
      addFn:function(data){ //加入购物车
        this.alert = false
      },
      add:function(data){ //弹窗显示
        this.alert = true
      },
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
      margin: 48px 0 46px 0;
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
  .none{
    text-align: center;
    padding-bottom: 220px;
    img{
      width: 330px;
      height: 300px;
    }
    p{
      font-size:18px;
      color: #999;
    }
  }
</style>
