<template>
  <div class="alert">
    <div class="aContent_">
      <div class="priceView_ d-flex d-flex-middle d-flex-center">
        <p>合计:</p>
        <p>{{value.toFixed(2)}}</p>
      </div>
      <div class="btns_ d-flex d-flex-middle d-flex-between">
        <p class="bL">确认下单吗？</p>
        <div class="bR d-flex d-flex-middle d-flex-end">
          <p class="cancel click" @click="cancel">取消</p>
          <p class="confirm click" @click="confirm">确认</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      value:{
        default:0
      }
    },
    data(){
      return{

      }
    },
    methods:{
      cancel:function(){
        this.$emit('cancel')
      },
      confirm:function(){
        this.$emit('confirm')
      }
    }
  }
</script>

<style lang="scss">
  $color:#109E89;
  .alert{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
    .aContent_{
      width:704px;
      height:358px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 68px 0px rgba(17,17,17,0.57);
      border-radius:8px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .priceView_{
        height: 280px;
        line-height: 280px;
        text-align: center;
        p{
          color: #FF6700;
          font-size: 48px;
          height: 64px;
          line-height: 64px;
        }
        p:nth-of-type(1){
          line-height: 90px;
          font-size: 18px;
          margin-right: 10px;
        }
      }
      .btns_{
        box-sizing: border-box;
        padding: 0 30px;
        .bL{
          font-size:24px;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .bR{
          p{
            width: 92px;
            line-height: 44px;
            height: 44px;
            text-align: center;
            font-size: 16px;
            margin-left: 30px;
          }
          .cancel{
            color: #999;
            background-color: #F0F0F0;
          }
          .confirm{
            background-color: $color;
            color: #fff;
          }
        }
      }
    }
  }

</style>
