<template>
  <div id="bottom">
    <div class="all">
      <p class="title">联系我们</p>
      <div class="tel d-flex d-flex-middle d-flex-center">
        <img src="../../static/tel.png" />
        <p class="color">{{info.telephone}}</p>
      </div>
      <p class="importInfo">Copyright 版权所有 © 某某化妆品 www.xxxx.com 某某化妆品有限公司    沪ICP备xxxxxx号-x</p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        info:[]
      }
    },
    mounted:function(){
      this.getSite();
    },
    methods:{
      getSite: function(){
        this.axios.get('/api/siteinfo').then(res=>{
          this.info = res.data.data.site
        });
      }
    }

  }
</script>

<style scoped>
  #bottom{
    background-color: #fff;
    text-align: center;
  }
  .title{
    padding-top: 60px;
    padding-bottom: 30px;
    color: #333;
    font-size: 18px;
  }
  .tel{
    margin-bottom: 50px;
  }
  .tel img{
    width: 42px;
    height: 39px;
    margin-right: 20px;
  }
  .tel p{
    font-size:39px;
    font-weight:bold;
  }
  .importInfo{
    height: 80px;
    line-height: 80px;
    border-top: 1px solid #F5F7FA;
    color: #999;
    font-size:14px;
  }
</style>
