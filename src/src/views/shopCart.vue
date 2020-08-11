<template>
  <div id="shopCart">
    <top @go="go"></top>
    <div class="tab">
      <tab type="2" @search="search"></tab>
    </div>
    <!-- content -->
    <div class="content">
      <div class="functionView d-flex d-flex-middle d-flex-between">
        <div class="FV_left d-flex d-flex-middle click" @click="checkAll">
          <img src="../../../static/check.png" v-if="checkList.length!=list.length"/>
          <img src="../../../static/checked.png" v-else />
          <p>全选</p>
        </div>
        <div class="FV_right d-flex d-flex-middle d-flex-end">
          <p class="numView">已选2件商品</p>
          <p class="total">￥{{total.toFixed(2)}}</p>
          <p class="submit mt0" @click="alertShowFn">下单</p>
        </div>
      </div>
      <!--  -->
      <div class="list">
        <div class="li d-flex d-flex-middle d-flex-between" v-for="(item,index) in list" :key="index">
          <div class="checkView click" @click="checkOne(item.id)">
            <img src="../../../static/check.png" v-if="checkList.indexOf(item.id)==-1"/>
            <img src="../../../static/checked.png" v-else />
          </div>
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="price">￥{{item.price}}/{{item.unit}}</p>
          </div>
          <div class="numBtns">
             <el-input-number v-model="item.num" :min="1" @change="handleChange"></el-input-number>
          </div>
          <div class="totalLi">￥{{item.price*item.num}}</div>
          <div class="del click" @click="del(item.id)">删除</div>
        </div>
      </div>
      <!--  -->
      <div class="functionView fV_view_bottom d-flex d-flex-middle d-flex-between">
        <div class="d-flex d-flex-middle">
          <div class="FV_left d-flex d-flex-middle click" @click="checkAll">
            <img src="../../../static/check.png" v-if="checkList.length!=list.length"/>
            <img src="../../../static/checked.png" v-else />
            <p>全选</p>
          </div>
          <p class="del click" @click="delAll">删除</p>
        </div>
        <div class="FV_right d-flex d-flex-middle d-flex-end">
          <p class="numView">已选2件商品</p>
          <p class="total">￥{{total.toFixed(2)}}</p>
          <p class="submit mt0" @click="alertShowFn">下单</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <bottom></bottom>
    </div>
    <!--  -->
    <div v-if="alertShow">
      <placeOrderAlert :value="total" @cancel="alertHideFn" @confirm="submit"></placeOrderAlert>
    </div>
  </div>
</template>

<script>
  import tab from '../../components/tab.vue'
  import placeOrderAlert from '../../components/placeOrderAlert.vue'
  export default{
    components:{
      tab,
      placeOrderAlert
    },
    data(){
      return{
        total:0,
        list:[
          {id:1,name:'3M 水胶体敷料  90022T',price:1049,unit:'片',num:1},
          {id:2,name:'3M 水胶体敷料  90022T',price:1049,unit:'片',num:1},
          {id:3,name:'3M 水胶体敷料  90022T',price:1049,unit:'片',num:1},
          {id:4,name:'3M 水胶体敷料  90022T',price:1049,unit:'片',num:1}
        ],
        checkList:[],
        alertShow: false
      }
    },
    methods:{
      search:function(value){
        this.$router.push({name:'search',params:{value:value}})
      },
      handleChange:function(e){
        this.totalFn()
      },
      alertShowFn:function(){
        this.alertShow = true
      },
      checkOne:function(id){
        var that = this
        if(that.checkList.indexOf(id)==-1){
          that.checkList.push(id)
        }else{
          that.checkList.splice(that.checkList.indexOf(id),1)
        }
        that.totalFn()
      },
      checkAll:function(){
        var that = this
        if(that.checkList.length==that.list.length){
          that.checkList = []
        }else{
          var checkList = []
          that.list.forEach((item,index)=>{
            checkList.push(item.id)
          })
          that.checkList = checkList
        }
        that.totalFn()
      },
      totalFn:function(){
        var that = this
        var total = 0
        that.list.forEach((item,index)=>{
          that.checkList.forEach((item_,index_)=>{
            if(item_ == item.id){
              total += item.price*item.num
            }
          })
        })
        that.total = total
      },
      alertHideFn:function(){
        this.alertShow = false
      },
      submit:function(){
        this.alertShow = false
        this.$router.push({name:'placeOrder'})
      },
      del:function(id){
        var that = this
        that.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.list.splice(that.list.indexOf(id),1)
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delAll:function(){
        var that = this
        that.$confirm('此操作将删除商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      go:function(url){
        this.$router.push({path:'/'+url})
      }
    }
  }
</script>

<style lang="scss">
  $color:#109E89;
  .mt0{
    margin-top:  0 !important;
  }
  #shopCart{
    .tab{
      margin: 48px 0 50px 0;
    }
    .functionView{
      height: 44px;
      margin-bottom: 30px;
      .FV_left{
        img{
          width: 20px;
          height: 20px;
          margin-right: 20px;
        }
        p{
          color: #333;
          font-size: 18px;
        }
      }
      .FV_right{
        .numView{
          font-size: 16px;
          color: #333333;
        }
        .total{
          color: #FF4200;
          font-size: 20px;
          margin: 0 20px;
          font-weight:500;
        }
        .submit{
          width:93px;
          height:44px;
          background: $color;
          line-height: 44px;
          color: #fff;
          text-align: center;
          font-size: 16px;
        }
      }
    }
    .list{
      border-top: 1px solid #f0f0f0;
      border-left: 1px solid #f0f0f0;
      .li{
        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        height: 180px;
        box-sizing: border-box;
        padding: 0 30px;
        img{
          width: 20px;
          height: 20px;
        }
        .info{
          width: 600px;
          .name{
            font-size: 18px;
            margin-bottom: 10px;
            width: 100%;
            line-height: 24px;
          }
          .price{
            font-size: 20px;
            color: #FF4200;
          }
        }
        .numBtns{
          border:1px solid #f0f0f0;
          width: 156px;
          .el-input-number{
            width: 100%;
          }
          span{
            background-color: #f0f0f0;
            border-color: #f0f0f0;
            top: 0;
            border: none;
            border-radius: 0;
          }
          .el-input-number__decrease{
            left: 0;
          }
          .el-input-number__increase{
            right: 0;
          }
          .el-input{
            background-color: #f0f0f0;
          }
          input{
            background-color: #f0f0f0;
            height: 32px;
            line-height: 32px;
            background-color: #fff;
            border: none !important;
          }
        }
        .totalLi{
          font-size: 20px;
          color: #FF4200;
        }
        .del{
          font-size: 18px;
        }
      }
    }
    .fV_view_bottom{
      margin-top: 15px;
      margin-bottom: 40px;
      background-color: #F0F0F0;
      height: 78px;
      box-sizing: border-box;
      padding: 0 30px;
      .del{
        margin-left: 60px;
        font-size: 18px;
      }
    }
    .bottom{
      border-top: 1px solid #F5F7FA;
    }
  }
  .el-button--primary{
    background-color: $color;
    border-color: $color;
    span{
      color: #fff;
    }
    &:focus{
      background-color: $color;
      border-color: $color;
    }
    &:hover{
      background-color: $color;
      border-color: $color;
    }
  }
  .el-message-box__headerbtn{
    &:focus .el-message-box__close{
      color: $color;
    }
    &:hover .el-message-box__close{
      color: $color;
    }
  }

</style>
