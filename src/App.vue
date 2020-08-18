<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
$color:#109E89;
*{
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #333;
}
input,textarea{
  border: none;
  outline: none;
  resize: none;
}
//
//
.color{
  color: $color;
}
/*  */
.bgF{
  background-color: #FFFFFF;
}
/*  */
.d-flex {
  display: flex;
}
.clear {
  clear: both;
}
.d-flex-column {
  flex-direction: column;
}
.d-flex-wrap {
  flex-wrap: wrap;
}
.d-flex-item {
  flex: 1;
}
.d-flex-unShrink {
  flex-shrink: 0;
}
.d-flex-between {
  justify-content: space-between;
}
.d-flex-around {
  justify-content: space-around;
}
.d-flex-center {
  justify-content: center;
}
.d-flex-start {
  justify-content: flex-start;
}
.d-flex-end {
  justify-content: flex-end;
}
.d-flex-middle {
  align-items: center;
}
.d-flex-top {
  align-items: flex-start;
}
.d-flex-bottom {
  align-items: flex-end;
}
.d-flex-align-between {
  align-content: space-between;
  /* 垂直方向上 */
}
.d-flex-align-around {
  align-content: space-around;
  /* 垂直方向上 */
}
.d-ellipsis-single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.d-ellipsis-multiple {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.content{
  width: 1200px;
  margin: 0 auto;
}
.click,.submit{
  cursor: pointer;
}
.relative{
  position: relative;
}
.el-select input{
  border: none !important;
}
.none{
    text-align: center;
    padding-bottom: 220px;
    margin-top: 120px;
    img{
      width: 330px;
      height: 300px;
    }
    p{
      font-size:18px;
      color: #999;
    }
  }
</style>
