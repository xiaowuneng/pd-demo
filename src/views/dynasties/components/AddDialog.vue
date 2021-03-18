<template>
  <el-dialog
    :title="`${title}朝代`"
    :visible.sync="dialogVisible"
    @open="handleOpen"
    width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-form-item label="朝代名" prop="name" class="input-item">
        <el-input v-model="ruleForm.name" placeholder="请输入朝代名称(1~4个字)"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="validate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { session, cnReg } from '@/utils/tools'
export default {
  name: 'PoetryAdd',
  props: {
    title: {
      type: String,
      default: ''
    },
    isModify: {
      type: Boolean
    },
    modifyData: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: false,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message:'请输入朝代名称', trigger: 'blur' },
          { pattern: cnReg, message:'朝代名称只能是汉字噢～',trigger: 'blur' },
          { validator: this.checkName,trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleOpen () {
      this.ruleForm.name = this.isModify ? this.modifyData.name : ''
      if(!session('totalPoetry')) {
        getPoetry().then(res => {
          session('totalPoetry', res.data)
          this.poetryList = res.data
        })
      } else {
        this.poetryList = session('totalPoetry') // 获取诗词列表，朝代修改时，会同步修改诗词中的朝代
      }
    },
    checkName (rule, value, callback) {
      this.list = session('totalDynasties')
      if(value.length > 4) {
        return callback(new Error('朝代名称不能超过4个字噢～'))
      } else {
        for(const item of this.list) {
          if(value === item.name) {
            return callback(new Error('朝代名称不能重复噢～'))
          }
        }
        callback()
      }
    },
    validate () {
      // 必填校验
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.sure()
        } else {
          return false
        }
      })
    },
    sure () {
      if(this.isModify) {
        for(let item of this.list) {
          if(item.id === this.modifyData.id) {
            item.name = this.ruleForm.name
            session('totalPoetry', this.modifyPoetry())
            this.saveData(this.list)
            return
          }
        }
      } else {
        this.list.push({
          id: this.list.length + 1 + '',
          name: this.ruleForm.name
        })
        this.saveData(this.list)
      }
    },
    modifyPoetry () {
      this.poetryList.forEach(item => {
        if(item.dynastiesId === this.modifyData.id) {
          item.dynasties = this.ruleForm.name
        }
      })
      return this.poetryList
    },
    saveData (data) {
      session('totalDynasties', data)
      this.close()
    },
    close () {
      this.dialogVisible = false
      this.resetFrom()
      this.$parent.init() // 刷新列表
    },
    resetFrom () {
      // 关闭弹窗时，重置表单
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .input-item {
    width: 460px;
  }
</style>