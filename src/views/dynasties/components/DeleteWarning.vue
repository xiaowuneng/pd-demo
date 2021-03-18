<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @open="handleOpen"
    width="400px">
    <div slot="title" class="title">
      <h3>警告</h3>
    </div>
    <p>删除该项会同时删除所有引用该项的诗句，确定删除吗？</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { session } from '@/utils/tools'
import {getPoetry} from '@/api/'

export default {
  name: 'DeleteWarning',
  props: ['deleteData'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    sure () {
      const dynastiesList = session('totalDynasties')
      const poetryList = session('totalPoetry')
      dynastiesList.splice(dynastiesList.findIndex(item => item.id === this.deleteData.id), 1) // 删除朝代
      // 删除诗词
      for(let i = poetryList.length - 1; i >= 0; i--) {
        if(poetryList[i].dynastiesId === this.deleteData.id) {
          poetryList.splice(i, 1)
        }
      }
      session('totalPoetry', poetryList)
      session('totalDynasties', dynastiesList)
      this.dialogVisible = false
      this.$parent.init() // 刷新列表
    },
    handleOpen () {
      if(!session('totalPoetry')) {
        getPoetry().then(res => {
          session('totalPoetry', res.data)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .el-dialog__header {
    background: #EFDFDF;
    .title {
      color: red;
    }
    .el-dialog__headerbtn {
      margin-top: -6px;
    }
  }
</style>