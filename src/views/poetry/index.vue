<template>
  <div class="wrapper">
    <el-table :data="poetryList" style="width: 100%">
      <el-table-column type="index" label="#" :index="indexMethod" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="dynasties" label="朝代" width="200"></el-table-column>
      <el-table-column prop="author" label="作者" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-link type="primary" class="modify-btn" @click="modify(scope.row)">修改</el-link>
          <el-popconfirm title="确定删除该条诗词吗？" @confirm="deleteRow(scope.row)">
            <el-link type="danger" slot="reference">删除</el-link>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="totalSize" :current-page="currentPage" class="pagination" @current-change="changePage"></el-pagination>
    <el-button type="primary" class="pull-right" @click="add">新增</el-button>
    <poetry-add ref="poetryAdd" :title="dialogTitle" :isModify="isModify" :modifyData="modifyData"></poetry-add>
  </div>
</template>
<script>
import { session } from 'utils/tools'
import PoetryAdd from './components/AddDialog'
import { getPoetry } from '@/api/'

export default {
  name: 'Poetry',
  data () {
    return {
      totalPoetry: [],
      currentPage: 1,
      pageSize: 5,
      dialogTitle: '',
      isModify: false,
      modifyData: {}
    }
  },
  methods: {
    _getPoetry () {
      getPoetry().then(res => {
        session('totalPoetry', res.data)
        this.totalPoetry = res.data
      })
    },
    init () {
      try {
        const data = session('totalPoetry')
        if(data && Array.isArray(data)) {
            this.totalPoetry = data
        } else {
          this._getPoetry()
        }
      }
      catch{
        this._getPoetry()
      }
    },
    changePage (newPage) {
      this.currentPage = newPage
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    },
    add () {
      this.openDialog('新增', false)
    },
    modify (row) {
      this.openDialog('修改', true)
      this.modifyData = row
    },
    deleteRow (row) {
      this.totalPoetry.splice(this.totalPoetry.findIndex(item => item.id === row.id), 1)
      session('totalPoetry', this.totalPoetry)
    },
    openDialog (title, flag) {
      this.dialogTitle = title
      this.isModify = flag
      this.$refs.poetryAdd.dialogVisible = true
    }
  },
  computed: {
    poetryList () {
      const index = (this.currentPage - 1) * this.pageSize
      return this.totalPoetry.slice(index, index + this.pageSize)
    },
    totalSize () {
      return this.totalPoetry.length
    }
  },
  mounted () {
    this.init()
  },
  components: {
    PoetryAdd
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assets/styles/variable';
  .pagination {
    .pagination();
  }
  .modify-btn {
    .modify-btn();
  }
</style>