<template>
  <div class="alert">
    <p class="bg" @click="hide"></p>
    <div class="aContent">
      <p class="aTitle">选择商品规格</p>
      <div class="priceView d-flex d-flex-middle d-flex-between">
        <p class="typeTitle">输入单价</p>
        <input type="number" v-model="price" placeholder="0.00"/>
      </div>
      <div class="type d-flex d-flex-middle d-flex-between">
        <p class="typeTitle">选择型号</p>
        <div class="selectView">
          <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
      </div>
      <div class="num d-flex d-flex-middle d-flex-between">
        <p class="typeTitle">选择型号</p>
        <div class="d-flex d-flex-middle d-flex-center">
          <p class="click cut"></p>
          <p class="color numInput">{{num}}</p>
          <p class="click add"></p>
        </div>
      </div>
      <p class="submit color click" @click="submit">加入购物车</p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        num:1,
        price:''
      }
    },
    methods:{
      hide:function(){
        this.$emit('hideFn')
      },
      submit:function(){
        this.$emit('addFn')
      }
    }
  }
</script>

<style lang="scss">
  .alert{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99;
  }
  .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    background:rgba(0,0,0,0.5);
  }
  .aContent{
    width:704px;
    min-height:706px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 68px 0px rgba(17,17,17,0.57);
    border-radius:8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    padding: 0 30px 80px 30px;
    z-index: 22;
  }
  .aTitle{
    padding-top: 50px;
    color: #333333;
    font-size: 30px;
    text-align: center;
  }
  .type,.num,.priceView{
    margin-top: 70px;
    padding: 30px 0;
    border-bottom: 1px solid #F0F0F0;
  }
  .priceView input{
    width: 320px;
    font-size: 24px;
  }
  .typeTitle{
    font-size: 24px;
  }
  .selectView input{
    font-size: 24px;
  }
  .num div{
    width:236px;
    height:60px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(193,193,193,1);
    border-radius:31px;
  }
  .num div .numInput{
    font-size: 24px;
    width: 100px;
    text-align: center;
  }
  .cut{
    width: 40px;
    height: 40px;
    background: url(../../static/icon_bottom2.png) center no-repeat;
    background-size: 19px 11px;
  }
  .add{
    width: 40px;
    height: 40px;
    background: url(../../static/icon_top.png) center no-repeat;
    background-size: 19px 11px;
  }
  .submit{
    width:280px;
    height:68px;
    background:rgba(16,158,137,1);
    box-shadow:0px 2px 8px 0px rgba(17,17,17,0.34);
    border-radius:34px;
    margin: 100px auto 0 auto;
    line-height: 68px;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
</style>
