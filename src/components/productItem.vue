<template>
  <div class="productItem d-flex d-flex-between d-flex-bottom" >
    <div class="productView">
      <p class="name">{{item.medicinal}}</p>
      <p class="name">{{item.specification}}</p>
      <div class="d-flex d-flex-middle">
        <p class="price" v-show="type !=1"><small>￥</small>{{item.price}}</p>
        <p class="stock">{{item.stocks}}</p>
      </div>
    </div>
    <img src="../../static/shopcart2.png" class="addShopcart click" @click="submit"/>
  </div>
</template>

<script>
  export default{
    name:"productItem",
    props:['item'],
    data(){
      return{
        type:this.$cookies.get('type'),
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
