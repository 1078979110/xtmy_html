<template>
  <div class="alert">
    <p class="bg" @click="hide"></p>
    <div class="aContent">
      <p class="aTitle">选择商品规格</p>
      <div class="priceView d-flex d-flex-middle d-flex-between" v-if="type==1">
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
        <p class="typeTitle">选择数量</p>
        <div class="d-flex d-flex-middle d-flex-center">
          <p class="click cut" @click="cut"></p>
          <p class="color numInput">{{num}}</p>
          <p class="click add" @click="add"></p>
        </div>
      </div>
      <p class="submit color click" @click="submit">加入购物车</p>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      info:{
        default:''
      }
    },
    data(){
      return{
        options: [],
        value: '',
        num:1,
        price:'',
        api_token: this.$cookies.get('api_token')?this.$cookies.get('api_token'):'',
        type:this.$cookies.get('type'),
      }
    },
    mounted() {
      if(this.api_token!=''){
        this.axios.get('/api/specification?api_token='+this.api_token+'&mid='+this.info.id).then(res=>{
          console.log(res)
          this.options = []
          this.options.push({
            value: res.data.data.specification,
            label: res.data.data.specification
          })
          this.value = res.data.data.specification
        });
      }
    },
    methods:{
      hide:function(){
        this.$emit('hideFn')
      },
      submit:function(){
        var data = {
          mid:this.info.id,
          num: this.num,
          specification: this.value,

        }
        if(this.type == 1){
          if(this.price.trim()==''){
            this.$message.error('请填写价格！')
            return
          }
          data.price = this.price
        }else{
          data.hid = this.$cookies.get('hid')
        }
        this.axios.post('/api/addcart?api_token='+this.api_token,data).then(res=>{
          console.log(res)
          if(res.status ==200){
            this.$emit('addFn')
            this.$message({
              type:'success',
              message:'成功加入购物车'
            })
          }else{
            this.$message(res.data.msg)
          }
        });
      },
      cut:function(){
        var num = this.num*1
        if(num > 1){
          this.num = num - 1
        }else{
          this.$message({
            message:'最低数量为1',
            type:'warning'
          })
        }
      },
      add:function(){
        var num = this.num*1
        if(num < this.info.stocks){
          this.num = num + 1
        }else{
          this.$message({
            message:'不可超过库存',
            type:'warning'
          })
        }
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
