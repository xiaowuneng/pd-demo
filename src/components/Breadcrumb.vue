<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="link">文本处理</el-breadcrumb-item>
    <el-breadcrumb-item class="link">句子</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item,index) in breadList"
      :key="index"
      :to="{ path: item.path }"
    >{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      this.breadList = this.$route.matched
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>

<style lang="less" scoped>
.link /deep/ .el-breadcrumb__inner {
  color: #00a4ff;
  cursor: pointer;
}
</style>