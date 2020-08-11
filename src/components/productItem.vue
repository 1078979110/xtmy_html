<template>
  <div class="productItem d-flex d-flex-between d-flex-bottom">
    <div class="productView">
      <p class="name">{{productItem.newname}}</p>
      <p class="name">{{productItem.specification}}</p>
      <div class="d-flex d-flex-middle">
        <p class="price" v-show="type !=1"><small>￥</small>{{productItem.price}}</p>
        <p class="stock">{{productItem.stocks}}</p>
      </div>
    </div>
    <img src="../../static/shopcart2.png" class="addShopcart click" @click="submit"/>
  </div>
</template>

<script>
  export default{
    name:"productItem",
    props:{
      type:{default:1},
      productItem:['newname','specification','price','stocks'],
    },
    data(){
      return{

      }
    },
    methods:{
      submit:function(){
        this.$emit('add')
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
