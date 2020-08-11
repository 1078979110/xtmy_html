<template>
  <div class="productItem d-flex d-flex-between d-flex-bottom">
    <div class="productView">
      <p class="name">3M 皮肤伤口胶带</p>
      <p class="name">R1547</p>
      <div class="d-flex d-flex-middle">
        <p class="price"><small>￥</small>1049/盒</p>
        <p class="stock">库存100</p>
      </div>
    </div>
    <img src="../../static/shopcart2.png" class="addShopcart click" @click="submit"/>
  </div>
</template>

<script>
  export default{
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
