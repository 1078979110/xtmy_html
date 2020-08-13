<template>
  <div id="home">
    <top @go="go" v-bind="userinfo"></top>
    <div class="tab">
      <tab type="1" @shopCart="shopCart"></tab>
    </div>
    <div class="banner content">
      <el-carousel class="bannerView">
        <el-carousel-item>
          <img src="../../../static/banner.png" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../static/banner.png" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--  -->
    <div class="searchView d-flex d-flex-middle d-flex-between">
      <img src="../../../static/search.png" />
      <input type="search" v-model="searchVal" placeholder="搜索您需要的商品"/>
      <p @click="search" class="click">搜索</p>
    </div>
    <!--  -->
    <div class="products">
      <div class="content d-flex d-flex-middle d-flex-between">
        <div class="productItem click" v-for="(item,index) in list" :key="index" @click="classify(index)">
          <img src="../../../static/banner.png" />
          <div class="productInfo" >
            <p>{{item.name}}</p>
            <p>{{item.line}}</p>
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
    data () {
      return{
        searchVal:'',
        userinfo: this.$cookies.get('userinfo')?this.$cookies.get('userinfo'):[],
        list:[],
        pid:'',
        lid:'',
        cid:'',
      }
    },
    mounted(){
      this.pfilter();
    },
    methods:{
      classify:function(index){
        this.pid = this.list[index].name;
        this.lid = this.list[index].line;
        console.log(this.pid);
        console.log(this.lid);
        console.log(index);
        this.$router.push({path:'/classify',params:{'hid':this.pid,'lid':this.lid}});
      },
      pfilter:function(){
        this.axios.get('/api/homefilter').then(res=>{
          this.list = res.data.data.filter
        });
      },
      search:function(){
        var that = this
        if(that.searchVal.trim()==''){
          that.$notify.error({
            title: '提示',
            message: '搜索内容可不为空'
          });
        }else{
          that.$router.push({name:'search',params:{value:that.searchVal.trim()}})
        }
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
  #home{
    background-color: #F5F7FA;
    .tab{
      margin: 48px 0 32px 0;
    }
    .banner{
      width: 1200px;
      height: 280px;
      .bannerView{
        .el-carousel__container{
          width: 1200px;
          height: 280px;
          .el-carousel__item{
            width: 100%;
            height: 100%;
            img{
              position: absolute;
              top: 50%;
              left: 50%;
              min-width: 100%;
              min-height: 100%;
              transform: translate(-50%,-50%);
            }
          }
        }
        .el-carousel__indicators{
          bottom: 0 !important;
          .el-carousel__button{
            height: 12px;
            width: 12px;
            border-radius: 6px;
          }
        }
        .is-active{
          button{
            width: 20px !important;
            background-color: $color;
          }
        }
      }
    }
    .searchView{
      position: relative;
      width: 640px;
      height: 40px;
      border:2px solid $color;
      margin: 50px auto 55px auto;
      box-sizing: border-box;
      padding-left: 22px;
      border-radius: 4px;
      overflow: hidden;
      background-color: #fff;
      img{
        width: 16px;
        height: 17px;
      }
      input{
        width: 500px;
        height: 30px;
        line-height: 30px;
      }
      p{
        width:90px;
        height:44px;
        background: $color;
        line-height: 44px;
        text-align: center;
        color: #fff;
      }
    }
    .products{
      padding-bottom: 153px;
      .productItem{
        width:380px;
        height:300px;
        box-shadow:0px 2px 11px 2px rgba(17,17,17,0.08);
        border-radius:10px;
        overflow: hidden;
        position: relative;
        transition: 2s all;
        img{
          position: absolute;
          min-width: 100%;
          min-height: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
        .productInfo{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: rgba(0,0,0,0.4);
          z-index: 22;
          text-align: center;
          box-sizing: border-box;
          padding-top: 124px;
          p{
            color: #fff;
            font-size: 18px;
            margin-bottom: 40px;
          }
        }
        &:hover .productInfo{
          top: 0;
        }
      }
    }
  }
</style>
