<template>
  <div>
    <keep-alive include="Home_zujian">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped></style>