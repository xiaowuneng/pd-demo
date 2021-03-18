<template>
  <div id="wrapper">
    <el-container class="container-outer">
      <el-header class="header">
        <breadcrumb class="breadcrumb"></breadcrumb>
      </el-header>
      <el-container class="container">
        <el-aside class="aside">
          <side-bar></side-bar>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import SideBar from '@/components/SideBar'
export default {
  name: 'Layout',
  components: {
    Breadcrumb,
    SideBar
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
#wrapper {
  height: 100vh;
  padding: 10px;
  .container-outer {
    height: 100%;
  }
}
.header {
  padding: 10px;
  .normalBorder();
  .breadcrumb {
    line-height: 40px;
  }
}
.container {
  height: 100%;
  padding-top: 10px;
  overflow: hidden;
}
.aside {
  width: 190px;
  margin-right: 10px;
  .normalBorder();
}
.main {
  padding: 10px;
  .normalBorder();

}
</style>