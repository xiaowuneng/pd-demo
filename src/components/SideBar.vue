<template>
  <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    router>
    <el-menu-item :index="item.path" v-for="item of menuList" :key="item.id">
      <i :class="item.icon"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {getMenus} from '@/api/'
export default {
  name: 'SideBar',
  data () {
    return {
      active: '',
      menuList: []
    }
  },
  mounted () {
    getMenus().then(res => {
      this.active = window.location.href.split('#')[1]
      this.menuList = res.data
    })
  }
}
</script>
