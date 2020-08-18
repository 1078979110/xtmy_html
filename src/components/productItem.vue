<template>
  <div class="productItem d-flex d-flex-between d-flex-bottom" >
    <div class="productView">
      <p class="name">{{item.medicinal}}</p>
      <p class="name">{{item.specification}}</p>
      <div class="d-flex d-flex-middle">
        <p class="price" v-show="type ==2"><small>￥</small>{{item.price}}/{{item.unit}}</p>
        <p class="stock">库存{{item.stocks}}</p>
      </div>
    </div>
    <img src="../../static/shopcart2.png" class="addShopcart click" @click="submit()"/>
  </div>
</template>

<script>
  export default{
    name:"productItem",
    props:['item'],
    data(){
      return{
        type:this.$cookies.get('type'),
        api_token: this.$cookies.get('api_token')?this.$cookies.get('api_token'):''
      }
    },
    methods:{
      submit:function(){
        if(this.api_token!=''){
          var data = {
            id: this.item.id,
            stocks: this.item.stock,
          }
          this.$emit('add',data)
        }else{
          this.$message('请先登录！')
        }

      },
    }
  }
</script>

<style scoped="scoped">
.productItem{
  width: 280px;
  height: 140px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
}
.productView{
  width: 190px;
}
.productView .name{
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
.productView div{
  margin-top: 25px;
}
.productView div .price{
  font-size: 14px;
  color: #FF4200;
  margin-right: 10px;
}
.productView div .price small{
  font-size: 12px;
  color: #FF4200;
}
.stock{
  font-size: 12px;
  color: #999999;
}
.addShopcart{
  width: 26px;
  height: 23px;
}
</style>
