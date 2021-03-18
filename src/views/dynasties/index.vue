<template>
  <div class="wrapper">
    <el-table :data="totalDynasties" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="朝代名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-link type="primary" class="modify-btn" @click="modify(scope.row)">修改</el-link>
          <el-link type="danger" @click="deleteRow(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="totalSize" :hide-on-single-page="true" class="pagination"></el-pagination>
    <el-button type="primary" class="pull-right add-btn" @click="add">新增</el-button>
    <add-dialog ref="addDialog" :title="dialogTitle" :isModify="isModify" :modifyData="modifyData"></add-dialog>
    <delete-warning ref="deleteWarning" :deleteData="deleteData"></delete-warning>    
  </div>
</template>
<script>
import {session} from 'utils/tools'
import AddDialog from './components/AddDialog'
import DeleteWarning from './components/DeleteWarning'
import {getDynasties} from '@/api/'

export default {
  name: 'Dynasties',
  data () {
    return {
      totalDynasties: [],
      pageSize: 5,
      dialogTitle: '',
      isModify: false,
      modifyData: {},
      deleteData: {}
    }
  },
  methods: {
    _getDynasties () {
      getDynasties().then(res => {
        session('totalDynasties', res.data)
        this.totalDynasties = res.data
      })
    },
    init () {
      try {
        const data = session('totalDynasties')
        if(data && Array.isArray(data)) {
            this.totalDynasties = data
        } else {
          this._getDynasties()
        }
      }
      catch{
        this._getDynasties()
      }
    },
    add () {
      this.openDialog('新增', false)
    },
    modify (row) {
      this.openDialog('修改', true)
      this.modifyData = row
    },
    deleteRow (row) {
      this.deleteData = row
      this.$refs.deleteWarning.dialogVisible = true
    },
    openDialog (title, flag) {
      this.dialogTitle = title
      this.isModify = flag
      this.$refs.addDialog.dialogVisible = true
    }
  },
  computed: {
    totalSize () {
      return this.totalDynasties.length
    }
  },
  mounted () {
    this.init()
  },
  components: {
    AddDialog,
    DeleteWarning
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
  .add-btn {
    margin-top: 20px;
  }
</style>