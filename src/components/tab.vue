<template>
  <div id="tab">
      <div class="content d-flex d-flex-middle d-flex-between">
          <img src="../../static/logo.png" class="logo click" @click="home"/>
          <div class="searchView d-flex d-flex-middle d-flex-between" v-if="type!=1">
            <input type="text" v-model="searchValue"/>
            <p class="btn click" @click="search">搜索</p>
          </div>
          <div class="shopcartView d-flex d-flex-middle" v-if="type!=2">
            <div class="numView relative">
              <img src="../../static/shopcart.png" />
              <p class="color">{{cartnum}}</p>
            </div>
            <p class="go click" @click="goShopCart">去购物车结算</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    type: {
      default: 0
    },
    value_search: {
      default:''
    }
  },
  data () {
    return{
      searchValue:'',
      cartnum:0,
      api_token: this.$cookies.get('api_token')?this.$cookies.get('api_token'):'',
    }
  },
  mounted() {
    this.searchValue = this.value_search
    this.getCart()
  },
  methods:{
    search:function(){
      var that = this
      if(that.searchValue.trim()==''){
        that.$notify.error({
          title: '提示',
          message: '搜索内容可不为空'
        });
      }else{
        that.$emit('search',that.searchValue)
      }
    },
    goShopCart:function(){
      if(this.api_token!=''){
        this.$emit('shopCart')
      }else{
        this.$message.error('请先登录！')
      }
    },
    getCart:function(){
      if(this.api_token !=''){
        this.axios.get('/api/cart?api_token='+this.api_token+'&hid='+this.$cookies.get('hid')).then(res=>{
          this.$cookies.set('mycar',res.data.data.cart);
          this.cartnum = res.data.data.cart.length;
        });
      }
    },
    home(){
      this.$router.push({path:'/'});
    }
  }
}
</script>

<style scoped lang="scss">
  $color:#109E89;
  .logo{
    width: 220px;
    height: 70px;
  }
  .searchView{
    width:536px;
    height:40px;
    border:2px solid $color;
    background-color: $color;
  }
  .searchView input{
    width: calc(100% - 62px);
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    background-color: #fff;
  }
  .searchView p{
    width: 62px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
  }
  .shopcartView{
    width:240px;
    height:44px;
    background: $color;
  }
  .numView{
    width: 52px;
    height: 100%;
    border-right: 1px solid #fff;
  }
  .numView img{
    width: 35px;
    height: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .numView p{
    position: absolute;
    top: -3px;
    right: -3px;
    height: 18px;
    min-width: 14px;
    padding: 0 2px;
    font-size: 14px;
    background-color: #fff;
    text-align: center;
    border: 1px solid $color;
    border-radius: 10px;
  }
  .shopcartView .go{
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
  }
</style>
